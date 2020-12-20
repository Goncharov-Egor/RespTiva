import React, {Component, Fragment} from "react";
import {AddLandPath, AddLandTypePath, GetLandPath, GetLandsPath, GetLendTypesPath} from "../helpers/Path";
import axios from "axios";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Redirect} from "react-router-dom";
import AddHouseHoldBookError from "../errors/AddHouseHoldBookError";

export default class AddLandType extends Component {

    addButtonPressed = async (e) => {
        let config = {
            method: 'post',
            url: AddLandTypePath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };
        let url = AddLandTypePath

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            land: this.props.match.params.cadastralNumber,
            landTypes: [{
                landType: this.state.landType,
                value: this.value
            }]
        }

        console.log(req)

        await axios.post(url, req, config)
            .then(res => {
                console.log(res)

                this.setState({
                    isSuccess: res.data.success
                })

            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isFirst: false
        })
    }


    componentDidMount = async () => {
        let config = {
            method: 'post',
            url: GetLendTypesPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = GetLendTypesPath
        await axios.get(url, config)
            .then(res => {
                console.log(res)
                var opt = []
                res.data.payload.landTypes.map((lt) => {
                    opt.push({value: lt.name, label: lt.name})
                })
                console.log(opt)
                this.setState({
                    landTypes: res.data.payload.landTypes,
                    options: opt
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
            this.setState({
                landTypes1: respnse.data.payload.landTypes
            })
            console.log(respnse)
        })
        
        this.setState({
            isApply: true
        })
    }

    componentWillMount() {
        this.setState({
            isApply: false,
            options: [],
            isSuccess: true,
            isFirst: true
        })
    }

    selectorChanged = (e) => {
        console.log(e.value)
        this.setState({
            landType: e.value
        })
    }

    landCreatorButtonPressed = (e) => {
        this.props.history.push({pathname : '/LandTypesCreator'})
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
        if(this.state.isSuccess && !this.state.isFirst) {
            let path = '/BankBookSpecification/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName
            return(<Redirect to={path}/>)
        }
        console.log(this.state.landTypes1)
        return (
                <a>
                    <div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.landCreatorButtonPressed(e)}>+</button>

                            <Select
                                placeholder='Вид'
                                onChange={e=>this.selectorChanged(e)}
                                options={this.state.options}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.value = e.target.value} placeholder='Площадь' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <AddHouseHoldBookError message="Неверные данные" isInvalid={!this.state.isSuccess}/>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>
                        </div>
                    </div>
                    <div>
                    {
                        this.state.landTypes1.map((landType, index) => {
                            return(<a href="#" className="list-group-item list-group-item-action"
                                      aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{landType.landType}</h5>
                                </div>
                                <p className="mb-1">Создатель: {landType.creatorName}</p>
                                <small>Площадь: {landType.area}</small>
                            </a>)
                        })

                    }
                    </div>

                </a>
        )
    }
}