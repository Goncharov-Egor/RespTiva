import React, {Fragment, useState, Component} from 'react';
import {Form} from "react-bootstrap";
import axios from "axios";
import {LoginPath} from "../helpers/Path";
import {Redirect} from 'react-router-dom'


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
            })
            .catch(err => {
                console.log(err)
            })

    }

    setToken = token => {
        this.setState({
            loggedIn: true,
            token: token
        })
    }

    render() {
        if(this.state.loggedIn) {
            return (<Redirect to={'/'}/>)
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
                    </Form.Group>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.registrationButtonPressed(e)}>Войти</button>
            </Fragment>
        )
    }
}