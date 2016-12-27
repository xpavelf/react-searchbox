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

var SuggestionList = function (_React$Component) {
  _inherits(SuggestionList, _React$Component);

  function SuggestionList() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, SuggestionList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuggestionList.__proto__ || Object.getPrototypeOf(SuggestionList)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _this.hide = function () {
      return _this.setState({ show: false });
    }, _this.getSuggestions = function () {

      if (_this.props.suggestions === null) {
        return _this.props.nullSuggestionElm;
      }

      if (_this.props.suggestions.length === 0) {
        return _this.props.emptySuggestionElm;
      }

      return _this.props.suggestions.map(function (data) {
        return _react2.default.createElement(_this2.props.suggestionComp, {
          onSelect: _this.props.onSelect,
          data: data, key: data.id });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuggestionList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ show: nextProps.show });
    }
  }, {
    key: "render",
    value: function render() {
      var show = this.state.show ? "SuggestionList--open" : "";
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "ul",
          { className: "SuggestionList " + show },
          this.getSuggestions()
        ),
        this.state.show ? _react2.default.createElement("div", { onClick: this.hide, className: "SuggestionList__backdrop" }) : ""
      );
    }
  }]);

  return SuggestionList;
}(_react2.default.Component);

SuggestionList.propTypes = {
  suggestions: _react2.default.PropTypes.array,
  suggestionComp: _react2.default.PropTypes.func,
  nullSuggestionElm: _react2.default.PropTypes.element,
  emptySuggestionElm: _react2.default.PropTypes.element
};
SuggestionList.defaultProps = {
  suggestions: null,
  suggestionComp: _Suggestion2.default,
  nullSuggestionElm: _react2.default.createElement(
    _Suggestion2.default,
    null,
    "Searching ..."
  ),
  emptySuggestionElm: _react2.default.createElement(
    _Suggestion2.default,
    null,
    "Sorry, we didn't find any results \u2639"
  )
};
exports.default = SuggestionList;