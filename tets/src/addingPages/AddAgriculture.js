import React, {Component} from "react";
import {AddAgriculturePath, AddLandTypePath, GetAgriculturePath, GetLandPath, GetLendTypesPath} from "../helpers/Path";
import axios from "axios";

export default class AddAgriculture extends Component {

    state = {
        agricultures: []
    }

    componentDidMount = async () => {
        let config = {
            method: 'post',
            url: GetLendTypesPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        };

        let url = GetAgriculturePath
        await axios.get(url, config)
            .then(res => {
                console.log(res)
                this.setState({
                    agriculturesTypes: res.data.payload.agricultures
                })
            })
            .catch(err => {
                console.log(err)
            })

        url = GetLandPath
        const req = {
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            bankBookName: this.props.match.params.bankBookName,
            cadastralNumber: this.props.match.params.cadastralNumber
        }

        console.log(url)

        await axios.post(url, req, config).then(respnse => {
            console.log(respnse)
            //console.log(Users)
            if(respnse.data.payload) {
                this.setState({
                    agricultures: respnse.data.payload.agricultures
                })
            }
            console.log(respnse)
        })

        this.setState({
            isApply: true
        })
    }

    selectorChanged = (e) => {
        console.log(e.target.value)
        this.setState({
            agriculturesTypeSelector: e.target.value
        })
    }

    componentWillMount() {
        this.setState({
            isApply: false
        })
    }

    agriculturesCreatorButtonPressed = () => {

    }

    addButtonPressed = async () => {
        let config = {
            method: 'post',
            url: AddLandTypePath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };
        let url = AddAgriculturePath

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            land: this.props.match.params.cadastralNumber,
            agricultures: [{
                agriculture: this.state.agriculturesTypeSelector,
                value: this.value
            }]
        }

        console.log(req)

        console.log(url)
        await axios.post(url, req, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log("Salam")
        if(!this.state.isApply) {
            return (
                <h1>
                    Загрузка...
                </h1>
            )
        }
        return (
            <a>
                <div>
                    <select onChange={e => this.selectorChanged(e)} class="form-select" aria-label="Default select example" defaultValue="Выберите">
                        <option selected>Выберите</option>
                        {
                            this.state.agriculturesTypes.map((agriculturesType, index) => {
                                return(
                                    <option value={agriculturesType.name}>{index + 1}. {agriculturesType.name}</option>)
                            })
                        }
                    </select>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.agriculturesCreatorButtonPressed(e)}>+</button>
                </div>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => this.value = e.target.value} placeholder='Площадь' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>
                </div>
                <div>
                    {
                        this.state.agricultures.map((agriculture, index) => {
                            return(<a href="#" className="list-group-item list-group-item-action"
                                      aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{agriculture.agriculture}</h5>
                                </div>
                                <p className="mb-1">Создатель: {agriculture.creatorName}</p>
                                <small>Площадь: {agriculture.area}</small>
                            </a>)
                        })

                    }
                </div>
            </a>
        )
    }
}