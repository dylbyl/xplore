import React, { Component } from 'react'
import { Link } from "react-router-dom"

class RouteSelect extends Component {
    render() {

        return(
            <>
            <option value={this.props.tagProp.id}>{this.props.tagProp.name}</option>
            </>
        )}
}

export default RouteSelect