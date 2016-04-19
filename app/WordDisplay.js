
const tpl  = `<section class="word-container"></section>`;

export default class Display {
    constructor(container) {
        this.container = container;
        this.children = [];
        container.innerHTML += tpl;
    }

    setLength(len) {
        const wordCont = document.querySelector('.word-container');
        while(len-- > 0)
            wordCont.innerHTML += '<span class="letter-node"></span>';
    }

    setLetter(letter, idx) {
        if (this.children.length === 0) {
            const childNodes = document.querySelector('.word-container').childNodes;
            for(let i = 0; i < childNodes.length; i++)
    			if (childNodes[i].nodeType == 1)
    				this.children.push(childNodes[i]);
        }
        this.children[idx].innerHTML = letter;
    }

    restart() {
        document.querySelector('.word-container').innerHTML = '';
        this.children = [];
    }

}
