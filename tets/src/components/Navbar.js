import React, {useState, Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from "axios";
import {GetUsersProfilePath} from "../helpers/Path";

export default class Navbar extends Component {

    state = {
        searchText: ""
    };

    componentDidMount = async () => {
        console.log(localStorage.getItem('token'))

        let config = {
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

        this.setState({
            token: localStorage.getItem('token'),
            role: localStorage.getItem('role'),
            fio: localStorage.getItem('fio')
        })
    }

    logoutButtonPressed = e => {
        localStorage.clear()
        this.setState({
            token: null,
            role: null,
            fio: null
        })
        window.location.reload()
        window.location.href="/login"
        //this.props.history.push({pathname:'/'})
    }

    searchKeyPressed = (e) => {
        //e.preventDefault();
        console.log(e.key)
        console.log(this.state.searchText)

        if(e.key === 'Enter') {
            return
            //window.open("/Search/" + this.state.searchText)
            //this.props.history.push({path: "/Search/" + this.state.searchText})
            //this.onSearchButtonClicked()
        }
    }

    onSearchButtonClicked = (e) => {
        e.preventDefault();
        console.log(this.state.searchText)
        window.location.href="/Search/" + this.state.searchText
    }

    render() {
        if(this.state.token) {
            if(this.state.role === "ADMIN") {
                return (
                    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                        <div className="navbar-brand">
                            Похозяйственный учет
                        </div>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link disabled" style={{color: "#ffc107"}} href="#" tabIndex="-1" aria-disabled="true">{this.state.fio}</a>
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
                                <input className="form-control mr-sm-2"
                                       aria-label="Search" onChange={e => this.setState({searchText: e.target.value})} onKeyPress={e => this.searchKeyPressed(e)}/>
                                    <button className="btn btn-success " type="button" onClick={e => this.onSearchButtonClicked(e)}>Поиск</button>
                            </form>
                            <button className="btn btn-primary" onClick={e => this.logoutButtonPressed(e)}>Выйти</button>
                        </ul>
                    </nav>
                )
            } else {
                return (
                    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                        <div className="navbar-brand">
                            Похозяйственный учет
                        </div>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link disabled" style={{color: "#ffc107"}} href="#" tabIndex="-1" aria-disabled="true">{this.state.fio}</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/HouseholdBooks">
                                    Реестр похозяйственных книг
                                </NavLink>
                            </li>
                            <form className="form-inline my-2 my-lg-0" style={{position: "absolute", top: 10, right: 10,}}>
                                <input className="form-control mr-sm-2"
                                       aria-label="Search"  onChange={e => this.setState({searchText: e.target.value})} onKeyPress={e => this.searchKeyPressed(e)}/>
                                <button className="btn btn-success" type="button" onClick={e => this.onSearchButtonClicked(e)}>Поиск</button>
                            </form>
                            <button className="btn btn-primary" onClick={e => this.logoutButtonPressed(e)}>Выйти</button>
                        </ul>
                    </nav>
                )
            }
        }
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                <div className="navbar-brand">
                    Похозяйственный учет
                </div>
                <ul className="navbar-nav">
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