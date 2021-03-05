import React, {Fragment} from "react";
import {CancelResizdentPath, CloseBankBook, GetResidentsPath, SearchPath} from "../helpers/Path";
import axios from "axios";
import {Form, Modal} from "react-bootstrap";
import moment from "moment";

export default class Search extends React.Component {

    state = {
        bankBooks:[],
        isSuccess: true,
        mod: false,
        book: null,
        willDeleteName: "",
        isLoaded: false
    }

    componentDidMount = async () => {
        let serachText = this.props.match.params.searchText
        let config = {
            method: 'get',
            url: GetResidentsPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            },

            params: {
                query: serachText
            }
        };


        await axios.get(SearchPath, config).then(resp => {
            console.log(resp)
            this.setState({
                bankBooks: resp.data.payload.bankBooks,
                isSuccess: resp.data.success
            })
        })
        this.setState({
            isLoaded:true
        })
    }

    openModal = (e,  book) => {
        this.setState({
            mod: true,
            book: book,
            willDeleteName: book.mainFio
        })
    }

    closeModal = (e) => {
        this.setState({
            mod:false,
            book: null
        })
    }

    onCancelButtonPressed = async (e, book) => {

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
            bankBookName: this.state.book.name,
            closeDate: date,
            closeReason: this.cancelReason,
            householdBookName: this.state.book.householdBookName,
            kozhuunName: this.state.book.kozhuunName
        }

        console.log(req)

        await axios.post(CloseBankBook, req, config).then(resp => {
            console.log(resp)
        })

        window.location.reload()
    }

    openButtonClicked = (e, book) => {
        this.props.history.push({pathname: '/BankBookSpecification/' + book.householdBookName + '/' + book.kozhuunName + '/' + book.name})
    }

    render() {

        if(!this.state.isLoaded) {
            return (
                <h3>
                    Идет поиск
                </h3>
            )
        }

        if(!this.state.isSuccess || (this.state.bankBooks.length === 0)) {
            return (<h3>
                По запросу ничего не найдено
            </h3>)
        }
        return(
            <Fragment>

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
                    <h3>По запросу "{this.props.match.params.searchText}" найдено:</h3>
                    <ul className="list-group" style={{marginTop: 40}}>
                        {
                            this.state.bankBooks.map((book, index) => {

                                if(book.closingDate || book.closingReason) {
                                    return (
                                        <a href="#" className="list-group-item list-group-item-action"
                                           aria-current="true">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1" style={{ textDecorationLine: 'line-through' }}>Книга {book.householdBookName}. {book.mainFio}</h5>
                                            </div>

                                            <small>Дата создания: {book.creationDate}</small>

                                            <p className="mb-1">Кожуун: {book.kozhuunName}</p>
                                            <p className="mb-1">Адрес: {book.address}</p>
                                            <p className="mb-1">ИНН: {book.inn}</p>
                                            <p className="mb-1">Доп. информация: {book.additionalInfo}</p>
                                            <p className="mb-1">Причина закрытия: {book.closingReason}</p>
                                            <p className="mb-1">Дата закрытия: {book.closingDate}</p>
                                        </a>

                                    )
                                }
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Книга {book.householdBookName}. {book.mainFio}</h5>
                                        <small><button onClick={e => this.openButtonClicked(e, book)} type="submit" className="btn btn-outline-success" style={{position: "absolute", top: 10, right: 150,}}>Открыть</button></small>
                                        <small><button  type="button" className="btn btn-outline-danger" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModal(e, book)}>Закрыть ЛС</button></small>

                                    </div>
                                    <div>
                                        <p className="mb-1">Кожуун: {book.kozhuunName}</p>
                                        <p className="mb-1">Адрес: {book.address}</p>
                                        <p className="mb-1">ИНН: {book.inn}</p>
                                        <p className="mb-1">Доп. информация: {book.additionalInfo}</p>
                                    </div>
                                    <small>Дата создания: {book.creationDate}</small>
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