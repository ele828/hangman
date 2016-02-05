// Game Win or Lose component

const tpl = `
    <section class="status-wrap">
        <section class="status"></section>
        <button class="restart">RESTART</button>
        <button class="try-again">TRY AGAIN</button>
    </section>`;
export default class GameStatus {
    constructor(container) {
        this.container = container;
        container.innerHTML += tpl;
        this.statusNode = document.querySelector('.status');
        this.statusWrap = document.querySelector('.status-wrap');
        this.restartBtn = document.querySelector('.restart');
        this.tryAgainBtn = document.querySelector('.try-again');
    }

    win() {
        this.statusWrap.style.display = "block";
        this.statusWrap.style.background = "red";
        setTimeout(() => {
            this.statusWrap.style.opacity = 1;
        }, 300);
        this.statusNode.innerHTML = "Congrats, You WIN!";
    }

    lose() {
        this.statusWrap.style.display = "block";
        this.statusWrap.style.background = "green";
        setTimeout(() => {
            this.statusWrap.style.opacity = 1;
        }, 300);
        this.statusNode.innerHTML = "Regrets, You LOSE!";
    }

    restart(controller) {
        this.statusWrap.style.opacity = 0;
        setTimeout(() => {
            this.statusWrap.style.display = "none";
        }, 500);
    }

    addListener(restartFunc, tryAginFunc) {
        this.restartBtn.addEventListener('click', restartFunc);
        this.tryAgainBtn.addEventListener('click', tryAginFunc);
    }

}
