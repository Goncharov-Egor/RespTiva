import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {GetHouseHoldBooksPath} from "../helpers/Path";
import axios from "axios";

export default class HouseholdBook extends Component {

    state = {}

    componentDidMount() {

        console.log("asdfghjkvcxzxcvbnm,hgfd")

        let config = {
            method: 'get',
            url: GetHouseHoldBooksPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };
        let url = GetHouseHoldBooksPath

        axios.get(url, config).then((respnse) => {
            let HouseholdBooks = (JSON.parse(JSON.stringify(respnse)).data.payload.householdBooks)
            this.setState({
                HouseholdBooks: HouseholdBooks,
                isLoaded: true
            })
            //console.log(Users)
        })

    }

    addButtonClicked = e => {
        window.open("/AddHouseholdBook")
    }

    openButtonClicked = (e, ind) => {
        let a = JSON.stringify(this.state.HouseholdBooks[ind])
        console.log(a)
        //console.log(this.state.HouseholdBooks[ind])
        //localStorage.setItem('HouseholdBook', this.state.HouseholdBooks[ind])

        this.props.history.push({pathname: '/BankBook/' + this.state.HouseholdBooks[ind].name + '/' + this.state.HouseholdBooks[ind].kozhuunName,
            state: JSON.stringify(this.state.HouseholdBooks[ind])})
        //window.open('/BankBook')
    }

    render() {

        if(this.state.isLoaded) {
            return (
                <ul className="list-group">
                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonClicked(e)}>Добавить книгу</button>
                    {
                        this.state.HouseholdBooks.map((empl, index) => {
                            return(<a href="#" className="list-group-item list-group-item-action"
                                      aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{index + 1} Книга: {empl.name}</h5>
                                    <small><button onClick={e => this.openButtonClicked(e, index)} type="submit" className="btn btn-outline-success" >Открыть</button></small>
                                </div>
                                <p className="mb-1">Название кожууна: {empl.kozhuunName}</p>
                                <small>Имя создателя: {empl.creatorName}</small>
                            </a>)
                          return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                        })

                    }
                </ul>
            )
        }
        return (<ul className="list-group">
            {
                <h1>Загрузка</h1>
                //this.state.HouseholdBooks.map((empl, index) => {
                //  return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                //})

            }
        </ul>)
    }
}
