/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./components/FormInput.js":
/*!*********************************!*\
  !*** ./components/FormInput.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n    <style>\n      input{\n        width: 100%;\n      }\n    </style>\n    <input type=\"text\">\n";

var FormInput =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(FormInput, _HTMLElement);

  function FormInput() {
    var _this;

    _classCallCheck(this, FormInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormInput).call(this));
    _this._shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    _this._shadowRoot.appendChild(template.content.cloneNode(true));

    _this.$input = _this.shadowRoot.querySelector('input');
    return _this;
  }

  _createClass(FormInput, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      this.$input.setAttribute(name, newValue);
    }
  }, {
    key: "value",
    get: function get() {
      return this.$input.value;
    },
    set: function set(val) {
      this.$input.value = val;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['name', 'value', 'placeholder', 'disabled'];
    }
  }]);

  return FormInput;
}(_wrapNativeSuper(HTMLElement));

customElements.define('form-input', FormInput);

/***/ }),

/***/ "./components/MessageField.js":
/*!************************************!*\
  !*** ./components/MessageField.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_message_field_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/message_field.css */ "./components/style/message_field.css");
/* harmony import */ var _style_message_field_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_message_field_css__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var template = document.createElement('template');
template.innerHTML = "\n    <style>".concat(_style_message_field_css__WEBPACK_IMPORTED_MODULE_0___default.a.toString(), "</style>\n  \n    <div class=\"message\">\n        <span class=\"message-content\"></span>\n        <div class=\"message-meta\">\n            <span class=\"meta-time\"></span>\n            <div class=\"meta-status\"></div>\n        </div>\n    </div>\n");

var MessageField =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(MessageField, _HTMLElement);

  function MessageField() {
    var _this;

    _classCallCheck(this, MessageField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageField).call(this));
    _this._shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    _this._shadowRoot.appendChild(template.content.cloneNode(true));

    _this.$message = _this._shadowRoot.querySelector('.message');
    _this.$messageText = _this._shadowRoot.querySelector('.message-content');
    _this.$messageTime = _this._shadowRoot.querySelector('.meta-time');
    _this.$readStatus = _this._shadowRoot.querySelector('.meta-status');
    return _this;
  }

  _createClass(MessageField, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'text':
          this.$messageText.innerText = newValue;
          break;

        case 'time':
          this.$messageTime.innerText = newValue;
          break;

        case 'author':
          if (newValue === 'true') {
            this.$message.classList.add('author');
          }

          break;

        case 'readen':
          if (newValue === 'true') {
            this.$message.classList.add('readen');
          }

          break;

        default:
          console.log("unknown attribute ".concat(name));
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['text', 'time', 'author', 'readen'];
    }
  }]);

  return MessageField;
}(_wrapNativeSuper(HTMLElement));

customElements.define('msg-field', MessageField);

/***/ }),

/***/ "./components/MessageForm.js":
/*!***********************************!*\
  !*** ./components/MessageForm.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_shadow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/shadow.css */ "./components/style/shadow.css");
/* harmony import */ var _style_shadow_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_shadow_css__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var template = document.createElement('template');
template.innerHTML = "\n    <style>".concat(_style_shadow_css__WEBPACK_IMPORTED_MODULE_0___default.a.toString(), "</style>\n    \n    <form>\n        <div class=\"page\">\n            <div class=\"header\">head</div>\n            \n            <div class=\"content\">\n                <div class=\"message-box\"></div>\n            </div>\n\n            <div class=\"footer\">\n                <div class=\"message-input\">\n                    <form-input name=\"message-text\" placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\"></form-input>\n                    <div class=\"btn-send\"></div>\n                </div>\n            </div>\n        </div>\n    </form>\n");

var MessageForm =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(MessageForm, _HTMLElement);

  function MessageForm() {
    var _this;

    _classCallCheck(this, MessageForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageForm).call(this));
    _this._shadowRoot = _this.attachShadow({
      mode: 'open'
    });

    _this._shadowRoot.appendChild(template.content.cloneNode(true));

    _this.$form = _this._shadowRoot.querySelector('form');
    _this.$input = _this._shadowRoot.querySelector('form-input');
    _this.$message = _this._shadowRoot.querySelector('.message-box');
    _this.$buttonSend = _this.shadowRoot.querySelector('.btn-send');

    _this.$buttonSend.addEventListener('click', _this.onSubmit.bind(_assertThisInitialized(_this)));

    _this.$form.addEventListener('submit', _this.onSubmit.bind(_assertThisInitialized(_this)));

    _this.$form.addEventListener('keypress', _this.onKeyPress.bind(_assertThisInitialized(_this)));

    _this.KEY = 'me'; // Чтение сообщение из local storage

    _this.messageArchive = {}; // string --> array of object

    _this.messageArchive[_this.KEY] = [];
    var jsonData = localStorage.getItem('archive');

    if (jsonData !== null) {
      try {
        _this.messageArchive = JSON.parse(jsonData);
      } catch (_unused) {
        console.log('somthing was wrong');
      }
    }

    var curMsgArchive = _this.messageArchive[_this.KEY];

    for (var i = 0; i < curMsgArchive.length; i += 1) {
      var curMessage = curMsgArchive[i];
      var msg = document.createElement('msg-field');
      msg.setAttribute('text', curMessage.text);
      msg.setAttribute('time', curMessage.time);
      msg.setAttribute('author', 'true');
      msg.setAttribute('readen', 'true');

      _this.$message.appendChild(msg);
    }

    return _this;
  }

  _createClass(MessageForm, [{
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault(); // Не отправляем пустые сообщения

      if (this.$input.value === '') {
        return;
      }

      var msgData = {};
      msgData.text = this.$input.value;
      msgData.isAuthor = true;
      var now = new Date();
      msgData.time = "".concat(now.getHours().toString(), ":").concat(now.getMinutes().toString().padStart(2, '0'));
      var curMsgArchive = this.messageArchive[this.KEY];
      curMsgArchive.push(msgData);
      this.messageArchive[this.KEY] = curMsgArchive;
      console.log(JSON.stringify(curMsgArchive));
      console.log(JSON.stringify(this.messageArchive));
      localStorage.setItem('archive', JSON.stringify(this.messageArchive));
      var msg = document.createElement('msg-field');
      msg.setAttribute('text', msgData.text);
      msg.setAttribute('time', msgData.time);
      msg.setAttribute('author', 'true');
      msg.setAttribute('readen', 'false');
      this.$message.appendChild(msg); // Очищаем поле ввода

      this.$input.value = '';
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(event) {
      if (event.keyCode === 13) {
        this.$form.dispatchEvent(new Event('submit'));
      }
    }
  }]);

  return MessageForm;
}(_wrapNativeSuper(HTMLElement));

customElements.define('message-form', MessageForm);

/***/ }),

/***/ "./components/style/message_field.css":
/*!********************************************!*\
  !*** ./components/style/message_field.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* Сообщение */\n.message{\n  display: flex;\n  flex-direction: column;\n\n  max-width: 60%;\n\n  margin: 5px 10px 5px 10px;\n  padding: 10px;\n  background-color: #f3e6f5;\n\n  border-radius: 4px;\n  border: 1px solid #e7dce9;\n  box-shadow: 0 0 5px #c2bcc37e;\n}\n\n.message > p{\n  font-size: 20px;\n}\n\n.author{\n  align-self: flex-end;\n  background-color: #fff;\n}\n\n/* Текст сообщения */\n.message-content{\n  /* Пренос слов */\n  overflow-wrap: break-word;\n\n  display: block;\n}\n\n/* Блок с временем и галочкой */\n.message-meta{\n  display: flex;\n  justify-content: flex-end;\n  align-items: baseline;\n}\n\n/* Время сообщения */\n.meta-time{\n  display: inline;\n  font-size: 14px;\n\n  color: #918791;\n}\n\n/* Галочка у сообщения */\n.meta-status{\n  display: none;\n\n  margin-left: 5px;\n  width: 10px;\n  height: 10px;\n}\n\n.author > .message-meta > .meta-status{\n  display: inline-block;\n\n  background: url(\"./img/check.png\") 100% 100% no-repeat;\n  background-size: cover; /* Масштабируем фон */\n}\n\n.readen > .message-meta > .meta-status{\n  background: url(\"./img/double_check.png\") 100% 100% no-repeat;\n  background-size: cover; /* Масштабируем фон */\n}\n", ""]);


/***/ }),

/***/ "./components/style/shadow.css":
/*!*************************************!*\
  !*** ./components/style/shadow.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto&display=swap&subset=cyrillic);", ""]);
// Module
exports.push([module.i, "body{\n        margin: 0px;\n        font-family: 'Roboto', sans-serif;\n    }\n\n    .page{\n        display: flex;\n        flex-direction: column;\n        background-color: darkgreen;\n\n        width: 100vw;\n        height: 100vh;\n    }\n\n    .header{\n        display: flex;\n        flex-grow: 0;\n        height: 80px;\n        background-color: #8d24aa;\n    }\n\n    .content{\n        display: flex;\n        flex-grow: 1;\n        overflow-y: scroll;\n        flex-direction: column-reverse;\n        height: 100vh;\n        background-color: #f8f8f8;\n    }\n\n    .content::-webkit-scrollbar{\n        display: none;\n    }\n\n    .message-box{\n        display: flex;\n        flex-direction: column;\n\n        padding-bottom: 5px;\n        justify-content: flex-end;\n        align-items: flex-start;\n        width: 100%;\n    }\n    .footer{\n        display: flex;\n        flex-grow: 0;\n        height: 50px;\n\n        background-color: coral;\n    }\n\n    .message-input{\n        display: flex;\n        flex-direction: row;\n        align-items: stretch;\n\n        width: 100%;\n\n      flex-wrap:nowrap\n    }\n\n    .message-input > form-input{\n      display: flex;\n      flex-grow: 8;\n\n      flex-direction: row;\n      align-items: stretch;\n    }\n\n    .btn-send{\n      background: url(\"./img/send_btn.png\") 100% 100% no-repeat;\n      background-position: center;\n      background-size: contain; /* Масштабируем фон */\n      flex-grow: 1;\n\n      min-width: 40px;\n    }\n\n    .btn-send:active {\n      background-color: #8c24aa;\n      transition: 0.3s;\n    }\n", ""]);


/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/FormInput */ "./components/FormInput.js");
/* harmony import */ var _components_FormInput__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_FormInput__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_MessageField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/MessageField */ "./components/MessageField.js");
/* harmony import */ var _components_MessageForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/MessageForm */ "./components/MessageForm.js");





/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map