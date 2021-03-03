import React, {Component, Fragment} from "react";
import {AddAgriculturePath, AddLandTypePath, GetAgriculturePath, GetLandPath, GetLendTypesPath} from "../helpers/Path";
import axios from "axios";
import Select from "react-select";
import {Form} from "react-bootstrap";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";

export default class AddAgriculture extends Component {

    state = {
        agricultures: {},
        agriculturesTypes: {},
        options: [],
        isSecondField: false,
        secondField: [],
        options2: [],
        name: "",
        parentName: "",
        agr: [],
        isSuccess: true,
        isFirst: true
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

        await axios.get(url, config).then( res => {
            console.log(res)
            res.data.payload.agricultures.map((agriculture) => {

                if(agriculture.parentName !== "") {
                    this.state.agriculturesTypes[agriculture.parentName] = []
                }
            })
            res.data.payload.agricultures.map((agriculture) => {
                if(agriculture.parentName !== null) {
                    this.state.agriculturesTypes[agriculture.parentName].push(agriculture.name)
                } else {
                    this.state.agriculturesTypes[agriculture.name] = []
                }
            })
        })
        let opt = []

        for(let obj in this.state.agriculturesTypes) {
            opt.push({value: obj, label: obj})
        }
        this.setState({
            options: opt
        })

        url = GetLandPath

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            cadastralNumber: this.props.match.params.cadastralNumber,
        }

        axios.post(url, req, config).then(resp => {

            console.log(resp)

            this.setState({
                agr: resp.data.payload.agricultures
            })
        })

        this.state.options.map(opt => {
            console.log(opt)
        })

        let ind = -1
        this.state.options.map((opt, index) => {
            if(opt.value === "null")
                ind = index
        })
        if (ind > -1) {
            this.state.options.splice(ind, 1);
        }

        this.setState({
            isApply: true
        })
    }

    selectorChanged = (e) => {

        this.setState({
            isSecondField: this.state.agriculturesTypes[e.value].length !== 0,
            name: e.value
        })
        if(this.state.agriculturesTypes[e.value].length !== 0) {
            var opt2 = []
            for(var i in this.state.agriculturesTypes[e.value]) {
                opt2.push({label: this.state.agriculturesTypes[e.value][i], value : this.state.agriculturesTypes[e.value][i]})
            }
            this.setState({
                options2: opt2,
            })
        }
    }

    componentWillMount() {
        this.setState({
            isApply: false
        })
    }

    agriculturesCreatorButtonPressed = () => {
        this.props.history.push({pathname : '/AgricultureTypeCreator'})
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
                agriculture: this.state.name,
                value: this.value
            }]
        }


        console.log(req)

        console.log(url)
        await axios.post(url, req, config)
            .then(res => {
                console.log(res)
                this.setState({
                    isSuccess: res.data.success,
                    isFirst: false
                })
            })
            .catch(err => {
                console.log(err)
            })

        if(this.state.isSuccess)
            window.location.reload()
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
        if(this.state.isSecondField) {
            return (
                <Fragment>
                    <h1>Добавление площади земли, занятой культурами</h1>
                    <Form>
                        <div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.agriculturesCreatorButtonPressed(e)}>+</button>

                                <Select
                                    placeholder='Вид'
                                    options={this.state.options}
                                    onChange={e => this.selectorChanged(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    placeholder='Подвид'
                                    options={this.state.options2}
                                    onChange={e => this.setState({name: e.value})}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"/>
                                </div>
                                <input onChange={e => this.value = e.target.value} name='value' placeholder='Количество' className="form-control" aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                    </Form>

                    <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={!this.state.isSuccess}/>

                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>

                    <div style={{marginTop: 20}}>
                        {
                            this.state.agr.map((agr, index) => {
                                if(agr.parentAgriculture) {
                                    return (
                                        <a href="#" className="list-group-item list-group-item-action"
                                               aria-current="true">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{agr.parentAgriculture} {agr.agriculture}</h5>
                                            </div>
                                            <p className="mb-1">Создатель: {agr.creatorName}</p>
                                            <small>Количество: {agr.area}</small>
                                        </a>
                                    )
                                }
                                return(<a href="#" className="list-group-item list-group-item-action"
                                          aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{agr.agriculture}</h5>
                                    </div>
                                    <p className="mb-1">Создатель: {agr.creatorName}</p>
                                    <small>Количество: {agr.area}</small>
                                </a>)
                            })

                        }
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h1>Добавление площади земли, занятой культурами</h1>
                <Form>
                    <div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.agriculturesCreatorButtonPressed(e)}>+</button>

                            <Select
                                placeholder='Вид'
                                options={this.state.options}
                                onChange={e => this.selectorChanged(e)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.value = e.target.value} name='value' placeholder='Количество' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </Form>

                <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={!this.state.isSuccess}/>

                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>

                <div style={{marginTop: 20}}>
                    {
                        this.state.agr.map((agr, index) => {
                            if(agr.parentAgriculture) {
                                return (
                                    <a href="#" className="list-group-item list-group-item-action"
                                       aria-current="true">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{agr.parentAgriculture} {agr.agriculture}</h5>
                                        </div>
                                        <p className="mb-1">Создатель: {agr.creatorName}</p>
                                        <small>Количество: {agr.area}</small>
                                    </a>
                                )
                            }
                            return(<a href="#" className="list-group-item list-group-item-action"
                                      aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{agr.agriculture}</h5>
                                </div>
                                <p className="mb-1">Создатель: {agr.creatorName}</p>
                                <small>Количество: {agr.area}</small>
                            </a>)
                        })

                    }
                </div>
            </Fragment>
        )
    }
}