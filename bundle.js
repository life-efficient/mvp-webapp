(function (factory) {
typeof define === 'function' && define.amd ? define(factory) :
factory();
}(function () { 'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var styled = _interopDefault(require('@emotion/styled'));
var core = require('@emotion/core');

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  background: #5cdb95;\n  color: #05385b;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border: none;\n  border-radius: 5px;\n  padding: 10px 20px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  text-transform: uppercase;\n  font-size: 1.5em;\n  font-weight: bold;\n  letter-spacing: 4px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var font = core.css(_templateObject());
var shape = core.css(_templateObject2());
var primaryColors = core.css(_templateObject3());

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}

var Wrapper = styled.button(_templateObject$1(), font, primaryColors, shape);

var Button = function Button(props) {
  return React.createElement(Wrapper, null, "App name:");
};
 // = connect(mapStateToProps)(Button)

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    width: 10px;\n    height: 10px;\n    border-radius: 5px;\n    transform: translateX(5px) translateY(-5px);\n    background-color: green;\n    ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n    height: 10px;\n    width: 10px;\n    background-color: green;\n    ", "\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n    width: 20px;\n    height: 20px;\n    background-color: black;\n    border-radius: 100vw;\n    -webkit-animation:spin 2s linear infinite;\n    -moz-animation:spin 2s linear infinite;\n    animation:spin 2s linear infinite;\n    margin: auto;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n    ", "\n    border-radius: 30px;\n    padding: 5px;\n    --dim: 30px;\n    width: var(--dim);\n    height: var(--dim);\n    margin-top: 10px;\n    margin: auto;\n    display: flex;\n    justify-content: center;\n    background-color: ", ";\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var container = core.css(_templateObject$2(), primaryColors, window.theme ? window.theme.primary : null);
var loading = core.css(_templateObject2$1());
var segment = core.css(_templateObject3$1(), primaryColors);
var inner = core.css(_templateObject4(), primaryColors);

var Loading = function Loading(props) {
  return (// <Wrapper>
    core.jsx("div", {
      css: container
    }, core.jsx("div", {
      css: loading
    }, core.jsx("div", {
      css: segment
    }), core.jsx("div", {
      css: inner
    })))
  );
};
// import { font, primaryColors, shape } from "config/styles";
// // export default Loading
// export default function Loading() {
//   return <Wrapper onClick={onClick}>{text}
//   yoo there
//   </Wrapper>;
// }

exports.Button = Button;
exports.Loading = Loading;

}));
