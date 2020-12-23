import React, {Component} from "react";

export default class OfThemTypeAnimal extends Component {

    render() {
        if(this.props.isCheckbox)
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"> </span>
                </div>
                <input onChange={e => this.name = e.target.value} name='name' placeholder='Вид' className="form-control" aria-describedby="basic-addon1"/>
            </div>
        )
    }
}