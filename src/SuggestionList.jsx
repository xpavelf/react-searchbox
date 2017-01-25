import React from "react"
import Suggestion from "./Suggestion"

export default class SuggestionList extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.object,
    suggestionComp: React.PropTypes.func,
    parseSuggestionsData: React.PropTypes.func,
    renderEmptySuggestion: React.PropTypes.func
  }
  static defaultProps = {
    suggestions: null,
    suggestionComp: Suggestion,
    parseSuggestionsData: (data) => data,
    renderEmptySuggestion: (data) => null
  }
  state = { show: false }

  renderSuggestions = (data) => {
    let sugArr = this.props.parseSuggestionsData(data);

    if (!sugArr || !sugArr.length) {
      return this.props.renderEmptySuggestion(data);
    }

    return sugArr.map(itemData => (
      <this.props.suggestionComp
        onSelect={this.props.onSelect}
        data={itemData} key={itemData.id} />)
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  hide = () => this.setState({ show: false })

  render() {
    let show = this.state.show ? "SuggestionList--open" : "";
    return (
      <div>
        <ul className={"SuggestionList " + show}>
          {this.renderSuggestions(this.props.suggestions)}
        </ul>
        {this.state.show ? <div onClick={this.hide} className="SuggestionList__backdrop" /> : ""}
      </div>
    )
  }
}
