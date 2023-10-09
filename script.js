/*
    Init
*/   

let gameZone = document.querySelector('.game-zone'),
    fps = 1000 / 120,
    player = {
        sprites: {
        top: 'img/player-top.png',
        bottom: 'img/player-bottom.png',
        right: 'img/player-right.png',
        left: 'img/player-left.png',
        },
        el: false,
        x: 712,
        y: 600,
        step: 2,
        run: false,
        side: 1, //1 (top), 2 (right), 3 (bottom), 4 (left)
        width: 78,
        height: 77,
    },
    bulletSpeed = 3.23
    ints = {
        run: false,
        bullet: false,
        enemy: false
    };

   
function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    player.el = document.querySelector('.player')
}

/*
    Intervals
*/

function intervals() {
    ints.run = setInterval(() => {
        if (player.run) {
            switch (player.side) {
                case 1: // top
                    if (player.y > 0) {
                        player.el.style.backgroundImage = `url(${player.sprites.top})`;
                        player.y -= player.step;
                        player.el.style.top = `${player.y}px`;
                    }
                    break;
                case 3: // bottom
                if (player.y < gameZone.getBoundingClientRect().bottom - player.height - 2) {
                    player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                    player.y += player.step;
                    player.el.style.top = `${player.y}px`;
                }
                    break;
                case 2: // right
                    if (player.x < gameZone.getBoundingClientRect().right - player.width - 3) {
                        player.el.style.backgroundImage = `url(${player.sprites.right})`;
                        player.x += player.step;
                        player.el.style.left = `${player.x}px`;
                    }
                    break;
                case 4: // left
                    if (player.x > 0) {
                        player.el.style.backgroundImage = `url(${player.sprites.left})`;
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

            
            let bullets = document.querySelectorAll('.bullet');

            bullets.forEach((bullet) => {

                let direction = bullet.getAttribute('direction');

                if (['top', 'left', 'right' ].includes(direction)) {
                    if (
                        bullet.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
                        bullet.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                        bullet.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                    ) {
                        enemy.parentNode.removeChild(enemy);
                        bullet.parentNode.removeChild(bullet);
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

            if (enemy.getBoundingClientRect().right >= gameZone.getBoundingClientRect().width) {
                enemy.style.left = '0px';
            } else {
                enemy.style.left = enemy.getBoundingClientRect().left + 1.21 + 'px';
            }
        })
    }, fps)
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
             player.run = true;
             player.side = 1;
             break;
        case 's': //bottom
            player.run = true;
            player.side = 3;
        break;
        case 'd': //right
            player.run = true;
            player.side = 2;
        break;
        case 'a': //left
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
    controllers();
    init();
    intervals();
}
    
    game();
