/*
    Random integer
*/

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

/*
    Restart Game
*/

function  restart() {

    clearInterval(ints.enemy);
    clearInterval(ints.run);
    clearInterval(ints.bullet);
    clearInterval(ints.generateEnemy);


    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        enemy.parentNode.removeChild(enemy);
    });

    player.el.parentNode.removeChild(player.el);
    

    game();
}
    
    
/*
    Init
*/
    
function init() {

    player.x = gameZone.getBoundingClientRect().width / 2 - player.width;
    player.y = gameZone.getBoundingClientRect().height - player.height;

    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    player.el = document.querySelector('.player');
}
    
/*
    Intervals
*/
    
function intervals() {
    ints.run = setInterval(() => {
            if (player.run) {
                switch (player.side) {
                    case 1: // Top
                        if (player.y > 0) {
                            player.y -= player.step;
                            player.el.style.top = `${player.y}px`;
                        }
                        break;
                    case 3: // Bottom
                        if (player.y < gameZone.getBoundingClientRect().bottom - player.height - 2) {
                            player.y += player.step;
                            player.el.style.top = `${player.y}px`;
                        }
                        break;
                    case 2: // Right
                        if (player.x < gameZone.getBoundingClientRect().right - player.width - 2) {
                            player.x += player.step;
                            player.el.style.left = `${player.x}px`;
                        }
                        break;
                    case 4: // Left
                        if (player.x > 0) {
                            player.x -= player.step;
                            player.el.style.left = `${player.x}px`;
                        }
                        break;
                }
            }
    }, fps);

    ints.bullet = setInterval(() => {
            let bullets = document.querySelectorAll('.bullet');
            bullets.forEach((bullet) => {
                let direction = bullet.getAttribute('direction');
    
                switch (direction) {
                    case 'top':
                        if (bullet.getBoundingClientRect().top < 0) {
                            bullet.parentNode.removeChild(bullet);
                        } else {
                            bullet.style.top = bullet.getBoundingClientRect().top - bulletSpeed + 'px';
                        }
                        break;
                        
                    case 'right':
                        if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                            bullet.parentNode.removeChild(bullet);
                        } else {
                            bullet.style.left = bullet.getBoundingClientRect().left + bulletSpeed + 'px';
                        }
                        break;

                    case 'bottom':
                        if (bullet.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
                            bullet.parentNode.removeChild(bullet);
                        } else {
                            bullet.style.top = bullet.getBoundingClientRect().top + bulletSpeed + 'px';
                        }
                        break;

                    case 'left':
                        if (bullet.getBoundingClientRect().left < 0) {
                            bullet.parentNode.removeChild(bullet);
                        } else {
                            bullet.style.left = bullet.getBoundingClientRect().left - bulletSpeed + 'px';
                        }
                        break;
                }
    
            })
        }, fps);

        ints.enemy = setInterval(() => {
            let enemies = document.querySelectorAll('.enemy');
            enemies.forEach((enemy) => {

                const playerPosTop = player.el.getBoundingClientRect().top,
                    playerPosRight = player.el.getBoundingClientRect().right,
                    playerPosBottom = player.el.getBoundingClientRect().bottom,
                    playerPosLeft = player.el.getBoundingClientRect().left,
                    enemyPosTop = enemy.getBoundingClientRect().top,
                    enemyPosRight = enemy.getBoundingClientRect().right,
                    enemyPosBottom = enemy.getBoundingClientRect().bottom,
                    enemyPosLeft = enemy.getBoundingClientRect().left;

                if (
                    playerPosTop < enemyPosBottom &&
                    playerPosBottom > enemyPosTop &&
                    playerPosRight > enemyPosLeft &&
                    playerPosLeft < enemyPosRight
                ) {
                    restart();
                    //alert('Collision')
                }
    
                let bullets = document.querySelectorAll('.bullet');
    
                bullets.forEach((bullet) => {
    
                    let direction = bullet.getAttribute('direction');
    
                    if (['top', 'left', 'right'].includes(direction)) {
                        if (
                            bullet.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
                            bullet.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top &&
                            bullet.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                            bullet.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                        ) {
                            enemy.parentNode.removeChild(enemy);
                            bullet.parentNode.removeChild(bullet);
                            points += 1;
                            document.querySelector('.inner-points').innerText = points;
                        }
                    } else {
                        if (
                            bullet.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top &&
                            bullet.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                            bullet.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                        ) {
                            enemy.parentNode.removeChild(enemy);
                            bullet.parentNode.removeChild(bullet);
                        }
                    }
                });

                let direction = enemy.getAttribute('direction');

                switch (direction) {
                    case 'right':
                        if (enemy.getBoundingClientRect().left <= 0) {
                            enemy.parentNode.removeChild(enemy);
                        } else {
                            enemy.style.left = enemy.getBoundingClientRect().left - 2 + 'px';
                        }
                        break;

                    case 'left':
                        if (enemy.getBoundingClientRect().right >= gameZone.getBoundingClientRect().width) {
                            enemy.parentNode.removeChild(enemy);
                        } else {
                            enemy.style.left = enemy.getBoundingClientRect().left + 2 + 'px';
                        }
                        break;

                    case 'top':
                        if (enemy.getBoundingClientRect().top <= 0) {
                            enemy.parentNode.removeChild(enemy);
                        } else {
                            enemy.style.top = enemy.getBoundingClientRect().top - 2 + 'px';
                        }
                        break;

                    case 'bottom':
                        if (enemy.getBoundingClientRect().bottom >= gameZone.getBoundingClientRect().height) {
                            enemy.parentNode.removeChild(enemy);
                        } else {
                            enemy.style.top = enemy.getBoundingClientRect().top + 2 + 'px';
                        }
                        break;
                }
    
                //if (enemy.getBoundingClientRect().right >= gameZone.getBoundingClientRect().width) {
                //    enemy.parentNode.removeChild(enemy);
                //} else {
                //    enemy.style.left = enemy.getBoundingClientRect().left + 1.6 + 'px';
                //}
    
            })
        }, fps);

        ints.generateEnemy = setInterval(() => {

            let direction = randomInteger(1, 4);

            switch (direction) {
                case 1: // top
                    gameZone.innerHTML += `<div class="enemy" style="transform: rotate(-90deg); top: ${gameZone.getBoundingClientRect().height - player.height}px; left: ${randomInteger(0, gameZone.getBoundingClientRect().width - player.width)}px" direction="top"></div>`;
                    break;
                case 2: // left
                    gameZone.innerHTML += `<div class="enemy" style="transform: rotate(-180deg); top:  ${randomInteger(0, gameZone.getBoundingClientRect().height - player.height)}px; left: ${gameZone.getBoundingClientRect().width - player.width}px;" direction="right"></div>`;
                    break;
                case 3: // bottom
                    gameZone.innerHTML += `<div class="enemy" style="transform: rotate(90deg); top: 0; left: ${randomInteger(0, gameZone.getBoundingClientRect().width - player.width)}px;" direction="bottom"></div>`;
                    break;
                case 4: // right
                    gameZone.innerHTML += `<div class="enemy" style="transform: rotate(0deg); top: ${randomInteger(0, gameZone.getBoundingClientRect().height - player.height)}px; left: 0;" direction="left"></div>`;
                    break;
            }

 
            player.el = document.querySelector('.player');
        }, 1500);
    }
    
    /*
        Add Bullet
     */
    
    function addBullet() {
    
        switch (player.side) {
            case 1:
                gameZone.innerHTML += `<div class="bullet" direction="top" style="left: ${(player.x + (player.width / 2)) - 6.5}px; top: ${player.y - 16}px;"></div>`;
            break;
            case 2:
                gameZone.innerHTML += `<div class="bullet" direction="right" style="left: ${(player.x + player.width) - 6.5}px; top: ${player.y + 30}px;"></div>`;
            break;
            case 3:
                gameZone.innerHTML += `<div class="bullet" direction="bottom" style="left: ${(player.x + (player.width / 2)) - 7}px; bottom: ${gameZone.getBoundingClientRect().height - player.y - player.height}px;"></div>`;
            break;
            case 4:
                gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${(player.x) - 6.5}px; top: ${player.y + player.height / 2 - 10}px;"></div>`;
            break;
           }
        
           player.el = document.querySelector('.player');
        }
        
    
    /*
        Controllers
     */
    
        function controllers() {
            document.addEventListener ('keydown', (e) => {
                switch (e.key) {
                    case 'w': //top
                        player.el.style.backgroundImage = `url(${player.sprites.top})`;
                        player.run = true;
                        player.side = 1;
                        break;
                    case 's': //bottom
                        player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                        player.run = true;
                        player.side = 3;
                        break;
                    case 'd': //right
                        player.el.style.backgroundImage = `url(${player.sprites.right})`;
                        player.run = true;
                        player.side = 2;
                        break;
                    case 'a': //left
                        player.el.style.backgroundImage = `url(${player.sprites.left})`;
                        player.run = true;
                        player.side = 4;
                        break;
                }
                } );
            
                gameZone.addEventListener('mousedown', (event) => {//bullet
                    if (event.button === 0) {
                        addBullet();
                    }
                });
            
                document.addEventListener ('keyup', (e) => {
                    if (['w', 'd', 's', 'a'].includes(e.key))
            player.run = false;
            } );
            }
    
    
    /*
        Start Game
     */
    
    function game() {
        init();
        controllers();
        intervals();
    }
    
    let gameZone = document.querySelector('.game-zone'),
        points = 0,
        fps = 1000 / 90,
        player = {
            sprites: {
                top: 'img/player-top.png',
                right: 'img/player-right.png',
                bottom: 'img/player-bottom.png',
                left: 'img/player-left.png',
            },
            el: false,
            x: 500,
            y: 400,
            step: 2,
            run: false,
            side: 1, //1 (top), 2 (right), 3 (bottom), 4 (left),
            width: 78,
            height: 77
        },
        bulletSpeed = 7.3,
        ints = {
            run: false,
            bullet: false,
            enemy: false,
            generateEnemy: false,
        };
    
    game();