import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export default class InvalidTokenError extends Component {

    render() {
        if(this.props.isInvalid) {
            localStorage.clear()
            return (<Redirect to={'/login'}/>)
        }
        return(<div/>)
    }
}

InvalidTokenError.defaultProps = {isInvalid: false}