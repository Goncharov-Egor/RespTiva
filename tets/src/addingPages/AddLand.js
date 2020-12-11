import React, {Component, Fragment} from "react";
import {Form} from "react-bootstrap";
import {AddBankBooksPath, AddLandPath} from "../helpers/Path";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class AddLand extends Component {

    componentDidMount() {

    }

    addButtonPressed = async (e) => {
        let config = {
            method: 'post',
            url: AddLandPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let url = AddLandPath

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            cadastralNumber: this.cadastralNumber,
            document: this.document,
            documentEndDate: this.documentEndDate,
            landCategory: this.landCategory,
            totalArea: this.totalArea
        }

        await axios.post(url, req, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: true
        })
    }

    componentWillMount() {
        this.setState({
            isApply: false
        })
    }

    render() {
        if(this.state.isApply) {
            let path = '/BankBookSpecification/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName
            return(<Redirect to={path}/>)
        }
        return(
            <Fragment>
                <h1>Добавление члена хозяйства</h1>
                <Form>
                    <Form.Group>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.document = e.target.value} name='document' placeholder='Реквизиты документа' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.documentEndDate = e.target.value} name='documentEndDate' placeholder='Срок окончания действия документа' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.cadastralNumber = e.target.value} name='cadastralNumber' placeholder='Кадастровый номер участка' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.landCategory = e.target.value} name='landCategory' placeholder='Категория земель' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.totalArea = e.target.value} name='totalArea' placeholder='Общую площадь всей земли, занятой посевами и посадками' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                    </Form.Group>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить члена хозяйства</button>
            </Fragment>
        )
    }
}