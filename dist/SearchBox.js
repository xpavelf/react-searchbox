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

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

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
      showPrevSearch: false,
      prevSearch: "",
      showSuggestionList: false
    }, _this.savePrevSearch = (0, _debounce2.default)(function (str) {
      var term = str.trim();
      if (term) {
        _this.setState({ prevSearch: term });
      }
    }, 1000), _this.usePrevSearch = function () {
      _this.setState({
        inputValue: _this.state.prevSearch,
        showSuggestionList: true
      });
      _this.props.onChange(_this.state.prevSearch);
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
    }, _this.onFocus = function (e) {
      _this.setState({ showPrevSearch: true });
      _this.props.onFocus && _this.props.onFocus(e);
    }, _this.onBlur = function (e) {
      _this.setState({ showPrevSearch: false });
      _this.props.onBlur && _this.props.onBlur(e);
    }, _this.onChange = function (e) {
      var val = e.target.value;
      // workaround - triggers on mobile chrome with same input
      if (val !== _this.state.inputValue) {
        _this.setState({
          inputValue: val,
          showSuggestionList: true
        });
        _this.savePrevSearch(val);
        _this.props.onChange(val);
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
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onChange: this.onChange,
          placeholder: this.props.placeholder }),
        _react2.default.createElement(
          "button",
          { className: "SearchBox__clearButton",
            onClick: this.clearInput },
          "\u2715"
        ),
        this.props.showPrevSearch && !this.state.inputValue && this.state.showPrevSearch && this.state.prevSearch.length ? _react2.default.createElement(
          "div",
          { className: "SuggestionListWrapper" },
          _react2.default.createElement(
            "div",
            { className: "SearchBox__prevSearch" },
            _react2.default.createElement(
              "button",
              { className: "SearchBox__prevSearchTerm", onMouseDown: this.usePrevSearch },
              _react2.default.createElement(
                "svg",
                { height: "16", width: "16", viewBox: "0 0 1000 1000", xmlns: "http://www.w3.org/2000/svg" },
                _react2.default.createElement("path", { fill: "currentColor", d: "M960 832L710.875 582.875C746.438 524.812 768 457.156 768 384 768 171.96900000000005 596 0 384 0 171.969 0 0 171.96900000000005 0 384c0 212 171.969 384 384 384 73.156 0 140.812-21.562 198.875-57L832 960c17.5 17.5 46.5 17.375 64 0l64-64C977.5 878.5 977.5 849.5 960 832zM384 640c-141.375 0-256-114.625-256-256s114.625-256 256-256 256 114.625 256 256S525.375 640 384 640z" })
              ),
              this.state.prevSearch
            )
          )
        ) : null,
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
  showPrevSearch: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool
};
SearchBox.defaultProps = {
  placeholder: "Search...",
  showBackButton: false,
  showPrevSearch: false,
  autoFocus: true,
  onBack: function onBack() {},
  selectedToString: function selectedToString(data) {
    return data;
  }
};
exports.default = SearchBox;