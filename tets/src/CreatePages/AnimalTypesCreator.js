import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {AddLandPath, CreateAnimalTypePath, GetFarmAnimalsTypesPath} from "../helpers/Path";
import axios from "axios";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";

export default class AnimalTypesCreator extends Component {

    state = {
        isCheckbox: false,
        options: [],
        animalTypes: {},
        isFirst: true,
        isValid: true
    }

    checkboxChanged = e => {
        this.setState({
            isCheckbox: e.target.checked
        })
    }

    addButtonPressed =  (e) => {
        let url = CreateAnimalTypePath

        let config = {
            method: 'post',
            url: CreateAnimalTypePath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        var req

        if(this.name2 === "") {
            req = {
                name: this.name
            }
        } else {
            req = {
                name: this.name2,
                parentName: this.name
            }
        }

        console.log(req)

        axios.post(url, req, config)
            .then( res =>{
                this.setState({
                    isValid: res.data.success,
                    isFirst: false
                })
                console.log(res)
            }).catch( err => {
            console.log(err)
        })
    }

    componentDidMount = async () => {

        this.name2 = ""

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

    selectorChanged = (e) => {
        this.name = e.value
    }

    render() {
        const {isCheckbox} = this.state;
        console.log(isCheckbox)
        if(!isCheckbox) {
            return (
                <Fragment>
                    <h1>Добавление типов сельскохозяйственных животных, птиц и пчел</h1>
                    <Form>
                        <div>
                            <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={!this.state.isValid}/>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Является ли подвидом .
                                    <input type="checkbox" checked={isCheckbox}
                                           onChange={e => this.checkboxChanged(e)}/></span>
                                </div>
                                <input onChange={e => this.name = e.target.value} name='name' placeholder='Вид'
                                       className="form-control" aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                    </Form>
                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить
                    </button>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h1>Добавление типов сельскохозяйственных животных, птиц и пчел</h1>
                <Form>
                    <div>
                        <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={!this.state.isValid}/>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Является ли подвидом .
                                    <input type="checkbox" checked={isCheckbox}
                                           onChange={e => this.checkboxChanged(e)}/></span>
                            </div>
                            <input onChange={e => this.name2 = e.target.value} name='name' placeholder='Подвид'
                                   className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="mb-3">
                            <Select
                                placeholder='Вид'
                                options={this.state.options}
                                onChange={e => this.selectorChanged(e)}
                            />
                        </div>

                        {/*<div className="input-group mb-3">*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <span className="input-group-text" id="basic-addon1"></span>*/}
                        {/*    </div>*/}
                        {/*    <input onChange={e => this.name = e.target.value} name='name' placeholder='Вид'*/}
                        {/*           className="form-control" aria-describedby="basic-addon1"/>*/}
                        {/*</div>*/}
                    </div>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить
                </button>
            </Fragment>
        )
    }

}