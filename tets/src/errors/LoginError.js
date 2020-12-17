import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";

export default class LoginError extends  Component {

    render() {
        if(this.props.isInvalid) {
            return(
                <div className="alert alert-danger" role="alert">
                    Неверный логин или пароль
                </div>
            )
        }
        return(<div></div>)
    }
}

LoginError.defaultProps = {isInvalid: false}