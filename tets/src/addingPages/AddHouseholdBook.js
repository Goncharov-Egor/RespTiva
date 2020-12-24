import React, {Component, Fragment} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Dropdown, Form} from "react-bootstrap";
import {AddHouseHoldBookPath, GetKozhuunsPath, LoginPath} from "../helpers/Path";
import Select from 'react-select'
import AddHouseHoldBookError from "../errors/AddHouseHoldBookError";

var options = []

export default class AddHouseholdBook extends Component {

    state = {}
    async componentDidMount()  {
        this.setState({
            isApply: false
        })

        let config = {
            method: 'post',
            url: LoginPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = GetKozhuunsPath

        await axios.get(url, config).then(res => {
            console.log(res)
            var opt = []
            res.data.payload.kozhuuns.map((kozhuun) => {
                console.log(kozhuun)
                opt.push({
                    value: kozhuun.name,
                    label: kozhuun.name
                })
            })
            this.setState({
                options: opt
            })
        }).catch(err => {
            console.log(err)
        })

    }

    addButtonPressed = async (e) => {

        const HouseholdBook = {
            kozhuunName: this.state.kozhuunName,
            name: this.name,
            villageName: this.villageName
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
                        <div className="mb-3">
                            <Select
                                placeholder='Кожуун'
                                onChange={e=>this.selectCozuunName(e)}
                                options={this.state.options}
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name = e.target.value} name='name' placeholder='Номер книги' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.villageName = e.target.value} name='villageName' placeholder='Название сумона' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <AddHouseHoldBookError message={this.state.message} isInvalid={this.state.isInvalid}/>

                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить книгу</button>
        </Fragment>)
    }
}