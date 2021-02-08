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
                        <form className="form-inline my-2 my-lg-0" style={{position: "absolute", top: 10, right: 10,}}>
                            <input className="form-control mr-sm-2" type="search"
                                   aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
                        </form>
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
                <form className="form-inline my-2 my-lg-0" style={{position: "absolute", top: 10, right: 10,}}>
                    <input className="form-control mr-sm-2" type="search"  aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
                </form>
            </nav>

        )
    }
}