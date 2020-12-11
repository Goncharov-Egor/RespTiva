import React, {Component, Fragment} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {AddBankBooksPath, LoginPath} from "../helpers/Path";

export default class AddBankBook extends Component {

    state = {}

    addButtonPressed = async (e) => {

        const BankBook = {
            additionalInfo: this.additionalInfo,
            address: this.address,
            cadastralNumber: this.cadastralNumber,
            householdBookName: this.props.match.params.householdBookName,
            inn: this.inn,
            kozhuunName: this.props.match.params.kozhuunName,
            name: this.name
        }

        console.log(BankBook)

        let config = {
            method: 'post',
            url: LoginPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = AddBankBooksPath

        await axios.post(url, BankBook, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: true
        })

    }

    render() {
        if(this.state.isApply) {
            let path = '/BankBook/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName
            return(<Redirect to={path}/>)
        }
        return(
            <Fragment>
            <Form>
                <Form.Group>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name = e.target.value} name='name' placeholder='ФИО главного члена хозяйства' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.address = e.target.value} name='name' placeholder='Адрес' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.inn = e.target.value} name='inn' placeholder='ИНН' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.cadastralNumber = e.target.value} name='cadastralNumber' placeholder='Кадастровый номер участка' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.additionalInfo = e.target.value} name='additionalInfo' placeholder='Дополнительная информация' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить лицевой счет</button>
        </Fragment>)
    }
}