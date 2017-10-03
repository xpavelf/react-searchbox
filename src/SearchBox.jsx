import React from "react"
import SuggestionList from "./SuggestionList"
import PropTypes from 'prop-types'

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
    autoFocus: PropTypes.bool
  }

  static defaultProps = {
    placeholder: "Search...",
    showBackButton: false,
    autoFocus: true,
    onBack: () => {},
    selectedToString: (data) => data
  }

  state = {
    inputValue: "",
    showSuggestionList: false
  }

  componentDidMount(){
    if (this.props.autoFocus) {
      this.input.focus();
    }
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

  onChange = (e) => {
    // workaround - triggers on mobile chrome with same input
    if (e.target.value !== this.state.inputValue) {
      this.setState({
        inputValue: e.target.value,
        showSuggestionList: true
      })

      this.props.onChange(e.target.value)
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
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.onChange}
          placeholder={this.props.placeholder}  />

        <button className="SearchBox__clearButton"
          onClick={this.clearInput}>✕</button>

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
