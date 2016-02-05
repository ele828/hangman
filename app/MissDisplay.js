
const tpl  = `<section class="miss-container">
    <span>MISS</span>
    <span class="indicator">(</span>
    <span class="indicator counter">0</span>
    <span class="indicator">/6 )</span>
    <span>:</span>
    <span class="miss-display"></span>
</section>`;

export default class Display {
    constructor(container) {
        // dom cache
        this.missCont = null;
        this.counter = null;

        this.missCount = 0;
        this.container = container;
        container.innerHTML += tpl;
    }

    miss(letter) {
        if (!this.missCont)
            this.missCont = document.querySelector('.miss-display');
        this.missCont.innerHTML += letter;
        this.missCount++;
        if (!this.counter)
            this.counter = document.querySelector('.counter');
        this.counter.innerHTML = this.missCount;
    }

    restart() {
        if(this.missCont) {
            this.missCont.innerHTML = '';
            this.missCount = 0;
            this.counter.innerHTML = this.missCount;
        }
    }

}
