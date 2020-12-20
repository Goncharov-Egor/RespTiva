import React, {Component} from "react";
import AddHouseHoldBookError from "./AddHouseHoldBookError";

export default class Prompter extends Component {


    render() {
        if(this.props.isInvalid) {
            return(
                <div class="alert alert-warning" role="alert">
                    {this.props.message}
                </div>
            )
        }
        return(<div></div>)
    }
}

Prompter.defaultProps = {isInvalid: false, message: ""}