import React, {Component, Fragment} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    BasePath, CancelResizdentPath,
    GetFarmAnimalsPath,
    GetHouseHoldBooksPath,
    GetLandsPath,
    GetResidentsPath,
    GetTransportPath
} from "../helpers/Path";
import axios from "axios";
import FarmAnimals from "../components/FarmAnimals";
import moment from "moment";

export default class BankBookSpecification extends Component {

    state = {
        animals: [],
        transport: [],
        mod: false,
        willDeleteName: "",
        willDeleteId: ""
    }

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

        url = GetFarmAnimalsPath
        await axios.post(url, BBook, config).then((res) => {
            console.log(res)
            this.setState({
                animals: res.data.payload.animals
            })
        }).then(err => {
            console.log(err)
        })

        url = GetLandsPath
        console.log("sdfgjklkjhgfdsdfghjkjhgfdsdfghjklkjhgfdf")
        await axios.post(url, BBook, config).then((respnse) => {
            console.log(respnse)
            //console.log(Users)
            this.setState({
                Lands: respnse.data.payload.lands,

            })
        })

        url = GetTransportPath
        await axios.post(url, BBook, config).then(response => {
            console.log(response)
            this.setState({
                Transport: response.data.payload.transport,
                isLoaded: true
            })
        })
    }

    componentWillMount() {
        this.setState({
            isLoaded: false
        })
    }

    openModal = (e, id, index) => {
        this.setState({
            mod:true,
            willDeleteId: id,
            willDeleteName: this.state.Residents[index].name
        })
    }
    closeModal = (e) => {
        this.setState({
            mod:false
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
            var getСreationDate = new Date(this.cancelDate)
            date = moment(getСreationDate).format('DD.MM.YYYY')
        }

        const req = {
            cancelDate: date,
            cancelReason: this.cancelReason,
            id: this.state.willDeleteId
        }

        console.log(req)

        await axios.post(CancelResizdentPath, req, config).then(resp => {
            console.log(resp)
        })
        window.location.reload()
    }

    addResidentButtonPressed = (e) => {
        this.props.history.push({pathname : '/AddResident/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName})
    }

    addLand = (e) => {
        this.props.history.push({pathname : '/AddLand/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName } )
    }

    addLandTypeButtonPressed = (e, index) => {
        this.props.history.push({pathname : '/AddLandType/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName+ '/' + this.state.Lands[index].cadastralNumber})
    }

    addAgricultureTypeButtonPressed = (e, index) => {
        this.props.history.push({pathname : '/AddAgriculture/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName+ '/' + this.state.Lands[index].cadastralNumber})
    }

    addFarmAnimalPressed = (e) => {
        this.props.history.push({pathname : '/AddFarmAnimals/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName })
    }

    addTransportButtonPressed = (e) => {
        this.props.history.push({pathname : '/AddTransport/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName })
    }

    onPrintButtonClicked = (e) => {
        this.props.history.push({pathname : "https://google.com"})
    }

    render() {
        if(!this.state.isLoaded) {
            return (
                <h1>Загрузка</h1>
            )
        }
        const printPath = BasePath + "print/bank_book?kozhuunName=" + this.props.match.params.kozhuunName + "&bankBookName=" + this.props.match.params.bankBookName + "&householdBookName=" + this.props.match.params.householdBookName
        return (
            <Fragment>
                <Form>
                    <h1>{this.props.match.params.bankBookName}.</h1>
                </Form>
                <Modal show={this.state.mod} onHide={e => this.closeModal(e)}>
                    <Modal.Header closeButton>
                        <h4>{this.state.willDeleteName}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <input placeholder="Причина выбытия" onChange={e => this.cancelReason = e.target.value} className="form-control" aria-describedby="basic-addon1"/>
                        <input type="date" onChange={e => this.cancelDate = e.target.value} name='issueDate' placeholder='Дата выбытия' className="form-control" aria-describedby="basic-addon1" style={{marginTop: 20}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  type="button" className="btn btn-outline-danger" onClick={e => this.onCancelButtonPressed(e)}>Выбыть</button>
                    </Modal.Footer>
                </Modal>
                <Form>
                    <a className="App-link" href={printPath} target="_blank">Распечатать информацию</a>
                    <h2 style={{marginTop:100}}>Члены хозяйства</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addResidentButtonPressed(e)}>Добавить члена хозяйства</button>
                        {
                            this.state.Residents.map((resident, index) => {
                                if(resident.cancelReason || resident.cancelDate) {
                                    return(<a href="#" className="list-group-item list-group-item-action"
                                              aria-current="true">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1" style={{ textDecorationLine: 'line-through' }}>{index + 1}. {resident.name}</h5>
                                            <small>{resident.relation}</small>
                                            <small>{resident.residenceMark}</small>
                                        </div>
                                        <p className="mb-1">Дата рождения: {resident.birthDate}</p>
                                        <small>Пол: {resident.gender}</small>
                                        <p style={{marginTop: 20, textDecoration: 'black'}}>Дата выбытия: {resident.cancelDate}</p>
                                        <p style={{marginTop: 1}}>Причина выбытия: {resident.cancelReason}</p>
                                    </a>)
                                }
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{index + 1}. {resident.name}</h5>
                                        <small><button  type="button" className="btn btn-outline-danger" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModal(e, resident.id, index)}>Выбыть</button></small>
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
                    <h2 style={{marginTop:100}}>Земельные участки</h2>
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
                <Form>
                    <h2 style={{marginTop:100}}>Сельскохозяйственные животные, птицы и пчелы</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addFarmAnimalPressed(e)}>Добавить</button>
                        {
                            this.state.animals.map((animal, index) => {
                                if(animal.parentName === null) {
                                    return(
                                        <a href="#" className="list-group-item list-group-item-action"
                                           aria-current="true">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{index + 1}. {animal.name} </h5>
                                            </div>
                                            <p className="mb-1">Количество: {animal.value}</p>
                                        </a>
                                    )
                                }
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{index + 1}. {animal.parentName} <small
                                            className="text-muted">{animal.name} </small></h5>
                                    </div>
                                    <p className="mb-1">Количество: {animal.value}</p>
                                </a>)
                                // return <li className="list-group-item">{index}  {empl.creatorName} {empl.kozhuunName} {empl.name}</li>
                            })

                        }
                    </ul>
                </Form>
                <Form>
                    <h2 style={{marginTop:100}}>Техника</h2>
                    <ul className="list-group">
                        <button type="submit" className="btn btn-primary" onClick={e => this.addTransportButtonPressed(e)}>Добавить</button>
                        {
                            this.state.Transport.map((transport, index) => {
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{index + 1}. {transport.name} <small
                                            className="text-muted">({transport.year}) </small></h5>
                                    </div>
                                    <p className="mb-1">Количество: {transport.num}</p>
                                    <p className="mb-1">Права: {transport.rights}</p>
                                </a>)
                            })

                        }
                    </ul>
                </Form>
            </Fragment>

        )
    }
}