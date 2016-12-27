import React from "react"
import Suggestion from "./Suggestion"

export default class SuggestionList extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.array,
    suggestionComp: React.PropTypes.func,
    nullSuggestionElm: React.PropTypes.element,
    emptySuggestionElm: React.PropTypes.element
  }
  static defaultProps = {
    suggestions: null,
    suggestionComp: Suggestion,
    nullSuggestionElm: <Suggestion>Searching ...</Suggestion>,
    emptySuggestionElm: <Suggestion>Sorry, we didn't find any results &#x2639;</Suggestion>
  }
  state = { show: false }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  hide = () => this.setState({ show: false })

  getSuggestions = () => {

    if (this.props.suggestions === null) {
      return this.props.nullSuggestionElm
    }

    if (this.props.suggestions.length === 0) {
      return this.props.emptySuggestionElm
    }

    return this.props.suggestions.map(data => (
      <this.props.suggestionComp
        onSelect={this.props.onSelect}
        data={data} key={data.id} />)
    )
  }

  render() {
    let show = this.state.show ? "SuggestionList--open" : "";
    return (
      <div>
        <ul className={"SuggestionList " + show}>
          {this.getSuggestions()}
        </ul>
        {this.state.show ? <div onClick={this.hide} className="SuggestionList__backdrop" /> : ""}
      </div>
    )
  }
}
