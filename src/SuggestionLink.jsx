import React from "react"
import Suggestion from "./Suggestion"

export default class SuggestionLink extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired
  }

  select = (e) => {
    e.preventDefault()
    this.props.onSelect(this.props.data)
  }

  render() {
    return (
      <Suggestion>
          <a onClick={this.select} className="Suggestion__link">
            {this.props.children}
          </a>
      </Suggestion>
    )
  }
}
