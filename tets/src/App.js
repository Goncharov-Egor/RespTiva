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
import AddBankBook from "./addingPages/AddBankBook";
import BankBookSpecification from "./pages/BankBookSpecification";
import AddResident from "./addingPages/AddResident";
import AddLand from "./addingPages/AddLand";
import AddLandType from "./addingPages/AddLandType";
import LandTypesCreator from "./CreatePages/LandTypesCreator";
import AddAgriculture from "./addingPages/AddAgriculture";
import AddFarmAnimals from "./addingPages/AddFarmAnimals";
import AnimalTypesCreator from "./CreatePages/AnimalTypesCreator";
import AddTransport from "./addingPages/AddTransport";
import Search from "./pages/Search";

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

    componentWillMount() {
        this.setState({
            token: null
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar token={this.state.token}/>
                <div className="container pt-4">
                    <Switch>
                        <Route path={'/'} exact component={Home}/>
                        <Route path={'/about'} exact component={About}/>
                        <Route path={'/login'} exact component={() => <Login setToken = {this.setToken}/>}/>
                        <Route path={'/users/registration'} exact component={Registration}/>
                        <Route path={'/users'} exact component={UsersList}/>
                        <Route path={'/HouseholdBooks'} exact component={HouseholdBook}/>
                        <Route path={'/AddHouseholdBook'} exact component={AddHouseholdBook}/>
                        <Route path={'/BankBook/:householdBookName/:kozhuunName/:villageName'} exact component={BankBook}/>
                        <Route path={'/AddBankBook/:householdBookName/:kozhuunName'} exact component={AddBankBook}/>
                        <Route path={'/BankBookSpecification/:householdBookName/:kozhuunName/:bankBookName'} exact component={BankBookSpecification}/>
                        <Route path={'/AddResident/:householdBookName/:kozhuunName/:bankBookName'} exact component={AddResident}/>
                        <Route path={'/AddLand/:householdBookName/:kozhuunName/:bankBookName'} exact component={AddLand}/>
                        <Route path={'/GetLendTypesPath'} exact component={AddLandType}/>
                        <Route path={'/AddLandType/:householdBookName/:kozhuunName/:bankBookName/:cadastralNumber'} exact component={AddLandType}/>
                        <Route path={'/LandTypesCreator'} exact component={LandTypesCreator}/>
                        <Route path={'/AddAgriculture/:householdBookName/:kozhuunName/:bankBookName/:cadastralNumber'} exact component={AddAgriculture}/>
                        <Route path={'/AddFarmAnimals/:householdBookName/:kozhuunName/:bankBookName'} exact component={AddFarmAnimals}/>
                        <Route path={'/AnimalTypesCreator'} exact component={AnimalTypesCreator}/>
                        <Route path={'/AddTransport/:householdBookName/:kozhuunName/:bankBookName'} exact component={AddTransport}/>
                        <Route path={'/Search/:searchText'} exact component={Search}/>

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
