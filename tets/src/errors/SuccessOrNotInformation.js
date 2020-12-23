import React, {Component} from "react";

export default class SuccessOrNotInformation extends Component {

    render() {
        if(this.props.isFirst) {
            return(<div></div>)
        }
        if(this.props.isInvalid) {
            return(
                <div className="alert alert-danger" role="alert">
                    Операция прошла неуспешно
                </div>
            )
        } else {
            return(
                <div className="alert alert-success" role="alert">
                    Успешно!
                </div>
            )
        }
    }
}
SuccessOrNotInformation.defaultProps = {isFirst: true, isInvalid: false}