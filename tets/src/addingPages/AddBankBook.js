import React, {Component, Fragment} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {AddBankBooksPath, AddResidentPath, LoginPath} from "../helpers/Path";

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
            url: AddBankBooksPath,

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

        url = AddResidentPath

        const resident = {
            bankBookName: this.name,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            residents: [{
                birthDate: this.birthDate,
                gender: this.gender,
                name: this.name1,
                passport: {
                    issueDate: this.issueDate,
                    issuingAuthority: this.issuingAuthority,
                    passportId: this.passportId,
                    passportSeries: this.passportSeries
                },
                relation: null,
                residenceMark: null
            }]
        }

        await axios.post(url, resident, config)
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
                    <h2>Общие данные</h2>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name = e.target.value} name='name' placeholder='Номер лицевого счета' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.address = e.target.value} name='name' placeholder='Адрес хозяйства (название населенного пункта, название улицы, номер дома, квартиры)' className="form-control" aria-describedby="basic-addon1"/>
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

                    <h2>Данные главного по хозяйству</h2>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.birthDate = e.target.value} name='birthDate' placeholder='Дата рождения' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.gender = e.target.value} name='gender' placeholder='Мужчина/Женщина' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name1 = e.target.value} name='name1' placeholder='ФИО' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.issueDate = e.target.value} name='issueDate' placeholder='Дата выдачи паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.issuingAuthority = e.target.value} name='issuingAuthority' placeholder='Кем выдан паспорт' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.passportId = e.target.value} name='passportId' placeholder='Серия паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.passportSeries = e.target.value} name='passportSeries' placeholder='Номер паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>


                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить лицевой счет</button>
        </Fragment>)
    }
}