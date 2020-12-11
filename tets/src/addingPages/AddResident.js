import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import {AddBankBooksPath} from "../helpers/Path";
import axios from "axios";
import {Redirect} from "react-router-dom";

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

        let url = AddBankBooksPath
        const resident = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            residents: [{
                birthDate: this.birthDate,
                gender: this.gender,
                name: this.name,
                relation: this.relation,
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
                            <input onChange={e => this.name = e.target.value} name='name' placeholder='ФИО' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.relation = e.target.value} name='relation' placeholder='Отношение к главе хозяйства (например мать, брат, муж, сын, патронат и тд)' className="form-control" aria-describedby="basic-addon1"/>
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