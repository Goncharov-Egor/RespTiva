import React, {useState, Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Navbar extends Component {

    state = {};

    componentDidMount() {
        console.log(localStorage.getItem('token'))
        this.setState({
            token: localStorage.getItem('token')
        })
    }

    logoutButtonPressed = e => {
        localStorage.clear()
        this.setState({
            token: null
        })
        //this.props.history.push({pathname:'/'})
    }

    render() {
        if(this.state.token) {
            return (
                <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                    <div className="navbar-brand">
                        Похозяйственный учет
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>
                                Главная
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                Информация
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users/registration">
                                Регистрация
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/HouseholdBooks">
                                Реестр похозяйственных книг
                            </NavLink>
                        </li>
                        <button className="btn btn-primary" onClick={e => this.logoutButtonPressed(e)}>Выйти</button>
                    </ul>
                </nav>
            )
        }
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                <div className="navbar-brand">
                    Похозяйственный учет
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact>
                            Главная
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                            Информация
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Авторизация
                        </NavLink>
                    </li>
                </ul>
            </nav>

        )
    }
}