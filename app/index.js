import './main.css';

import Input from './Input';
import HangMan from './HangMan';
import Keyboard from './Keyboard';
import MissDisplay from './MissDisplay';
import WordDisplay from './WordDisplay';
import GameStatus from './GameStatus';
import Controller from './Controller';

const hangmanCont = document.querySelector('.hangman-container');
const keyboardCont = document.querySelector('.keyboard');
const statusCont = document.querySelector('.status-container');
const displayCont = document.querySelector('.display');
const inputCont = document.querySelector('.input-container');

const hangMan = new HangMan(hangmanCont);
const keyboard = new Keyboard(keyboardCont);
const wordDispalay = new WordDisplay(displayCont);
const missDisplay = new MissDisplay(displayCont);
const gameStatus = new GameStatus(statusCont);
const input = new Input(inputCont);

const iKeyCont = document.querySelector('.input-keyboard');
const inputKeyboard = new Keyboard(iKeyCont);

const controller = new Controller({
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
        controller.setWord(word);
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
    controller.processLogic(letter);
});

// Listen to game status button event
gameStatus.addListener(
    (evt) => {
        input.restart();
        setTimeout(() => {
            controller.gameRestart();
        }, 900);
    },
    (evt) => {
        controller.gameReload();
    }
);
