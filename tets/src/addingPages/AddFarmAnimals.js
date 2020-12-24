import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {AddFarmAnimalsPath, GetFarmAnimalsTypesPath, LoginPath} from "../helpers/Path";
import axios from "axios";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";

export default class AddFarmAnimals extends Component {

    state = {
        animalTypes: {},
        options: [],
        isSecondField: false,
        secondField: [],
        options2: [],
        name: "",
        parentName: "",
        isFirst: true,
        isInvalid: false
    }

    componentDidMount = async () => {
        let url = GetFarmAnimalsTypesPath
        let config = {
            method: 'post',
            url: GetFarmAnimalsTypesPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        await axios.get(url, config).then( res => {
            console.log(res)
            res.data.payload.farmAnimals.map((animal) => {

                //console.log(animal.parentName, animal.name)
                if(animal.parentName !== "") {
                    this.state.animalTypes[animal.parentName] = []
                }
            })
            res.data.payload.farmAnimals.map((animal) => {
                if(animal.parentName !== null) {
                    this.state.animalTypes[animal.parentName].push(animal.name)
                } else {
                    this.state.animalTypes[animal.name] = []
                }
            })
        })

        var opt = []

        for( var obj in this.state.animalTypes) {
            opt.push({value: obj, label: obj})
        }
        this.setState({
            options: opt
        })
       // console.log(this.state.animalTypes)
    }

    addNewFarmAnimalsType = (e) => {
        this.props.history.push({pathname : '/AnimalTypesCreator/'} )

    }

    selectorChanged = (e) => {
        this.setState({
            isSecondField: this.state.animalTypes[e.value].length !== 0,
            name: e.value
        })
        if(this.state.animalTypes[e.value].length !== 0) {
            var opt2 = []
            for(var i in this.state.animalTypes[e.value]) {
                opt2.push({label: this.state.animalTypes[e.value][i], value : this.state.animalTypes[e.value][i]})
            }
            this.setState({
                options2: opt2,
            })
        }
    }

    addButtonPressed = async (e) => {

        let config = {
            method: 'post',
            url: GetFarmAnimalsTypesPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = AddFarmAnimalsPath

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            animals: [{
                name: this.state.name,
                value: this.value
            }]
        }
        console.log(req)

        await axios.post(url, req, config).then((res) => {
            console.log(res)
            this.setState({
                isInvalid: !res.data.success
            })
        }).catch(err => {
            console.log(err)
        })

        this.setState({
            isFirst: false
        })
    }

    render() {
        if(this.state.isSecondField) {
            return (
                <Fragment>
                    <h1>Добавление сельскохозяйственных животных, птиц и пчел</h1>
                    <Form>
                        <div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.addNewFarmAnimalsType(e)}>+</button>

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
                            <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={this.state.isInvalid}/>
                        </div>
                    </Form>
                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h1>Добавление сельскохозяйственных животных, птиц и пчел</h1>
                <Form>
                    <div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-sm" onClick={e => this.addNewFarmAnimalsType(e)}>+</button>

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
                        <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={this.state.isInvalid}/>
                    </div>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить</button>
            </Fragment>
        )
    }
}