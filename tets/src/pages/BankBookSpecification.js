import React, {Component, Fragment} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    AddFarmAnimalsPath,
    BasePath, CancelResizdentPath, GetBankBookInfo,
    GetFarmAnimalsPath,
    GetHouseHoldBooksPath,
    GetLandsPath,
    GetResidentsPath,
    GetTransportPath
} from "../helpers/Path";
import axios from "axios";
import FarmAnimals from "../components/FarmAnimals";
import moment from "moment";
import AddFarmAnimals from "../addingPages/AddFarmAnimals";

export default class BankBookSpecification extends Component {

    state = {
        animals: [],
        transport: [],
        mod: false,
        willDeleteName: "",
        willDeleteId: "",
        animalsMod: false,
        pet: "",
        valueOfPets: "",
        bankBook: {},
        issueDate: null,
        issuingAuthority: "",
        passportId: "",
        passportSeries: "",
        passport: null
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

            respnse.data.payload.residents.map(resident => {
                if(resident.relation){ } else {
                    this.setState({
                        issueDate: resident.passport.issueDate,
                        issuingAuthority: resident.passport.issuingAuthority,
                        passportId: resident.passport.passportId,
                        passportSeries: resident.passport.passportSeries,
                    })
                    if(this.state.issueDate && this.state.issueDate !== "") {
                        this.setState({
                            passport: "Паспорт выдан " + this.state.issueDate + ", в " + this.state.issuingAuthority + ", "
                                + this.state.passportSeries + " " + this.state.passportId + " "
                        })
                    }
                }
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

        await axios.post(GetBankBookInfo, BBook, config).then(resp => {
            this.setState( {
                bankBook: resp.data.payload
            })
        }).catch(err => {
            console.log(err)
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

    openModalAnimals = (e, name, value) => {
        this.setState({
            animalsMod: true,
            pet: name,
            valueOfPets: value
        })
    }

    closeModalAnimals = (e) => {
        this.setState({
            animalsMod: false
        })
    }

    onAnimalButtonPressed = async (e) => {
        let config = {
            method: 'get',
            url: CancelResizdentPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        const req = {
            animals: [{
                name: this.state.pet,
                value: this.animalValue
            }],
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            bankBookName: this.props.match.params.bankBookName
        }

        await axios.post(AddFarmAnimalsPath, req, config).then(resp => {
            console.log(resp)
        })

        window.location.reload()
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
        this.props.history.push( {pathname : '/AddAgriculture/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName+ '/' + this.state.Lands[index].cadastralNumber} )
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
        const printLandsPath = BasePath + "print/bank_book?kozhuunName=" + this.props.match.params.kozhuunName + "&bankBookName=" + this.props.match.params.bankBookName + "&householdBookName=" + this.props.match.params.householdBookName
        const printHHBookPath = BasePath + "print/bank_book/summary?kozhuunName=" + this.props.match.params.kozhuunName + "&bankBookName=" + this.props.match.params.bankBookName + "&householdBookName=" + this.props.match.params.householdBookName
        const headString = this.state.bankBook.mainFio + (this.state.passport || this.state.bankBook.address || this.state.bankBook.inn || this.state.bankBook.additionalInfo ? "," : "")
        console.log(headString)
        return (
            <Fragment>
                <Form>
                    <h4>Лицевой счет №{this.props.match.params.bankBookName}</h4>
                    <h1>{(headString !== "undefined," && headString !== "undefined") ? headString : ""}</h1>
                    <h4>{this.state.passport}</h4>
                    <h2>{this.state.bankBook.address}</h2>
                    <h3>{this.state.bankBook.inn ? "ИНН: " + this.state.bankBook.inn : ""}</h3>
                    <h5>{this.state.bankBook.additionalInfo ? "Дополнительная информация: " + this.state.bankBook.additionalInfo : ""}</h5>
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

                <Modal show={this.state.animalsMod} onHide={e => this.closeModalAnimals(e)}>
                    <Modal.Header closeButton>
                        <h4>{this.state.pet}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <input placeholder="Новое количество" onChange={e => this.animalValue = e.target.value} className="form-control" aria-describedby="basic-addon1"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  type="button" className="btn btn-outline-success" onClick={e => this.onAnimalButtonPressed(e)}>Изменить</button>
                    </Modal.Footer>
                </Modal>

                <Form>

                    <div className="mb-3">
                        <a style={{marginTop:20}} className="App-link" href={printHHBookPath} target="_blank">Выписка из похозяйственной книги</a>
                    </div>
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
                                            <h7>{resident.relation}</h7>
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
                                        <h7>{resident.relation}</h7>
                                        <small><button  type="button" className="btn btn-outline-danger" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModal(e, resident.id, index)}>Выбыть</button></small>

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
                                            <button type="submit" onClick={e => this.addAgricultureTypeButtonPressed(e, index)} className="btn btn-outline-warning" >Площадь земли, занятой культурами</button></small>
                                    </div>
                                    <p className="mb-1">Документ: {land.document}</p>
                                    <p className="mb-1">Имя создателя: {land.creatorName}</p>
                                    <p className="mb-1">Категория: {land.landCategory}</p>
                                    <small>Общая площадь: {land.totalArea}га</small>
                                    <p>
                                        <div className="mb-3" style={{marginTop: 15}}>
                                            <a className="App-link" href={printLandsPath + "&cadastralNumber=" + land.cadastralNumber} target="_blank">Печать прав на земельный участок</a>
                                        </div>
                                    </p>
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
                                            <small><button  type="button" className="btn btn-outline-info" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModalAnimals(e, animal.name, animal.value)}>Изменить</button></small>
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
                                    <small><button  type="button" className="btn btn-outline-info" style={{position: "absolute", top: 10, right: 10,}} onClick={e => this.openModalAnimals(e, animal.name, animal.value)}>Изменить</button></small>

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