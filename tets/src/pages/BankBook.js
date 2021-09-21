import React, {Component, Fragment} from "react";
import axios from "axios";
import HouseholdBook from "./HouseholdBook";
import {CancelResizdentPath, CloseBankBook, GetBankBooksPath, GetHouseHoldBooksPath} from "../helpers/Path";
import {Form, Modal} from "react-bootstrap";
import moment from "moment";

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
            if(respnse.data) {
                if(respnse.data.payload) {
                    if(respnse.data.payload.bankBooks) {
                        this.setState({
                            bankBooks: respnse.data.payload.bankBooks
                        })
                    }
                }
            }
            this.setState({
                didLoad: true
            })
        })
    }
    componentWillMount() {
        this.setState({
            HouseholdBook: {
                householdBookName: this.props.match.params.householdBookName,
                kozhuunName: this.props.match.params.kozhuunName
            },
            mod:false,
            ind: -1,
            willDeleteName: ""
        })
    }

    addButtonClicked = (e) => {
        console.log({pathname : '/AddBankBook/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName})
        this.props.history.push({pathname : '/AddBankBook/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName})
    }

    openButtonClicked = (e, ind) => {
        this.props.history.push({pathname: '/BankBookSpecification/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.state.bankBooks[ind].name})
    }

    openModal = (e,  index) => {
        this.setState({
            mod: true,
            ind: index,
            willDeleteName: this.state.bankBooks[index].mainFio
        })
    }

    closeModal = (e) => {
        this.setState({
            mod:false,
            ind: -1
        })
    }

    onCancelButtonPressed = async (e) => {

        let config = {
            method: 'get',
            url: CancelResizdentPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let date = ""

        if(this.cancelDate) {
            let getСreationDate = new Date(this.cancelDate)
            date = moment(getСreationDate).format('DD.MM.YYYY')
        }


        const req = {
            bankBookName: this.state.bankBooks[this.state.ind].name,
            closeDate: date,
            closeReason: this.cancelReason,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName
        }

        console.log(req)

        await axios.post(CloseBankBook, req, config).then(resp => {
            console.log(resp)
        })

        window.location.reload()
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
                    <h1>{this.props.match.params.kozhuunName}</h1>
                </Form>

                <Modal show={this.state.mod} onHide={e => this.closeModal(e)}>
                    <Modal.Header closeButton>
                        <h4>{this.state.willDeleteName}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <input placeholder="Причина закрытия" onChange={e => this.cancelReason = e.target.value} className="form-control" aria-describedby="basic-addon1"/>
                        <input type="date" onChange={e => this.cancelDate = e.target.value} name='issueDate' placeholder='Дата выбытия' className="form-control" aria-describedby="basic-addon1" style={{marginTop: 20}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  type="button" className="btn btn-outline-danger" onClick={e => this.onCancelButtonPressed(e)}>Закрыть ЛС</button>
                    </Modal.Footer>
                </Modal>

                <Form>
                <ul className="list-group">
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonClicked(e)} style={{marginTop:20}}>Добавить Лицевой счет</button>
                {   this.state.bankBooks ? this.state.bankBooks.map((book, index) => {

                        if(book.closingDate || book.closingReason) {
                            return (
                                <a href="#" className="list-group-item list-group-item-action"
                                       aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1" style={{ textDecorationLine: 'line-through' }}>{book.name}. {book.mainFio}</h5>
                                    </div>
                                    <p className="mb-1">Сумон: {this.props.match.params.villageName}</p>

                                    <small>Дата создания: {book.creationDate}</small>
                                    <p className="mb-1">Адрес: {book.address}</p>
                                    <p className="mb-1">Доп. информация: {book.additionalInfo}</p>
                                    <p className="mb-1">Причина закрытия: {book.closingReason}</p>
                                    <p className="mb-1">Дата закрытия: {book.closingDate}</p>
                                </a>

                            )
                        }
                        return(<a href="#" className="list-group-item list-group-item-action"
                                  aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{book.name}. {book.mainFio}</h5>
                                <small><button onClick={e => this.openButtonClicked(e, index)} type="submit" className="btn btn-outline-success" style={{position: "absolute", top: 10, right: 150,}}>Открыть</button></small>
                                <small><button  type="button" className="btn btn-outline-danger" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModal(e, index)}>Закрыть ЛС</button></small>
                            </div>
                            <p className="mb-1">Сумон: {this.props.match.params.villageName}</p>
                            <p className="mb-1">Адрес: {book.address}</p>
                            <p className="mb-1">Доп. информация: {book.additionalInfo}</p>
                            <small>Дата создания: {book.creationDate}</small>
                        </a>)
                       // return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                    }) : null

                }
                </ul>
                </Form>
            </Fragment>

        )
    }
}