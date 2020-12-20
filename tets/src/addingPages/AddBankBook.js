import React, {Component, Fragment} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {AddBankBooksPath, AddResidentPath, LoginPath} from "../helpers/Path";
import Select from "react-select";
import moment from 'moment'
import AddHouseHoldBookError from "../errors/AddHouseHoldBookError";
import Prompter from "../errors/Prompter";


const options = [{ value: "Мужчина", label: "Мужчина" }, { value: "Женщина", label: "Женщина" }]

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export default class AddBankBook extends Component {

    state = {}

    addButtonPressed = async (e) => {

        let isAllInputExist = this.additionalInfo !== "" && this.address !== "" && this.inn !== "" && this.name !== ""
        && this.birthDate !== ""
        && this.name1 !== ""
        && this.state.gender !== ""
        && this.issueDate !== ""
        && this.issuingAuthority !== ""
        && this.passportId !== ""
        && this.passportSeries !== ""
        if(!isAllInputExist) {
            this.setState({
                isAllFieldsFilled: isAllInputExist
            })
            return
        }

        const BankBook = {
            additionalInfo: this.additionalInfo,
            address: this.address,
            cadastralNumber: "12312444444444444",
            householdBookName: this.props.match.params.householdBookName,
            inn: this.inn,
            kozhuunName: this.props.match.params.kozhuunName,
            name: this.name
        }

        let isVal = (isNumeric(this.inn) && (this.inn.length === 12))

        this.setState({
            isInnValid: isVal
        })
        console.log("aaaaaaaaa", isNumeric(this.inn), (this.inn.length === 12), isVal)
        if(!isVal)
            return



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
                this.setState({
                    isValid: (this.state.isValid && res.data.success)
                })
            })
            .catch(err => {
                console.log(err)
            })

        url = AddResidentPath

        var getBDate = new Date(this.birthDate)
        console.log(moment(getBDate).format('DD.MM.YYYY'))
        var Bdate = moment(getBDate).format('DD.MM.YYYY')
        var getIsDate = new Date(this.issueDate)
        var IsDate = moment(getIsDate).format('DD.MM.YYYY')

        const resident = {
            bankBookName: this.name,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            residents: [{
                birthDate: Bdate,
                gender: this.state.gender,
                name: this.name1,
                passport: {
                    issueDate: IsDate,
                    issuingAuthority: this.issuingAuthority,
                    passportId: this.passportId,
                    passportSeries: this.passportSeries
                },
                relation: null,
                residenceMark: null
            }]
        }

        console.log(isNumeric(this.passportId), (this.passportId.length === 4))

        let isPI = (isNumeric(this.passportId) && (this.passportId.length === 4))
        let isPS = (isNumeric(this.passportSeries) && (this.passportSeries.length === 6))

        this.setState({
            isPassportIdValid: (isNumeric(this.passportId) && (this.passportId.length === 4)),
            isPassportSeriesValid: (isNumeric(this.passportSeries) && (this.passportSeries.length === 6))

        })

        if(!(isPI && isPS))
            return

        if(this.state.isPassportIdValid && this.state.isPassportSeriesValid) {
            await axios.post(url, resident, config)
                .then(res => {
                    console.log(res)
                    this.setState({
                        isValid: (res.data.success && this.state.isPassportSeriesValid && this.state.isPassportIdValid),
                        isApply: (res.data.success && this.state.isPassportSeriesValid && this.state.isPassportIdValid)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            if (this.state.isValid) {
                this.setState({
                    isApply: true
                })
            }
        }
    }

    selectGender = (e) => {
        this.setState({
            gender: e.value
        })
    }

    componentDidMount() {
        this.setState({
            isValid: true,
            isPassportIdValid: true,
            isPassportSeriesValid: true,
            isInnValid: true,
            isAllFieldsFilled: true
        })
        this.additionalInfo = ""
        this.address = ""
        this.inn = ""
        this.name = ""
        this.birthDate = ""
        this.name1 = ""
        this.setState({
            gender:""
        })
        this.issueDate = ""
        this.issuingAuthority = ""
        this.passportId = ""
        this.passportSeries = ""
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

                    <Prompter isInvalid={!this.state.isInnValid} message="Неверно набран ИНН. Должно быть 12 цифор"/>

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
                        <input onChange={e => this.additionalInfo = e.target.value} name='additionalInfo' placeholder='Дополнительная информация' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <h2>Данные главного по хозяйству</h2>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input type="date" onChange={e => this.birthDate = e.target.value} name='birthDate' placeholder='Дата рождения' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="mb-3">
                        <Select placeholder="Пол"
                            onChange={e=>this.selectGender(e)}
                            options={options}

                        />
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
                        <input type="date" onChange={e => this.issueDate = e.target.value} name='issueDate' placeholder='Дата выдачи паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.issuingAuthority = e.target.value} name='issuingAuthority' placeholder='Кем выдан паспорт' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <Prompter isInvalid={!this.state.isPassportIdValid} message="Неверно набран номер паспорта. Должно быть 4 цифры"/>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>

                        <input onChange={e => this.passportId = e.target.value} name='passportId' placeholder='Серия паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <Prompter isInvalid={!this.state.isPassportSeriesValid} message="Неверно набрана серия паспорта. Должно быть 6 цифор"/>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.passportSeries = e.target.value} name='passportSeries' placeholder='Номер паспорта' className="form-control" aria-describedby="basic-addon1"/>
                    </div>


                </Form.Group>
            </Form>
            <AddHouseHoldBookError isInvalid={!this.state.isValid} message={"Неверные данные"}/>
            <Prompter isInvalid={!this.state.isAllFieldsFilled} message="Все поля должны быть заполнены"/>

            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить лицевой счет</button>
        </Fragment>)
    }
}