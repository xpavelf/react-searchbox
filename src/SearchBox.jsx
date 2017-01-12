import React from "react"
import SuggestionList from "./SuggestionList"

export default class SearchBox extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onBack: React.PropTypes.func,
    selectedToString: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    suggestionComp: React.PropTypes.func,
    nullSuggestionElm: React.PropTypes.element,
    emptySuggestionElm: React.PropTypes.element,
    showBackButton: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool
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
          onChange={this.onChange}
          placeholder={this.props.placeholder}  />

        <button className="SearchBox__clearButton"
          onClick={this.clearInput}>x</button>

        <SuggestionList
          show={this.state.showSuggestionList}
          onSelect={this.onSelect}
          suggestions={this.props.suggestions}
          suggestionComp={this.props.suggestionComp}
          nullSuggestionElm={this.props.nullSuggestionElm}
          emptySuggestionElm={this.props.emptySuggestionElm} />
      </div>
    )
  }
}
