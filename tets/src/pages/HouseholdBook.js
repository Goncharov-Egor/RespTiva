import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {GetExcel, GetHouseHoldBooksPath} from "../helpers/Path";
import axios from "axios";
import {expiredTokenErrorConstant} from "../errors/ErrorConstants";
import InvalidTokenError from "../errors/InvalidTokenError";

export default class HouseholdBook extends Component {

    state = {
        isDisabled: false
    }

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
            if(respnse.data.message === expiredTokenErrorConstant){
                this.setState({
                    isExpiredToken: true
                })
            } else {
                let HouseholdBooks = (JSON.parse(JSON.stringify(respnse)).data.payload.householdBooks)
                this.setState({
                    HouseholdBooks: HouseholdBooks,
                    isLoaded: true
                })
            }
            console.log(respnse)
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

        this.props.history.push({pathname: '/BankBook/' + this.state.HouseholdBooks[ind].name + '/' + this.state.HouseholdBooks[ind].kozhuunName + '/' + this.state.HouseholdBooks[ind].villageName,
            state: JSON.stringify(this.state.HouseholdBooks[ind])})
        //window.open('/BankBook')
    }

    getExcelButtonPressed = async e => {
        this.setState({
            isDisabled: true
        })

        let config = {
            method: 'get',
            url: GetHouseHoldBooksPath,
            responseType: 'blob',

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        await axios.get(GetExcel, config).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Выписка.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err)
        })

        setTimeout(function() { this.setState({
            isDisabled: false
        })}.bind(this), 2000)

    }

    render() {
        if (this.state.isExpiredToken) {
            return <InvalidTokenError isInvalid={true}/>
        }
        if(this.state.isLoaded) {
            return (

               <div>
                   <button type="button" className="btn btn-secondary btn-sm" disabled={this.state.isDisabled} onClick={e => this.getExcelButtonPressed(e)}>Выписка Excel</button>
                    <ul className="list-group" style={{marginTop: 25}}>
                        <h1>Реестр похозяйственных книг</h1>
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
                                    <p className="mb-1">Название сумона: {empl.villageName}</p>
                                    <small>Имя создателя: {empl.creatorName}</small>
                                </a>)
                              return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                            })

                        }
                    </ul>
               </div>
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
