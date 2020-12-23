import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {AddLandPath, CreateAnimalTypePath} from "../helpers/Path";
import axios from "axios";

export default class AnimalTypesCreator extends Component {

    state = {
        isCheckbox: false
    }

    checkboxChanged = e => {
        this.setState({
            isCheckbox: e.target.checked
        })
    }

    addButtonPressed = (e) => {
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
                console.log(res)
            }).catch( err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.name2 = ""
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
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Из них .
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
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Из них .
                                    <input type="checkbox" checked={isCheckbox}
                                           onChange={e => this.checkboxChanged(e)}/></span>
                            </div>
                            <input onChange={e => this.name = e.target.value} name='name' placeholder='Вид'
                                   className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.name2 = e.target.value} name='name' placeholder='Подвид'
                                   className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить
                </button>
            </Fragment>
        )
    }

}