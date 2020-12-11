import React, {Component} from "react";
import {AddAgriculturePath, AddLandTypePath, GetAgriculturePath, GetLendTypesPath} from "../helpers/Path";
import axios from "axios";

export default class AddAgriculture extends Component {

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
                {/*<div>*/}
                {/*    {*/}
                {/*        this.state.landTypes1.map((landType, index) => {*/}
                {/*            return(<a href="#" className="list-group-item list-group-item-action"*/}
                {/*                      aria-current="true">*/}
                {/*                <div className="d-flex w-100 justify-content-between">*/}
                {/*                    <h5 className="mb-1">{landType.landType}</h5>*/}
                {/*                </div>*/}
                {/*                <p className="mb-1">Создатель: {landType.creatorName}</p>*/}
                {/*                <small>Площадь: {landType.area}</small>*/}
                {/*            </a>)*/}
                {/*        })*/}

                {/*    }*/}
                {/*</div>*/}
            </a>
        )
    }
}