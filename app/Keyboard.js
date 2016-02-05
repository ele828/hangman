
import Utils from './Utils';

const keyMap = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
];

export default class Keyboard {
    constructor(container) {
        this.container = container;
        this.keyNodes = null;
        // can be many keyboards
        this.objID = Utils.genRandStr(5);
        this._createKeyboard();
    }

    addListener( observerFunc ) {
        const keyNodes = this.keyNodes = document.querySelectorAll("#" + this.objID + ' .letter');
        for(var i = 0; i < keyNodes.length; i++) {
            keyNodes[i].addEventListener('click', observerFunc);
        }
    }

    restart() {
        console.log('keyboard restart');
        Utils.convertToArray(this.keyNodes).forEach((node) => {
            node.style.opacity = 1;
        });
    }

    _createKeyboard() {
        let tpl = [];
        keyMap.forEach((line, i) => {
            tpl.push(`<section class="line" id="${this.objID}">`);
            line.split('').forEach((letter) => {
                tpl.push(`<span class="key">
                            <button class="letter ${letter}">${letter}</button>
                          </span>`);
            });
            tpl.push('</section>');
        });

        // attach keys to dom
        this.container.innerHTML = this.container.innerHTML + tpl.join('');
    }

}
