import Utils from './Utils';

// Game Logic implementation
// isolated from DOM manipulation
// convenient for Unit Test
export default class Controller {
    constructor(params) {
        // copy params to `this` context.
        // { keyboard, wordDisp, missDisp, gameStatus, man }
        Utils.objectAssign(this, params);
        this.word = '';
        this.right = [];
        this.miss = [];

        if ( !this.keyboard ||
            !this.wordDisp ||
            !this.missDisp ||
            !this.gameStatus ||
            !this.man) {
                throw new Error('Not enough params to initiate controller');
        }
    }

    gameStart(word) {
        // process word to uppercase
        // and assign to this.word
        if(word) this.setWord(word);
    }

    setWord(word) {
        this.word = word.trim().toUpperCase();
        // only upper case letter
        if (/^[A-Z]*$/.test(this.word)) {
            this.wordDisp.setLength(word.length);
            return true;
        }
        return false;
    }

    gameRestart() {
        this._newGame(true);
    }

    gameReload() {
        this._newGame(false, this.word);
    }

    processLogic(letter) {
        // ever selected
        if (this.right.indexOf(letter) >= 0 ||
            this.miss.indexOf(letter) >= 0)
                return;

        let ret = this._appearIndex(letter);

        // guess wrong
        if (ret.length === 0) {
            this.miss.push(letter);
            this.missDisp.miss(letter);
            this.man.draw();
            if (this.miss.length >= 6)
                this._gameLose();
        }
        // guess right
        else {
            ret.forEach((o) => {
                this.wordDisp.setLetter(o.letter, o.index);
                this.right[o.index] = o.letter;
            });
            if (this.right.join('') === this.word)
                this._gameWin();
        }

    }

    _newGame(isRestart, word) {
        // invoke the restart func of each component.
        for (let n in this) {
            let func = this[n];
            if (typeof func.restart === 'function') {
                func.restart();
            }
        }
        if (!isRestart) this.setWord(word);
        this.right = [];
        this.miss = [];
        console.log('game restarted');
    }

    _gameLose() {
        this.gameStatus.lose();
    }

    _gameWin() {
        console.log('game win');
        this.gameStatus.win();
    }

    _appearIndex(letter) {
        let retval = [];
        for (var i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                retval.push({
                    letter: letter,
                    index: i
                });
            }
        }
        return retval;
    }

}
