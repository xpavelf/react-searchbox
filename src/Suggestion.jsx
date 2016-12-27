import React from "react"

export default class Suggestion extends React.Component {
  render() {
    return (
      <li className="Suggestion">
        <div className="Suggestion__block">
          {this.props.children}
        </div>
      </li>
    )
  }
}
