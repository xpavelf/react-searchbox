"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SuggestionList = require("./SuggestionList");

var _SuggestionList2 = _interopRequireDefault(_SuggestionList);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      inputValue: "",
      showSuggestionList: false
    }, _this.clearInput = function () {
      _this.setState({
        inputValue: "",
        showSuggestionList: false
      });
      _this.props.onChange(null);
    }, _this.onSelect = function (data) {
      _this.setState({
        inputValue: _this.props.selectedToString(data),
        showSuggestionList: false
      });
      _this.props.onSelect(data);
    }, _this.onChange = function (e) {
      // workaround - triggers on mobile chrome with same input
      if (e.target.value !== _this.state.inputValue) {
        _this.setState({
          inputValue: e.target.value,
          showSuggestionList: true
        });

        _this.props.onChange(e.target.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.input.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "SearchBox" },
        this.props.showBackButton && _react2.default.createElement(
          "button",
          { className: "SearchBox__backButton",
            onClick: this.props.onBack },
          "\u2190"
        ),
        _react2.default.createElement("input", { value: this.state.inputValue,
          ref: function ref(input) {
            _this2.input = input;
          },
          className: "SearchBox__input",
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
          onChange: this.onChange,
          placeholder: this.props.placeholder }),
        _react2.default.createElement(
          "button",
          { className: "SearchBox__clearButton",
            onClick: this.clearInput },
          "\u2715"
        ),
        _react2.default.createElement(_SuggestionList2.default, {
          show: this.state.showSuggestionList,
          onSelect: this.onSelect,
          suggestions: this.props.suggestions,
          suggestionComp: this.props.suggestionComp,
          parseSuggestionsData: this.props.parseSuggestionsData,
          renderEmptySuggestion: this.props.renderEmptySuggestion })
      );
    }
  }]);

  return SearchBox;
}(_react2.default.Component);

SearchBox.propTypes = {
  onChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onBack: _propTypes2.default.func,
  selectedToString: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  suggestions: _propTypes2.default.object,
  parseSuggestionsData: _propTypes2.default.func,
  renderEmptySuggestion: _propTypes2.default.func,
  suggestionComp: _propTypes2.default.func,
  showBackButton: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool
};
SearchBox.defaultProps = {
  placeholder: "Search...",
  showBackButton: false,
  autoFocus: true,
  onBack: function onBack() {},
  selectedToString: function selectedToString(data) {
    return data;
  }
};
exports.default = SearchBox;