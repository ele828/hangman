
const tpl = `
    <section class="input-wrap">
        <h1>HANGMAN GAME</h1>
        <section class="input-section">
            <span class="input-entry"></span>
        </section>
        <section class="input-keyboard"></section>
        <button class="start">START</button>
    </section>`;

export default class Input {
    constructor(container) {
        this.inputLetter = '';
        this.entry = null;
        this.container = container;
        this.container.innerHTML += tpl;
    }

    enter(letter) {
        this.inputLetter += letter;
        this._setIndicator(this.inputLetter);

    }

    restart() {
        this._appear();
        this._setIndicator('');
    }

    showInvalid() {
        if (!this.entry)
            this.entry = document.querySelector('.input-entry');
        const btn = document.querySelector('.start');
        btn.style.boxShadow = '0 0 5px 5px red';
        btn.style.background = 'red';
        btn.style.color = "#fff";
        this.entry.style.boxShadow = '0 0 5px 5px red';
        this.entry.style.borderColor = "#fff";
        setTimeout(() => {
            btn.style.boxShadow = 'none';
            btn.style.background = '#fff';
            btn.style.color = "#000";
            this.entry.style.boxShadow = 'none';
            this.entry.style.borderColor = "#000";
        }, 500);
    }

    addListener(observerFunc, errFunc) {
        document.querySelector('.start').addEventListener('click', (evt) => {
            if (this.inputLetter.length > 0) {
                observerFunc(evt, this.inputLetter);
                this.inputLetter = '';
                this._disappear();
            } else {
                errFunc();
            }
        });
    }

    _setIndicator(str) {
        if (!this.entry)
            this.entry = document.querySelector('.input-entry');
        this.entry.innerHTML = this.inputLetter;
    }

    _disappear() {
        const inputSecene = document.querySelector('.input-wrap');
        inputSecene.style.opacity = 0;
        setTimeout(() => {
            inputSecene.style.display = 'none';
        }, 900);
    }

    _appear() {
        const inputSecene = document.querySelector('.input-wrap');
        inputSecene.style.display = 'block';
        setTimeout(() => {
            inputSecene.style.opacity = '1';
        }, 100);
    }

}
