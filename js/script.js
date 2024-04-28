const mario = document.querySelector('.mario');
const pipes = document.querySelectorAll('.pipe'); 
const audioJump = document.querySelector('.audiojump');
const gameOver = document.querySelector('.gameover');
const textStart = document.querySelector('#text-start');
let pontuacao = 0;
const pontuacaoElement = document.getElementById("pontuacao");

let isJumping = false;

const restartGame = () => {
    pontuacao = 0;
    mario.style.bottom = '0';
    mario.src = 'img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    pipes.forEach(pipe => {
        pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    });
}

const loop = setInterval(() => {
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    pipes.forEach(pipe => {
        const pipePosition = pipe.offsetLeft;

        if (!isJumping && pipePosition < 350 && pipePosition > 100 && marioPosition < 80) {
            jump();
            pontuacao++;
            pontuacaoElement.textContent = pontuacao;
        }
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOverHandler();
        }

    });
}, 5); 



const jump = () => {
    mario.classList.add('jump');
    audioJump.currentTime = 0.1;
    audioJump.volume = 0.1;
    audioJump.play();
    isJumping = true;
    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 400);
}

const gameOverHandler = () => {
    pipes.forEach(pipe => {
        pipe.style.animation = 'none';
    });
    gameOver.currentTime = 0.1;
    gameOver.volume = 0.2;
    gameOver.play();
    document.getElementById("text-start").style.color = "black";
    document.getElementById("text-start").innerHTML = "<strong>GAME OVER</strong>";
    setTimeout(restartGame, 2000);
}

