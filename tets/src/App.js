import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './pages/Home';
import {About} from './pages/About';
import Navbar from "./components/Navbar";
import {Registration} from './pages/Registration';
import Login from './pages/Login';
import {UsersList} from "./pages/UsersList";
import HouseholdBook from "./pages/HouseholdBook"
import AddHouseholdBook from "./addingPages/AddHouseholdBook";
import BankBook from "./pages/BankBook";

export default class App extends Component{
    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.setToken(localStorage.getItem('token'))
        }
    }

    setToken = token => {
        this.setState({
            token: token,
            loggedIn: true
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar/>
                <div className="container pt-4">
                    <Switch>
                        <Route path={'/'} exact component={Home}/>
                        <Route path={'/about'} exact component={About}/>
                        <Route path={'/login'} exact component={() => <Login setToken = {this.setToken}/>}/>
                        <Route path={'/users/registration'} exact component={Registration}/>
                        <Route path={'/users'} exact component={UsersList}/>
                        <Route path={'/HouseholdBooks'} exact component={HouseholdBook}/>
                        <Route path={'/AddHouseholdBook'} exact component={AddHouseholdBook}/>
                        <Route path={'/BankBook/:householdBookName/:kozhuunName'} exact component={BankBook}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
