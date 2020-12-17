import React, {Component, Fragment} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Dropdown, Form} from "react-bootstrap";
import {AddHouseHoldBookPath, LoginPath} from "../helpers/Path";
import Select from 'react-select'
import AddHouseHoldBookError from "../errors/AddHouseHoldBookError";

const options = [
    { value: "Бай-Тайгинский", label: "Бай-Тайгинский"},
    { value: "Барун-Хемчикский", label: "Барун-Хемчикский"},
    { value: "Дзун-Хемчикский", label: "Дзун-Хемчикский"},
    { value: "Каа-Хемский", label: "Каа-Хемский"},
    { value: "Кызылский", label: "Кызылский"},
    { value: "Монгун-Тайгинский", label: "Монгун-Тайгинский"},
    { value: "Овюрский", label: "Овюрский"},
    { value: "Пий-Хемский", label: "Пий-Хемский"},
    { value: "Сут-Хольский", label: "Сут-Хольский"},
    { value: "Тандинский", label: "Тандинский"},
    { value: "Тере-Хольский", label: "Тере-Хольский"},
    { value: "Тес-Хемский", label: "Тес-Хемский"},
    { value: "Тоджинский", label: "Тоджинский"},
    { value: "Улуг-Хемский", label: "Улуг-Хемский"},
    { value: "Чаа-Хольский", label: "Чаа-Хольский"},
    { value: "Чеди-Хольский", label: "Чеди-Хольский"},
    { value: "Эрзинский", label: "Эрзинский"},
    { value: "Кылыский", label: "Кылыский"}
]

export default class AddHouseholdBook extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            isApply: false
        })
    }

    addButtonPressed = async (e) => {

        const HouseholdBook = {
            kozhuunName: this.state.kozhuunName,
            name: this.name
        }

        console.log(HouseholdBook)
        let config = {
            method: 'post',
            url: LoginPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = AddHouseHoldBookPath

        await axios.post(url, HouseholdBook, config)
            .then(res => {
                console.log(res)
                this.setState({
                    isInvalid: !res.data.success,
                    message: res.data.message
                })
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: true
        })
        if(!this.state.isInvalid) {
            this.props.history.push({pathname : '/HouseholdBooks'})
        }
    }

    componentWillMount() {
        this.setState({
            isInvalid: false,
            message: ""
        })
    }

    selectCozuunName = (e) => {
        this.setState({
            kozhuunName: e.value
        })
        console.log(e.value)
    }

    render() {
        //if(this.state.isApply) {
          //  return (<Redirect to={'/HouseholdBooks'}/>)
        //}
        return(<Fragment>
            <h1>Добавление похозяйственной книги</h1>
            <Form>
                <Form.Group>
                    <div>
                        <div>
                            <Select
                                onChange={e=>this.selectCozuunName(e)}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name = e.target.value} name='name' placeholder='Номер книги' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <AddHouseHoldBookError message={this.state.message} isInvalid={this.state.isInvalid}/>

                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить книгу</button>
        </Fragment>)
    }
}