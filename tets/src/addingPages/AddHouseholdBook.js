import React, {Component, Fragment} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Form} from "react-bootstrap";
import {AddHouseHoldBookPath, LoginPath} from "../helpers/Path";

export default class AddHouseholdBook extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            isApply: false
        })
    }

    addButtonPressed = async (e) => {

        const HouseholdBook = {
            kozhuunName: this.kozhuunName,
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
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: true
        })
    }

    render() {
        //if(this.state.isApply) {
          //  return (<Redirect to={'/HouseholdBooks'}/>)
        //}
        return(<Fragment>
            <h1>Регистарция</h1>
            <Form>
                <Form.Group>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.kozhuunName = e.target.value} name='kozhuunName' placeholder='Название кожууна' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.name = e.target.value} name='name' placeholder='Название книги' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить книгу</button>
        </Fragment>)
    }
}