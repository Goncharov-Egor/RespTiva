import React, {Component, Fragment} from "react";
import axios from "axios";
import HouseholdBook from "./HouseholdBook";
import {GetBankBooksPath, GetHouseHoldBooksPath} from "../helpers/Path";
import {Form} from "react-bootstrap";

export default class BankBook extends Component {

    componentDidMount() {
        let config = {
            method: 'get',
            url: GetHouseHoldBooksPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        console.log(this.props.match.params.householdBookName)
        console.log(this.props.match.params.kozhuunName)

        const HHBook = {
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName
        }

        let url = GetBankBooksPath
        axios.post(url, HHBook, config).then((respnse) => {
            console.log(respnse)
            //console.log(Users)
            this.setState({
                bankBooks: respnse.data.payload.bankBooks,
                didLoad: true
            })
        })
    }
    componentWillMount() {
        this.setState({
            HouseholdBook: {
                householdBookName: this.props.match.params.householdBookName,
                kozhuunName: this.props.match.params.kozhuunName
            }
        })
    }

    addButtonClicked = (e) => {

    }

    openButtonClicked = (e) => {

    }


    render() {
        if(!this.state.didLoad) {
            return (
                <h1>
                    Загрузка...
                </h1>
            )
        }
        return(
            <Fragment>
                <Form>
                    <h1>{this.props.match.params.householdBookName}</h1>
                </Form>
                <Form>
                <ul className="list-group">
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonClicked(e)}>Добавить Лицевой счет</button>
                {
                    this.state.bankBooks.map((book, index) => {
                        return(<a href="#" className="list-group-item list-group-item-action"
                                  aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{index + 1} {book.name}</h5>
                                <small><button onClick={e => this.openButtonClicked(e, index)} type="submit" className="btn btn-outline-success" >Открыть</button></small>
                            </div>
                            <p className="mb-1">ИНН: {book.inn}</p>
                            <small>Имя создателя: {book.creatorName}</small>
                        </a>)
                       // return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                    })

                }
                </ul>
                </Form>
            </Fragment>

        )
    }
}