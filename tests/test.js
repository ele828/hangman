import expect from 'expect.js';

import '../app/main.css';
import Controller from '../app/Controller';
import Input from '../app/Input';
import HangMan from '../app/HangMan';
import Keyboard from '../app/Keyboard';
import MissDisplay from '../app/MissDisplay';
import WordDisplay from '../app/WordDisplay';
import GameStatus from '../app/GameStatus';

const hangmanCont = findNode('.hangman-container');
const keyboardCont = findNode('.keyboard');
const statusCont = findNode('.status-container');
const displayCont = findNode('.display');
const inputCont = findNode('.input-container');

const hangMan = new HangMan(hangmanCont);
const keyboard = new Keyboard(keyboardCont);
const wordDispalay = new WordDisplay(displayCont);
const missDisplay = new MissDisplay(displayCont);
const gameStatus = new GameStatus(statusCont);
const input = new Input(inputCont);

const iKeyCont = findNode('.input-keyboard');
const inputKeyboard = new Keyboard(iKeyCont);

const ctrl = new Controller({
    keyboard: keyboard,
    wordDisp: wordDispalay,
    missDisp: missDisplay,
    man: hangMan,
    gameStatus: gameStatus
});

// Game Event Hanlder
input.addListener(
    // start game
    (evt, word) => {
        ctrl.setWord(word);
    },
    // input invalid word
    () => {
        input.showInvalid();
    }
);

inputKeyboard.addListener((evt) => {
    const node = evt.target;
    const letter = node.className.replace('letter ', '');
    console.log(letter);
    input.enter(letter);
});

keyboard.addListener((evt) => {
    const node = evt.target;
    node.style.opacity = 0;
    const letter = node.className.replace('letter ', '');
    ctrl.processLogic(letter);
});

// Listen to game status button event
gameStatus.addListener(
    (evt) => {
        input.restart();
        setTimeout(() => {
            ctrl.gameRestart();
        }, 900);
    },
    (evt) => {
        ctrl.gameReload();
    }
);

describe("Hangmang game unit test", () => {
	it("controller can be init properly", (done) => {
		var c = new Controller({
		    keyboard: keyboard,
		    wordDisp: wordDispalay,
		    missDisp: missDisplay,
		    man: hangMan,
		    gameStatus: gameStatus
		});
		done();
	});

	it("could pass word validation test", (done) => {
		let ret = ctrl.setWord('abc');
		expect(ret).to.be(true);
		done();
	});

	it("could not input empty word", (done) => {
		click(findNode('.start'));
		let opc = style(findNode('.input-wrap')).opacity;
		expect(opc).to.be('1');
		done();
	});

	it("could start", (done) => {
		ctrl.gameRestart();
		input.enter("B");
		input.enter("i");
		input.enter("t");
		input.enter("t");
		input.enter("i");
		input.enter("t");
		input.enter("a");
		click(findNode('.start'));
		done();
	});

	it("could failed", (done) => {
		setTimeout(() => {
			click(findNode('.B'))
		}, 300);
		setTimeout(() => {
			click(findNode('.W'))
		}, 400);
		setTimeout(() => {
			click(findNode('.K'))
		}, 500);
		setTimeout(() => {
			click(findNode('.M'))
		}, 600);
		setTimeout(() => {
			click(findNode('.D'))
		}, 700);
		setTimeout(() => {
			click(findNode('.Q'))
		}, 800);
		setTimeout(() => {
			click(findNode('.M'))
		}, 900);
		setTimeout(() => {
			click(findNode('.N'))
			let ret = findNode('.status').innerHTML.indexOf('LOSE') >= 0;
			expect(ret).to.be(true);
			done()
		}, 1000);
	});

	it("could win", (done) => {
		click(findNode('.try-again'));
		setTimeout(() => {
			click(findNode('.B'))
		}, 300);
		setTimeout(() => {
			click(findNode('.I'))
		}, 400);
		setTimeout(() => {
			click(findNode('.T'))
		}, 500);
		setTimeout(() => {
			click(findNode('.A'))
		}, 600);
		setTimeout(() => {
			click(findNode('.N'))
			let ret = findNode('.status').innerHTML.indexOf('WIN') >= 0;
			expect(ret).to.be(true);
			done();
		}, 700);
	});

	it("could restart", (done) => {
		click( findNode('.restart') );
		setTimeout(() => {
			let opc = style(findNode('.input-wrap')).opacity;
			expect(opc).to.be('1');
			done();
		}, 1000);
	});

	it('try again button performs correctly', (done) => {
		ctrl.gameRestart();
		input.enter("B");
		input.enter("i");
		input.enter("t");
		input.enter("t");
		input.enter("i");
		input.enter("t");
		input.enter("a");
		click(findNode('.start'));
		setTimeout(() => {
			click(findNode('.B'))
		}, 300);
		setTimeout(() => {
			click(findNode('.I'))
		}, 400);
		setTimeout(() => {
			click(findNode('.T'))
		}, 500);
		setTimeout(() => {
			click(findNode('.A'))
		}, 600);
		setTimeout(() => {
			click(findNode('.N'))
			let ret = findNode('.status').innerHTML.indexOf('WIN') >= 0;
			expect(ret).to.be(true);
			click( findNode('.try-again') );
			setTimeout(() => {
				click(findNode('.B'))
			}, 300);
			setTimeout(() => {
				click(findNode('.I'))
			}, 400);
			setTimeout(() => {
				click(findNode('.T'))
			}, 500);
			setTimeout(() => {
				click(findNode('.A'))
			}, 600);
			setTimeout(() => {
				click(findNode('.N'))
				let ret = findNode('.status').innerHTML.indexOf('WIN') >= 0;
				expect(ret).to.be(true);
				done();
			}, 700);
		}, 700);
	});

	it('word indicator is right', (done) => {
		click(findNode('.try-again'));
		click(findNode('.B'));
		let firstLetter = findNode('.word-container').firstChild.innerHTML;
		expect(firstLetter).to.be('B');
		done();
	});

	it('should be added to miss list and counter + 2', (done) => {
		click(findNode('.H'));
		click(findNode('.L'));
		let disp = findNode('.miss-display').innerHTML;
		let counter = findNode('.counter').innerHTML;
		expect(disp).to.be('HL');
		expect(counter).to.be('2');
		done();
	});

	it('hangman performs correctly', (done) => {
		let op1 = style( findNode('.head') ).opacity;
		let op2 = style( findNode('.body') ).opacity;
		let op3 = style( findNode('.left-hand') ).opacity;
		expect(op1).to.be('1');
		expect(op2).to.be('1');
		expect(op3).to.be('0');
		done();
	});

});

function findNode(str) {
	return document.querySelector(str);
}

function click(el) {
	var evt;
	if (document.createEvent) { // DOM Level 2 standard
		evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
			el.dispatchEvent(evt);
	} else if (el.fireEvent) { // IE
		el.fireEvent('onclick');
	}
}

function style(ele) {
	return window.getComputedStyle ?
			window.getComputedStyle(ele, "") :
			ele.currentStyle;
}
