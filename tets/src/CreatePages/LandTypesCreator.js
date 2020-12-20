import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import {AddLandPath, CreateLandTypePath} from "../helpers/Path";
import axios from "axios";

export default class LandTypesCreator extends Component {

    buttonClicked = async () => {
        let config = {
            method: 'post',
            url: AddLandPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = CreateLandTypePath
        const req = {
            name: this.landType
        }

        axios.post(url, req, config)
            .then( res =>{
                console.log(res)
            }).catch( err => {
                console.log(err)
        })
    }

    render() {
        return (
            <Fragment>
                <h1>Добавление новой площади по виду земель</h1>
                <Form>
                    <Form.Group>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.landType = e.target.value} name='landType' placeholder='Введите название добавляемой площади по виду земель' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                    </Form.Group>
                </Form>
                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-primary" onClick={e => this.buttonClicked(e)}>Добавить</button>
                </div>
            </Fragment>
        )
    }
}