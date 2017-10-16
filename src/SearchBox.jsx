import React from "react"
import SuggestionList from "./SuggestionList"
import PropTypes from 'prop-types'
import debounce from "lodash/debounce"

export default class SearchBox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onBack: PropTypes.func,
    selectedToString: PropTypes.func,
    placeholder: PropTypes.string,
    suggestions: PropTypes.object,
    parseSuggestionsData: PropTypes.func,
    renderEmptySuggestion: PropTypes.func,
    suggestionComp: PropTypes.func,
    showBackButton: PropTypes.bool,
    showPrevSearch: PropTypes.bool,
    autoFocus: PropTypes.bool
  }

  static defaultProps = {
    placeholder: "Search...",
    showBackButton: false,
    showPrevSearch: false,
    autoFocus: true,
    onBack: () => {},
    selectedToString: (data) => data
  }

  state = {
    inputValue: "",
    showPrevSearch: false,
    prevSearch: "",
    showSuggestionList: false
  }

  componentDidMount(){
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  savePrevSearch = debounce((str) => {
    let term = str.trim()
    if (term) {
      this.setState({ prevSearch: term })
    }
  }, 1000)

  usePrevSearch= () => {
    this.setState({
      inputValue: this.state.prevSearch,
      showSuggestionList: true
    })
    this.props.onChange(this.state.prevSearch)
  }

  clearInput = () => {
    this.setState({
      inputValue: "",
      showSuggestionList: false
    })
    this.props.onChange(null)
  }

  onSelect = (data) => {
    this.setState({
      inputValue: this.props.selectedToString(data),
      showSuggestionList: false
    })
    this.props.onSelect(data)
  }

  onFocus = (e) => {
    this.setState({ showPrevSearch: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  onBlur = (e) => {
    this.setState({ showPrevSearch: false })
    this.props.onBlur && this.props.onBlur(e)
  }

  onChange = (e) => {
    let val = e.target.value
    // workaround - triggers on mobile chrome with same input
    if (val !== this.state.inputValue) {
      this.setState({
        inputValue: val,
        showSuggestionList: true
      })
      this.savePrevSearch(val)
      this.props.onChange(val)
    }
  }

  render() {
    return (
      <div className="SearchBox">
        { this.props.showBackButton &&
          <button className="SearchBox__backButton"
            onClick={this.props.onBack}>←</button>
        }
        <input value={this.state.inputValue}
          ref={(input) => { this.input = input; }}
          className="SearchBox__input"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={this.props.placeholder}  />

        <button className="SearchBox__clearButton"
          onClick={this.clearInput}>✕</button>

        { this.props.showPrevSearch && !this.state.inputValue && this.state.showPrevSearch && this.state.prevSearch.length
          ? <div className="SuggestionListWrapper">
              <div className="SearchBox__prevSearch">
                <button className="SearchBox__prevSearchTerm" onMouseDown={this.usePrevSearch}>
                  <svg height="16" width="16" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M960 832L710.875 582.875C746.438 524.812 768 457.156 768 384 768 171.96900000000005 596 0 384 0 171.969 0 0 171.96900000000005 0 384c0 212 171.969 384 384 384 73.156 0 140.812-21.562 198.875-57L832 960c17.5 17.5 46.5 17.375 64 0l64-64C977.5 878.5 977.5 849.5 960 832zM384 640c-141.375 0-256-114.625-256-256s114.625-256 256-256 256 114.625 256 256S525.375 640 384 640z" />
                  </svg>
                  {this.state.prevSearch}
                </button>
              </div>
            </div>
          : null
        }

          <SuggestionList
            show={this.state.showSuggestionList}
            onSelect={this.onSelect}
            suggestions={this.props.suggestions}
            suggestionComp={this.props.suggestionComp}
            parseSuggestionsData={this.props.parseSuggestionsData}
            renderEmptySuggestion={this.props.renderEmptySuggestion} />

      </div>
    )
  }
}
