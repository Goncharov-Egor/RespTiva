import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import {AddBankBooksPath, AddResidentPath} from "../helpers/Path";
import axios from "axios";
import {Redirect} from "react-router-dom";
import moment from "moment";
import Select from "react-select";

const genderOptions = [{ value: "Мужчина", label: "Мужчина" }, { value: "Женщина", label: "Женщина" }]
const relationOptions = [{ value: "Сын", label: "Сын" }, { value: "Дочь", label: "Дочь" }
    , { value: "Брат", label: "Брат" }, { value: "Сестра", label: "Сестра" }, { value: "Муж", label: "Муж" }
    , { value: "Жена", label: "Жена" } , { value: "Мать", label: "Мать" }, { value: "Отец", label: "Отец" }, { value: "Патронат", label: "Патронат" }]

export default class AddResident extends Component {

    componentDidMount() {

    }

    addButtonPressed = async () => {
        let config = {
            method: 'post',
            url: AddBankBooksPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let getBDate = new Date(this.birthDate)
        let BDate = moment(getBDate).format('DD.MM.YYYY')

        let url = AddResidentPath
        const resident = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            residents: [{
                birthDate: BDate,
                gender: this.state.gender,
                name: this.name,
                relation: this.state.relation,
                residenceMark: this.residenceMark
            }]
        }
        console.log(resident)
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

    componentWillMount() {
        this.setState({
            isApply: false
        })
    }

    selectGender = (e) => {
        this.setState({
            gender: e.value
        })
    }

    selectRealtion = (e) => {
        this.setState({
            relation: e.value
        })
    }

    render() {
        if(this.state.isApply) {
            let path = '/BankBookSpecification/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName
            return(<Redirect to={path}/>)
        }

        return(
            <Fragment>
                <h1>Добавление члена хозяйства</h1>
                <Form>
                    <Form.Group>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Дата рождения</span>
                            </div>
                            <input type="date" onChange={e => this.birthDate = e.target.value} name='birthDate' placeholder='Дата рождения' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="mb-3">
                            <Select placeholder="Пол"
                                    onChange={e=>this.selectGender(e)}
                                    options={genderOptions}

                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.name = e.target.value} name='name' placeholder='ФИО' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="mb-3">
                            <Select placeholder="Отношение к главе хозяйства"
                                    onChange={e=>this.selectGender(e)}
                                    options={relationOptions}

                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.residenceMark = e.target.value} name='residenceMark' placeholder='Пометка о временном либо сезонном проживании (оставить пустым, если нет)' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                    </Form.Group>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить члена хозяйства</button>
            </Fragment>
        )
    }
}