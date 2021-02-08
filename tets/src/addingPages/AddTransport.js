import React from "react";
import axios from "axios";
import {AddBankBooksPath, AddTransportPath} from "../helpers/Path";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";

export default class AddTransport extends React.Component {

    state = {
        isSuccess: false,
        isFirst: true
    }

    onAddButtonPressed = async (e) => {
        let config = {
            method: 'post',
            url: AddBankBooksPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        const transport = {
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            bankBookName: this.props.match.params.bankBookName,
            name: this.name,
            num: this.num,
            rights: this.rights,
            year: this.year
        }

        await axios.post(AddTransportPath, transport, config).then(response => {
            console.log(response)
            this.setState({
                isSuccess: response.data.success,
                isFirst: false
            })
        })
    }

    render() {

        return(
            <div>
                <h3>Транспорт</h3>
                <div className="input-group mb-3" style={{marginTop:20}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"></span>
                    </div>
                    <input onChange={e => this.name = e.target.value} name='totalArea' placeholder='Вид транспорта' className="form-control" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"></span>
                    </div>
                    <input onChange={e => this.num = e.target.value} name='totalArea' placeholder="Количество" className="form-control" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"></span>
                    </div>
                    <input onChange={e => this.rights = e.target.value} name='totalArea' placeholder='Права' className="form-control" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"></span>
                    </div>
                    <input onChange={e => this.year = e.target.value} name='totalArea' placeholder='Год' className="form-control" aria-describedby="basic-addon1"/>
                </div>
                <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={!this.state.isSuccess}/>

                <button type="submit" className="btn btn-primary" style={{marginTop:20}} onClick={e => this.onAddButtonPressed(e)}>Добавить</button>

            </div>
        )
    }
}