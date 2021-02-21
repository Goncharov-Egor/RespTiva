import React, {Fragment, useState, Component} from 'react';
import {Dropdown, Form} from "react-bootstrap";
import axios from "axios";
import {CancelResizdentPath, GetUsersProfilePath, LoginPath} from "../helpers/Path";
import {Redirect} from 'react-router-dom'
import LoginError from '../errors/LoginError'


export default class Login extends Component {

    state = {}

    registrationButtonPressed = async e => {

        e.preventDefault()

        const user = {
            username: this.username,
            password: this.password
        }

        console.log(user)
        var config = {
            method: 'post',
            url: LoginPath,

            headers: {
                'Content-Type': 'application/json'
            },
            data : user
        };

        const url = LoginPath
        await axios.post(url, user, config)
            .then(res => {
                if(res.data.success) {
                    localStorage.setItem('token', res.data.payload.token)
                    this.setToken(res.data.payload.token)
                    this.props.setToken(res.data.payload.token)
                }
                console.log(res)
                this.setState({
                    isIncorrectValues: !res.data.success
                })
            })
            .catch(err => {
                console.log(err)
            })

        config = {
            method: 'get',
            url: GetUsersProfilePath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };
        await axios.get(GetUsersProfilePath, config).then(resp => {
            if(resp.data.success) {
                localStorage.setItem('role', resp.data.payload.role)
                localStorage.setItem('fio', resp.data.payload.fio)
            }
        })
        window.location.reload()
    }

    componentWillMount() {
        this.setState({
            isIncorrectValues: false
        })
    }


    setToken = token => {
        this.setState({
            loggedIn: true,
            token: token
        })
    }

    render() {
        console.log("Render called")
        if(this.state.loggedIn) {
            return (<Redirect to={'/HouseholdBooks'}/>)
        }
        return (
            <Fragment>
                <h1>Вход</h1>
                <Form>
                    <Form.Group>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.username = e.target.value} name='username' placeholder='Имя пользователя' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.password = e.target.value} name='password' type='password' placeholder='Пароль' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <LoginError isInvalid={this.state.isIncorrectValues}/>
                    </Form.Group>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.registrationButtonPressed(e)}>Войти</button>
            </Fragment>
        )
    }
}