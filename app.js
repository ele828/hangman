/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _Input = __webpack_require__(5);

	var _Input2 = _interopRequireDefault(_Input);

	var _HangMan = __webpack_require__(6);

	var _HangMan2 = _interopRequireDefault(_HangMan);

	var _Keyboard = __webpack_require__(7);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _MissDisplay = __webpack_require__(9);

	var _MissDisplay2 = _interopRequireDefault(_MissDisplay);

	var _WordDisplay = __webpack_require__(10);

	var _WordDisplay2 = _interopRequireDefault(_WordDisplay);

	var _GameStatus = __webpack_require__(11);

	var _GameStatus2 = _interopRequireDefault(_GameStatus);

	var _Controller = __webpack_require__(12);

	var _Controller2 = _interopRequireDefault(_Controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hangmanCont = document.querySelector('.hangman-container');
	var keyboardCont = document.querySelector('.keyboard');
	var statusCont = document.querySelector('.status-container');
	var displayCont = document.querySelector('.display');
	var inputCont = document.querySelector('.input-container');

	var hangMan = new _HangMan2.default(hangmanCont);
	var keyboard = new _Keyboard2.default(keyboardCont);
	var wordDispalay = new _WordDisplay2.default(displayCont);
	var missDisplay = new _MissDisplay2.default(displayCont);
	var gameStatus = new _GameStatus2.default(statusCont);
	var input = new _Input2.default(inputCont);

	var iKeyCont = document.querySelector('.input-keyboard');
	var inputKeyboard = new _Keyboard2.default(iKeyCont);

	var controller = new _Controller2.default({
	    keyboard: keyboard,
	    wordDisp: wordDispalay,
	    missDisp: missDisplay,
	    man: hangMan,
	    gameStatus: gameStatus
	});

	// Game Event Hanlder
	input.addListener(
	// start game
	function (evt, word) {
	    controller.setWord(word);
	},
	// input invalid word
	function () {
	    input.showInvalid();
	});

	inputKeyboard.addListener(function (evt) {
	    var node = evt.target;
	    var letter = node.className.replace('letter ', '');
	    console.log(letter);
	    input.enter(letter);
	});

	keyboard.addListener(function (evt) {
	    var node = evt.target;
	    node.style.opacity = 0;
	    var letter = node.className.replace('letter ', '');
	    controller.processLogic(letter);
	});

	// Listen to game status button event
	gameStatus.addListener(function (evt) {
	    input.restart();
	    setTimeout(function () {
	        controller.gameRestart();
	    }, 900);
	}, function (evt) {
	    controller.gameReload();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".container {\n\twidth: 700px;\n\theight: 400px;\n\tbackground: #fff;\n\tposition: absolute;\n\ttop: 45%;\n\tleft: 50%;\n\t-webkit-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\tbox-shadow: 0 0 30px 1px #4b4c4c;\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t    -ms-user-select: none;\n\t        user-select: none;\n}\n\n.guess-container {\n\toverflow: hidden;\n\twidth: 400px;\n\theight: 400px;\n\tdisplay: inline-block;\n\tposition: absolute;\n\t/*background: red;*/\n}\n\n.hangman-container {\n\t/*display: none;*/\n\tdisplay: inline-block;\n\tposition: absolute;;\n\tleft: 340px;\n\ttop: -10px;\n}\n.input-container {\n\toverflow: hidden;\n\twidth: 100%;\n\theight: 400px;\n}\n.input-wrap {\n\topacity: 1;\n\tposition: absolute;\n\twidth: 100%;\n\theight: 400px;\n\tz-index: 99999;\n\tbackground: purple;\n\ttext-align: center;\n\t-webkit-transition: .5s;\n\ttransition: .5s;\n\toverflow: hidden;\n}\n\n.input-wrap h1 {\n\tmargin-top: 40px;\n\tcolor: #fff;\n\tfont-size: 30px;\n}\n\n.input-section {\n\theight: 30px;\n\tmargin-top: 40px;\n}\n\n.start {\n\tdisplay: inline-block;\n\twidth: 150px;\n\theight: 40px;\n\tborder-radius: 30px;\n\tborder: 2px solid #000;\n\tbackground: #fff;\n\tfont-size: 20px;\n\toutline: none;\n\t-webkit-transition: .5s;\n\ttransition: .5s;\n}\n.start:hover {\n\tbox-shadow: 0 0 10px 5px #ccc;\n\tborder: 1px solid #fff;\n}\n\n.input-entry {\n\tdisplay: inline-block;\n\twidth: 250px;\n\theight: 30px;\n\tborder: 2px solid #000;\n\tborder-radius: 30px;\n\tbackground: #fff;\n\tline-height: 32px;\n\tcolor: green;\n\tfont-weight: 300;\n\tfont-size: 23px;\n\tletter-spacing: 7px;\n}\n\n.input-keyboard {\n\theight: 150px;\n\tmargin-top: 30px;\n}\n\n.input-keyboard .line {\n\ttext-align: center;\n\t/*width: 10px;*/\n\theight: 40px;\n}\n.input-keyboard .key {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\twidth: 25px;\n\theight: 25px;\n\tmargin: 5px;\n}\n.input-keyboard .letter {\n\tcursor:pointer;\n\tdisplay: inline-block;\n\twidth: 25px;\n\theight: 25px;\n\tbackground: #fff;\n\tborder: 1px solid #000;\n\toutline: none;\n\t-webkit-transition: .5s;\n\ttransition: .5s;\n\tbox-shadow: 0 0 10px 1px #ccc;\n}\n.input-keyboard .letter:hover {\n\tbackground: #000;\n\tcolor: #fff;\n}\n.input-keyboard .letter:active {\n\tbackground: #000;\n\tcolor: #fff;\n}\n\n.status-wrap {\n\tdisplay: none;\n\topacity: 0;\n\tposition: absolute;\n\twidth: 100%;\n\theight: 400px;\n\tz-index: 9999;\n\tbackground: red;\n\ttext-align: center;\n\t-webkit-transition: .9s;\n\ttransition: .9s;\n}\n\n.status {\n\tmargin-top: 120px;\n\tfont-size: 30px;\n\tfont-weight: 500;\n\tcolor: #fff;\n}\n\n.restart {\n\tmargin-top: 30px;\n\tdisplay: inline-block;\n\theight: 50px;\n\twidth: 150px;\n\tline-height: 40px;\n\tfont-size: 20px;\n\tcolor: #fff;\n\tbackground: #000;\n\tborder: 2px solid #000;\n\tborder-radius: 30px;\n\toutline: none;\n\t-webkit-transition: .4s;\n\ttransition: .4s;\n}\n\n.restart:hover {\n\tcolor: #000;\n\tbackground: #fff;\n}\n\n.try-again {\n\tmargin-top: 30px;\n\tdisplay: inline-block;\n\theight: 50px;\n\twidth: 150px;\n\tline-height: 40px;\n\tfont-size: 20px;\n\tcolor: #000;\n\tbackground: #fff;\n\tborder: 2px solid #000;\n\tborder-radius: 30px;\n\toutline: none;\n\t-webkit-transition: .4s;\n\ttransition: .4s;\n}\n.try-again:hover {\n\tcolor: #fff;\n\tbackground: #000;\n}\n\n\n.title {\n\tmargin-top: 20px;\n\ttext-align: center;\n\tfont-size: 30px;\n\tfont-weight: 500;\n}\n\n.word-container {\n\tmargin-top: 30px;\n\theight: 100px;\n\t/*background: red;*/\n\ttext-align: center;\n}\n\n.word-container .letter-node {\n\tmargin-top: 20px;\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n\ttext-align: center;\n\tborder-bottom: 2px solid #000;\n\tfont-size: 30px;\n\twidth: 30px;\n\theight:30px;\n\tvertical-align: middle;\n\tcolor: green;\n}\n\n.miss-container {\n\tmargin-top: 10px;\n\tfont-size: 20px;\n\ttext-align: center;\n}\n.miss-display {\n\tcolor: red;\n\tfont-weight: 900;\n\tletter-spacing: 10px;\n\tmargin-left: 10px;\n}\n.miss-container .indicator {\n\tfont-size: 18px;\n\tcolor: red;\n}\n\n.keyboard {\n\tposition: absolute;\n\tz-index: 999;\n\tleft: 20px;\n\tbottom: 30px;\n}\n\n.keyboard .line {\n\ttext-align: center;\n\t/*width: 10px;*/\n\theight: 40px;\n}\n.keyboard .key {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\twidth: 25px;\n\theight: 25px;\n\tmargin: 5px;\n}\n.keyboard .letter {\n\tcursor:pointer;\n\tdisplay: inline-block;\n\twidth: 25px;\n\theight: 25px;\n\tbackground: #fff;\n\tborder: 1px solid #000;\n\toutline: none;\n\t-webkit-transition: .5s;\n\ttransition: .5s;\n\tbox-shadow: 0 0 7px 1px silver;\n}\n.keyboard .letter:hover {\n\tbackground: #000;\n\tcolor: #fff;\n}\n.keyboard .letter:active {\n\tbackground: #000;\n\tcolor: #fff;\n}\n\nsvg {\n    /*border: 1px solid red;*/\n\t-webkit-transform: scale(0.8);\n\t        transform: scale(0.8);\n}\n.man line, .man circle {\n    opacity: 0;\n}\n.path {\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 1000;\n    -webkit-animation: dash 2s ease-in-out forwards;\n            animation: dash 2s ease-in-out forwards;\n}\n.man {\n    -webkit-animation: rotation 1s ease-in-out alternate infinite;\n            animation: rotation 1s ease-in-out alternate infinite;\n    -webkit-transform-origin: 50% 0%;\n            transform-origin: 50% 0%;\n}\n@-webkit-keyframes rotation {\n    from {\n        -webkit-transform: rotate(-10deg);\n                transform: rotate(-10deg);\n    }\n    to {\n        -webkit-transform: rotate(10deg);\n                transform: rotate(10deg);\n    }\n}\n@keyframes rotation {\n    from {\n        -webkit-transform: rotate(-10deg);\n                transform: rotate(-10deg);\n    }\n    to {\n        -webkit-transform: rotate(10deg);\n                transform: rotate(10deg);\n    }\n}\n@-webkit-keyframes dash {\n    to {\n        stroke-dashoffset: 0;\n    }\n}\n@keyframes dash {\n    to {\n        stroke-dashoffset: 0;\n    }\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tpl = '\n    <section class="input-wrap">\n        <h1>HANGMAN GAME</h1>\n        <section class="input-section">\n            <span class="input-entry"></span>\n        </section>\n        <section class="input-keyboard"></section>\n        <button class="start">START</button>\n    </section>';

	var Input = function () {
	    function Input(container) {
	        _classCallCheck(this, Input);

	        this.inputLetter = '';
	        this.entry = null;
	        this.container = container;
	        this.container.innerHTML += tpl;
	    }

	    _createClass(Input, [{
	        key: 'enter',
	        value: function enter(letter) {
	            this.inputLetter += letter;
	            this._setIndicator(this.inputLetter);
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            this._apper();
	            this._setIndicator('');
	        }
	    }, {
	        key: 'showInvalid',
	        value: function showInvalid() {
	            var _this = this;

	            if (!this.entry) this.entry = document.querySelector('.input-entry');
	            var btn = document.querySelector('.start');
	            btn.style.boxShadow = '0 0 5px 5px red';
	            btn.style.background = 'red';
	            btn.style.color = "#fff";
	            this.entry.style.boxShadow = '0 0 5px 5px red';
	            this.entry.style.borderColor = "#fff";
	            setTimeout(function () {
	                btn.style.boxShadow = 'none';
	                btn.style.background = '#fff';
	                btn.style.color = "#000";
	                _this.entry.style.boxShadow = 'none';
	                _this.entry.style.borderColor = "#000";
	            }, 500);
	        }
	    }, {
	        key: 'addListener',
	        value: function addListener(observerFunc, errFunc) {
	            var _this2 = this;

	            document.querySelector('.start').addEventListener('click', function (evt) {
	                if (_this2.inputLetter.length > 0) {
	                    observerFunc(evt, _this2.inputLetter);
	                    _this2.inputLetter = '';
	                    _this2._disapper();
	                } else {
	                    errFunc();
	                }
	            });
	        }
	    }, {
	        key: '_setIndicator',
	        value: function _setIndicator(str) {
	            if (!this.entry) this.entry = document.querySelector('.input-entry');
	            this.entry.innerHTML = this.inputLetter;
	        }
	    }, {
	        key: '_disapper',
	        value: function _disapper() {
	            var inputSecene = document.querySelector('.input-wrap');
	            inputSecene.style.opacity = 0;
	            setTimeout(function () {
	                inputSecene.style.display = 'none';
	            }, 900);
	        }
	    }, {
	        key: '_apper',
	        value: function _apper() {
	            var inputSecene = document.querySelector('.input-wrap');
	            inputSecene.style.display = 'block';
	            setTimeout(function () {
	                inputSecene.style.opacity = '1';
	            }, 100);
	        }
	    }]);

	    return Input;
	}();

	exports.default = Input;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var hangManTpl = '\n<svg width="400" height="400">\n\t<g class="shelf">\n\t\t<!-- shelf -->\n\t\t<line x1="70" x2="500" y1="20" y2="20" stroke="black" fill="transparent" stroke-width="10" />\n\t\t<line x1="200" x2="200" y1="20" y2="40" stroke="black" fill="transparent" stroke-width="10" />\n\t\t<line x1="350" x2="350" y1="20" y2="395" stroke="black" fill="transparent" stroke-width="10" />\n\t\t<line x1="70" x2="500" y1="390" y2="390" stroke="black" fill="transparent" stroke-width="10" />\n\t</g>\n\t<g class="man">\n\t\t<!-- head -->\n\t\t<circle class="head" cx="200" cy="80" r="40" stroke="black" fill="transparent" stroke-width="5" />\n\t\t<!-- body -->\n\t\t<line class="body" x1="200" x2="200" y1="120" y2="200" stroke="black" fill="transparent" stroke-width="5" />\n\t\t<!-- hands -->\n\t\t<line class="left-hand" x1="200" x2="120" y1="160" y2="90" stroke="black" fill="transparent" stroke-width="5" />\n\t\t<line class="right-hand" x1="200" x2="280" y1="160" y2="90" stroke="black" fill="transparent" stroke-width="5" />\n\t\t<!-- legs -->\n\t\t<line class="left-leg" x1="200" x2="120" y1="200" y2="300" stroke="black" fill="transparent" stroke-width="5" />\n\t\t<line class="right-leg" x1="200" x2="280" y1="200" y2="300" stroke="black" fill="transparent" stroke-width="5" />\n\t</g>\n</svg>';

	var HangMan = function () {
		function HangMan(container) {
			_classCallCheck(this, HangMan);

			this.parts = [];
			this.current = 0;
			// apend to dom
			container.innerHTML += hangManTpl;
			this.group = document.querySelector('.man');
			var childNodes = this.group.childNodes;
			for (var i = 0; i < childNodes.length; i++) {
				if (childNodes[i].nodeType == 1) this.parts.push(childNodes[i]);
			}
		}

		_createClass(HangMan, [{
			key: 'restart',
			value: function restart() {
				this.current = 0;
				// close all part
				this.parts.forEach(function (node) {
					node.style.opacity = 0;
					node.classList.remove('path');
				});
			}
		}, {
			key: 'draw',
			value: function draw() {
				if (this.current >= 6) return;
				var curNode = this.parts[this.current++];
				curNode.style.opacity = 1;
				curNode.classList.add('path');
			}
		}]);

		return HangMan;
	}();

	exports.default = HangMan;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(8);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var keyMap = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

	var Keyboard = function () {
	    function Keyboard(container) {
	        _classCallCheck(this, Keyboard);

	        this.container = container;
	        this.keyNodes = null;
	        // can be many keyboards
	        this.objID = _Utils2.default.genRandStr(5);
	        this._createKeyboard();
	    }

	    _createClass(Keyboard, [{
	        key: 'addListener',
	        value: function addListener(observerFunc) {
	            var keyNodes = this.keyNodes = document.querySelectorAll("#" + this.objID + ' .letter');
	            for (var i = 0; i < keyNodes.length; i++) {
	                keyNodes[i].addEventListener('click', observerFunc);
	            }
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            console.log('keyboard restart');
	            _Utils2.default.convertToArray(this.keyNodes).forEach(function (node) {
	                node.style.opacity = 1;
	            });
	        }
	    }, {
	        key: '_createKeyboard',
	        value: function _createKeyboard() {
	            var _this = this;

	            var tpl = [];
	            keyMap.forEach(function (line, i) {
	                tpl.push('<section class="line" id="' + _this.objID + '">');
	                line.split('').forEach(function (letter) {
	                    tpl.push('<span class="key">\n                            <button class="letter ' + letter + '">' + letter + '</button>\n                          </span>');
	                });
	                tpl.push('</section>');
	            });

	            // attach keys to dom
	            this.container.innerHTML = this.container.innerHTML + tpl.join('');
	        }
	    }]);

	    return Keyboard;
	}();

	exports.default = Keyboard;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Util tools
	exports.default = {
	    convertToArray: function convertToArray(obj) {
	        return Array.prototype.slice.apply(obj);
	    },
	    genRandStr: function genRandStr(len) {
	        len = len || 8;
	        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
	        var maxPos = $chars.length;
	        var str = '';
	        for (var i = 0; i < len; i++) {
	            str += $chars.charAt(Math.floor(Math.random() * maxPos));
	        }
	        return str;
	    },
	    objectAssign: function objectAssign(destObj, originObj) {
	        if (Object.assign) Object.assign(destObj, originObj);else {
	            for (var k in originObj) {
	                destObj[k] = originObj[k];
	            }
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tpl = '<section class="miss-container">\n    <span>MISS</span>\n    <span class="indicator">(</span>\n    <span class="indicator counter">0</span>\n    <span class="indicator">/6 )</span>\n    <span>:</span>\n    <span class="miss-display"></span>\n</section>';

	var Display = function () {
	    function Display(container) {
	        _classCallCheck(this, Display);

	        // dom cache
	        this.missCont = null;
	        this.counter = null;

	        this.missCount = 0;
	        this.container = container;
	        container.innerHTML += tpl;
	    }

	    _createClass(Display, [{
	        key: 'miss',
	        value: function miss(letter) {
	            if (!this.missCont) this.missCont = document.querySelector('.miss-display');
	            this.missCont.innerHTML += letter;
	            this.missCount++;
	            if (!this.counter) this.counter = document.querySelector('.counter');
	            this.counter.innerHTML = this.missCount;
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            if (this.missCont) {
	                this.missCont.innerHTML = '';
	                this.missCount = 0;
	                this.counter.innerHTML = this.missCount;
	            }
	        }
	    }]);

	    return Display;
	}();

	exports.default = Display;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tpl = '<section class="word-container"></section>';

	var Display = function () {
	    function Display(container) {
	        _classCallCheck(this, Display);

	        this.container = container;
	        this.children = [];
	        container.innerHTML += tpl;
	    }

	    _createClass(Display, [{
	        key: 'setLength',
	        value: function setLength(len) {
	            var wordCont = document.querySelector('.word-container');
	            while (len-- > 0) {
	                wordCont.innerHTML += '<span class="letter-node"></span>';
	            }
	        }
	    }, {
	        key: 'setLetter',
	        value: function setLetter(letter, idx) {
	            if (this.children.length === 0) {
	                var childNodes = document.querySelector('.word-container').childNodes;
	                for (var i = 0; i < childNodes.length; i++) {
	                    if (childNodes[i].nodeType == 1) this.children.push(childNodes[i]);
	                }
	            }
	            this.children[idx].innerHTML = letter;
	        }
	    }, {
	        key: 'restart',
	        value: function restart() {
	            document.querySelector('.word-container').innerHTML = '';
	            this.children = [];
	        }
	    }]);

	    return Display;
	}();

	exports.default = Display;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Game Win or Lose component

	var tpl = '\n    <section class="status-wrap">\n        <section class="status"></section>\n        <button class="restart">RESTART</button>\n        <button class="try-again">TRY AGAIN</button>\n    </section>';

	var GameStatus = function () {
	    function GameStatus(container) {
	        _classCallCheck(this, GameStatus);

	        this.container = container;
	        container.innerHTML += tpl;
	        this.statusNode = document.querySelector('.status');
	        this.statusWrap = document.querySelector('.status-wrap');
	        this.restartBtn = document.querySelector('.restart');
	        this.tryAgainBtn = document.querySelector('.try-again');
	    }

	    _createClass(GameStatus, [{
	        key: 'win',
	        value: function win() {
	            var _this = this;

	            this.statusWrap.style.display = "block";
	            this.statusWrap.style.background = "red";
	            setTimeout(function () {
	                _this.statusWrap.style.opacity = 1;
	            }, 300);
	            this.statusNode.innerHTML = "Congrats, You WIN!";
	        }
	    }, {
	        key: 'lose',
	        value: function lose() {
	            var _this2 = this;

	            this.statusWrap.style.display = "block";
	            this.statusWrap.style.background = "green";
	            setTimeout(function () {
	                _this2.statusWrap.style.opacity = 1;
	            }, 300);
	            this.statusNode.innerHTML = "Regrets, You LOSE!";
	        }
	    }, {
	        key: 'restart',
	        value: function restart(controller) {
	            var _this3 = this;

	            this.statusWrap.style.opacity = 0;
	            setTimeout(function () {
	                _this3.statusWrap.style.display = "none";
	            }, 500);
	        }
	    }, {
	        key: 'addListener',
	        value: function addListener(restartFunc, tryAginFunc) {
	            this.restartBtn.addEventListener('click', restartFunc);
	            this.tryAgainBtn.addEventListener('click', tryAginFunc);
	        }
	    }]);

	    return GameStatus;
	}();

	exports.default = GameStatus;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(8);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Game Logic implemantation
	// seprated from DOM manipulation
	// convenient to Unit Test

	var Controller = function () {
	    function Controller(params) {
	        _classCallCheck(this, Controller);

	        // copy params to this context.
	        // { keyboard, wordDisp, missDisp, gameStatus, man }
	        _Utils2.default.objectAssign(this, params);
	        this.word = '';
	        this.right = [];
	        this.miss = [];

	        if (!this.keyboard || !this.wordDisp || !this.missDisp || !this.gameStatus || !this.man) {
	            throw new Error('Not enough params to initiate controller');
	        }
	    }

	    _createClass(Controller, [{
	        key: 'gameStart',
	        value: function gameStart(word) {
	            // process word to uppercase
	            // and assign to this.word
	            if (word) this.setWord(word);
	        }
	    }, {
	        key: 'setWord',
	        value: function setWord(word) {
	            this.word = word.trim().toUpperCase();
	            // only upper case letter
	            if (/^[A-Z]*$/.test(this.word)) {
	                this.wordDisp.setLength(word.length);
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'gameRestart',
	        value: function gameRestart() {
	            this._newGame(true);
	        }
	    }, {
	        key: 'gameReload',
	        value: function gameReload() {
	            this._newGame(false, this.word);
	        }
	    }, {
	        key: 'processLogic',
	        value: function processLogic(letter) {
	            var _this = this;

	            // ever selected
	            if (this.right.indexOf(letter) >= 0 || this.miss.indexOf(letter) >= 0) return;

	            var ret = this._appearIndex(letter);

	            // guess wrong
	            if (ret.length === 0) {
	                this.miss.push(letter);
	                this.missDisp.miss(letter);
	                this.man.draw();
	                if (this.miss.length >= 6) this._gameLose();
	            }
	            // guess right
	            else {
	                    ret.forEach(function (o) {
	                        _this.wordDisp.setLetter(o.letter, o.index);
	                        _this.right[o.index] = o.letter;
	                    });
	                    if (this.right.join('') === this.word) this._gameWin();
	                }
	        }
	    }, {
	        key: '_newGame',
	        value: function _newGame(isRestart, word) {
	            // invoke the restart func of each component.
	            for (var n in this) {
	                var func = this[n];
	                if (typeof func.restart === 'function') {
	                    func.restart();
	                }
	            }
	            if (!isRestart) this.setWord(word);
	            this.right = [];
	            this.miss = [];
	            console.log('game restarted');
	        }
	    }, {
	        key: '_gameLose',
	        value: function _gameLose() {
	            this.gameStatus.lose();
	        }
	    }, {
	        key: '_gameWin',
	        value: function _gameWin() {
	            console.log('game win');
	            this.gameStatus.win();
	        }
	    }, {
	        key: '_appearIndex',
	        value: function _appearIndex(letter) {
	            var retval = [];
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
	    }]);

	    return Controller;
	}();

	exports.default = Controller;

/***/ }
/******/ ]);