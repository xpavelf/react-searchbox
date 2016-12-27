"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Suggestion = require("./Suggestion");

var _Suggestion2 = _interopRequireDefault(_Suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuggestionLink = function (_React$Component) {
  _inherits(SuggestionLink, _React$Component);

  function SuggestionLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuggestionLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuggestionLink.__proto__ || Object.getPrototypeOf(SuggestionLink)).call.apply(_ref, [this].concat(args))), _this), _this.select = function (e) {
      e.preventDefault();
      _this.props.onSelect(_this.props.data);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuggestionLink, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _Suggestion2.default,
        null,
        _react2.default.createElement(
          "a",
          { onClick: this.select, className: "Suggestion__link" },
          this.props.children
        )
      );
    }
  }]);

  return SuggestionLink;
}(_react2.default.Component);

SuggestionLink.propTypes = {
  data: _react2.default.PropTypes.object.isRequired,
  onSelect: _react2.default.PropTypes.func.isRequired
};
exports.default = SuggestionLink;