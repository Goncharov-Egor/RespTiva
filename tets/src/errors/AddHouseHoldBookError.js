import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";

export default class AddHouseHoldBookError extends  Component {

    render() {
        if(this.props.isInvalid) {
            return(
                <div className="alert alert-danger" role="alert">
                    {this.props.message}
                </div>
            )
        }
        return(<div></div>)
    }
}

AddHouseHoldBookError.defaultProps = {isInvalid: false, message: ""}