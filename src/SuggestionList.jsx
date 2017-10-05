import React from "react"
import Suggestion from "./Suggestion"
import PropTypes from 'prop-types'

const dropEvt = (evt) => evt.stopPropagation()

export default class SuggestionList extends React.Component {
  static propTypes = {
    suggestions: PropTypes.object,
    suggestionComp: PropTypes.func,
    parseSuggestionsData: PropTypes.func,
    renderEmptySuggestion: PropTypes.func
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
    return this.state.show
      ? <div className="SuggestionListWrapper" onClick={this.hide}>
          <ul className="SuggestionList" onClick={dropEvt}>
            {this.renderSuggestions(this.props.suggestions)}
          </ul>
        </div>
      : null
  }
}
