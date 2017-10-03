import React from "react"
import Suggestion from "./Suggestion"
import PropTypes from 'prop-types'

export default class SuggestionLink extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
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
