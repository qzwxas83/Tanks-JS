/*
    Init
*/   

let gameZone = document.querySelector('.game-zone'),
    fps = 1000 / 120,
    player = {
        bullet: {
            speed: 3.23
        },
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
    }
    player2 = {
        bullet2: {
            speed: 3.23
        },
        sprites: {
        top: 'img/player2-top.png',
        bottom: 'img/player2-bottom.png',
        right: 'img/player2-right.png',
        left: 'img/player2-left.png',
        },
        el: false,
        x: 500,
        y: 30,
        step: 2,
        run2: false,
        side: 3, //1 (top), 2 (right), 3 (bottom), 4 (left)
        width: 78,
        height: 77,
    }

function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    gameZone.innerHTML += `<div class="player2" style="left: ${player2.x}px; top: ${player2.y}px"></div>`; 
    player.el = document.querySelector('.player')
    player2.el = document.querySelector('.player2')

}

/*
    Intervals
*/

let ints = {run: false};

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
    ints.run = setInterval(() => {
        if (player2.run2) {
            switch (player2.side) {
                case 1: // top
                    if (player2.y > 0) {
                        player2.el.style.backgroundImage = `url(${player2.sprites.top})`;
                        player2.y -= player2.step;
                        player2.el.style.top = `${player2.y}px`;
                    }
                    break;
                case 3: // bottom
                if (player2.y < gameZone.getBoundingClientRect().bottom - player2.height - 2) {
                    player2.el.style.backgroundImage = `url(${player2.sprites.bottom})`;
                    player2.y += player2.step;
                    player2.el.style.top = `${player2.y}px`;
                }
                    break;
                case 2: // right
                    if (player2.x < gameZone.getBoundingClientRect().right - player2.width - 3) {
                        player2.el.style.backgroundImage = `url(${player2.sprites.right})`;
                        player2.x += player2.step;
                        player2.el.style.left = `${player.x}px`;
                    }
                    break;
                case 4: // left
                    if (player2.x > 0) {
                        player2.el.style.backgroundImage = `url(${player2.sprites.left})`;
                        player2.x -= player2.step;
                        player2.el.style.left = `${player2.x}px`;
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
                    bullet.style.top = bullet.getBoundingClientRect().top - player.bullet.speed + 'px';
                }
                break;

                case 'right':
                if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                    bullet.parentNode.removeChild(bullet);
                } else {
                    bullet.style.left = bullet.getBoundingClientRect().left + player.bullet.speed + 'px';
                }
                break;
                case 'bottom':
    if (bullet.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
        bullet.parentNode.removeChild(bullet);
    } else {
        bullet.style.top = bullet.getBoundingClientRect().top + player.bullet.speed + 'px';
    }
    break;
    case 'left':
                if (bullet.getBoundingClientRect().left < 0) {
                    bullet.parentNode.removeChild(bullet);
                } else {
                    bullet.style.left = bullet.getBoundingClientRect().left - player.bullet.speed + 'px';
                }
                break;
        }
     })
    }, fps);
}
ints.bullet2 = setInterval(() => {
    let bullets2 = document.querySelectorAll('.bullet2');
    bullets2.forEach((bullet2) => {
        let direction2 = bullet2.getAttribute('direction2');

        switch (direction2) {

            case 'top':
                if (bullet2.getBoundingClientRect().top < 0) {
                    bullet2.parentNode.removeChild(bullet2);
                } else {
                    bullet2.style.top = bullet2.getBoundingClientRect().top - player2.bullet2.speed + 'px';
                }
                break;

                case 'right':
                if (bullet2.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                    bullet2.parentNode.removeChild(bullet2);
                } else {
                    bullet2.style.left = bullet2.getBoundingClientRect().left + player2.bullet2.speed + 'px';
                }
                break;
                case 'bottom':
    if (bullet2.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
        bullet2.parentNode.removeChild(bullet2);
    } else {
        bullet2.style.top = bullet2.getBoundingClientRect().top + player2.bullet2.speed + 'px';
    }
    break;
    case 'left':
                if (bullet2.getBoundingClientRect().left < 0) {
                    bullet2.parentNode.removeChild(bullet2);
                } else {
                    bullet2.style.left = bullet2.getBoundingClientRect().left - player2.bullet2.speed + 'px';
                }
                break;
        }
     })
    }, fps);


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

   player2.el = document.querySelector('.player2');
   switch (player.side) {
    case 1:
        gameZone.innerHTML += `<div class="bullet2" direction2="top" style="left: ${(player2.x + (player2.width / 2)) - 6.5}px; top: ${player2.y - 16}px;"></div>`;
    break;
    case 2:
        gameZone.innerHTML += `<div class="bullet2" direction2="right" style="left: ${(player2.x + player2.width) - 6.5}px; top: ${player2.y + 30}px;"></div>`;
    break;
    case 3:
        gameZone.innerHTML += `<div class="bullet2" direction2="bottom" style="left: ${(player2.x + (player2.width / 2)) - 7}px; bottom: ${gameZone.getBoundingClientRect().height - player2.y - player2.height}px;"></div>`;
    break;
    case 4:
        gameZone.innerHTML += `<div class="bullet2" direction2="left" style="left: ${(player2.x) - 6.5}px; top: ${player2.y + player2.height / 2 - 10}px;"></div>`;
    break;
   }

   player2.el = document.querySelector('.player2');
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
