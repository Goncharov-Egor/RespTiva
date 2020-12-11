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

    addLand = (e ) => {
        this.props.history.push({pathname : '/AddLand/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName } )
    }

    addLandTypeButtonPressed = (e, index) => {
        this.props.history.push({pathname : '/AddLandType/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName+ '/' + this.state.Lands[index].cadastralNumber})
    }

    addAgricultureTypeButtonPressed = (e, index) => {
        this.props.history.push({pathname : '/AddAgriculture/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName+ '/' + this.state.Lands[index].cadastralNumber})
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
                    <h2>-</h2>
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
                    <h2>-</h2>
                    <h2>Земельные участки</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addLand(e)}>Добавить земельный участок</button>
                        {
                            this.state.Lands.map((land, index) => {
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Участок №{index + 1}. Кадастровый номер: {land.cadastralNumber}</h5>
                                        <small><button type="submit" onClick={e => this.addLandTypeButtonPressed(e, index)} className="btn btn-outline-info" >Площадь по виду земель</button>-
                                            <button type="submit" onClick={e => this.addAgricultureTypeButtonPressed(e, index)} className="btn btn-outline-warning" >Площадь земли занятой культурами</button></small>
                                    </div>
                                    <p className="mb-1">Документ: {land.document}</p>
                                    <p className="mb-1">Имя создателя: {land.creatorName}</p>
                                    <p className="mb-1">Категория: {land.landCategory}</p>
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