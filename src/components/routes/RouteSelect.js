import React, { Component } from 'react'

class RouteSelect extends Component {
    render() {

        return(
            <>
            <option value={this.props.selectProp.id}>{this.props.selectProp.name}</option>
            </>
        )}
}

export default RouteSelect