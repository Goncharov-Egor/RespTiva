import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import {GetHouseHoldBooksPath, GetLandsPath, GetResidentsPath} from "../helpers/Path";
import axios from "axios";

export default class BankBookSpecification extends Component {

    componentDidMount = async () => {

        let config = {
            method: 'get',
            url: GetResidentsPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = GetResidentsPath
        const BBook = {
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            bankBookName: this.props.match.params.bankBookName
        }

        console.log(BBook)

        await axios.post(url, BBook, config).then((respnse) => {
            console.log(respnse)
            //console.log(Users)
            this.setState({
                Residents: respnse.data.payload.residents,
            })
        })

        url = GetLandsPath
        console.log("sdfgjklkjhgfdsdfghjkjhgfdsdfghjklkjhgfdf")
        await axios.post(url, BBook, config).then((respnse) => {
            console.log(respnse)
            //console.log(Users)
            this.setState({
                Lands: respnse.data.payload.lands,
                isLoaded: true
            })
        })
    }

    componentWillMount() {
        this.setState({
            isLoaded: false
        })
    }


    addResidentButtonPressed = (e) => {
        this.props.history.push({pathname : '/AddResident/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName})
    }

    addLand = (e) => {

    }

    render() {
        if(!this.state.isLoaded) {
            return (
                <h1>Загрузка</h1>
            )
        }
        return (
            <Fragment>
                <Form>
                    <h1>{this.props.match.params.bankBookName}</h1>
                </Form>
                <Form>
                    <h2>Члены хозяйства</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addResidentButtonPressed(e)}>Добавить члена хозяйства</button>
                        {
                            this.state.Residents.map((resident, index) => {
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{index + 1} {resident.name}</h5>
                                        <small>{resident.relation}</small>
                                        <small>{resident.residenceMark}</small>
                                    </div>
                                    <p className="mb-1">Дата рождения: {resident.birthDate}</p>
                                    <small>Пол: {resident.gender}</small>
                                </a>)
                                // return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                            })

                        }
                    </ul>
                </Form>
                <Form>
                    <h2>Земельные участки</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addLand(e)}>Добавить земельный участок</button>
                        {
                            this.state.Lands.map((land, index) => {
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{index + 1} Кадастровый номер: {land.cadastralNumber}</h5>
                                        <small>Имя создателя: {land.creatorName}</small>
                                        <small>Категория: {land.landCategory}</small>
                                    </div>
                                    <p className="mb-1">Документ: {land.document}</p>
                                    <small>Общая площадь: {land.totalArea}</small>
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