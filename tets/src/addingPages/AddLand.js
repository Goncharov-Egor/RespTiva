import React, {Component, Fragment} from "react";
import {Form, Modal} from "react-bootstrap";
import {
    AddBankBooksPath,
    AddLandPath,
    CancelResizdentPath,
    CreateLandCategoryPath,
    GetLandCategory
} from "../helpers/Path";
import axios from "axios";
import {Redirect} from "react-router-dom";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";
import Select from "react-select";
import moment from "moment";
import Prompter from "../errors/Prompter";

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export default class AddLand extends Component {

    state = {
        isInvalid: false,
        isFirst: true,
        landCategoriesOptions: [],
        landCategories: [],
        isCadastralNumberValid: true
    }

    componentDidMount = async () => {
        let config = {
            method: 'post',
            url: AddLandPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        let options = []

        await axios.get(GetLandCategory, config).then(resp => {
            console.log(resp.data.payload.categories)
            this.setState({
                landCategories: resp.data.payload.categories
            })
            this.state.landCategories.map(categ => {
                options.push({value: categ.name, label: categ.name})
            })

            this.setState({
                landCategoriesOptions: options
            })
        }).catch(err => {
            console.log(err)
        })

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

        if(!this.cadastralNumber) {
            this.setState({
                isCadastralNumberValid: false
            })
            return
        }

        const arr = this.cadastralNumber.split(":")
        let isValidCN = true

        arr.map(num => {
            isValidCN = isValidCN && (arr.length === 4) && isNumeric(num)
            console.log(isValidCN)
        })
        this.setState({
            isCadastralNumberValid: isValidCN
        })

        if(!isValidCN) return
        isValidCN = isValidCN && (arr[0].length === 2) && (arr[1].length === 2) && (arr[2].length === 6 || arr[2].length === 7) && (arr[3].length === 2 || arr[3].length === 3)

        this.setState({
            isCadastralNumberValid: isValidCN
        })

        if(!this.state.isCadastralNumberValid)
            return

        let getBDate = new Date(this.documentEndDate)
        let endDate = moment(getBDate).format('DD.MM.YYYY')

        const req = {
            bankBookName: this.props.match.params.bankBookName,
            householdBookName: this.props.match.params.householdBookName,
            kozhuunName: this.props.match.params.kozhuunName,
            cadastralNumber: this.cadastralNumber,
            document: this.document,
            documentEndDate: endDate,
            landCategory: this.landCategory,
            totalArea: this.totalArea
        }

        await axios.post(url, req, config)
            .then(res => {
                console.log(res)
                this.setState({
                    isInvalid: !res.data.success,
                    isFirst: false
                })
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: !this.state.isInvalid
        })
    }

    componentWillMount() {
        this.setState({
            isApply: false
        })
    }


    openModal = (e) => {
        this.setState({
            mod:true
        })
    }
    closeModal = (e) => {
        this.setState({
            mod:false
        })
    }

    createCategory = async (e) => {
        let config = {
            method: 'get',
            url: CreateLandCategoryPath,

            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        };

        const req = {
            name: this.categoryName
        }

        await axios.post(CreateLandCategoryPath, req, config).then(resp => {
            console.log(resp)
            this.setState({
                isInvalid: !resp.data.success,
                isFirst: false
            })
        }).catch(err => {
            console.log(err)
        })

        console.log(this.state.isInvalid)
        if(!this.state.isInvalid) {
            window.location.reload()
        }
    }

    selectCategory = (e) => {
        this.landCategory = e.value
    }


    render() {
        if(this.state.isApply) {
            let path = '/BankBookSpecification/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName
            return(<Redirect to={path}/>)
        }
        return(
            <Fragment>

                <Modal show={this.state.mod} onHide={e => this.closeModal(e)}>
                    <Modal.Header closeButton>
                        <h4>Добавить категорию</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <input placeholder="Название категории" onChange={e => this.categoryName = e.target.value} className="form-control" aria-describedby="basic-addon1"/>
                        <SuccessOrNotInformation isFirst={this.state.isFirst} isInvalid={this.state.isInvalid}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  type="button" className="btn btn-outline-success" onClick={e => this.createCategory(e)}>Добавить</button>
                    </Modal.Footer>
                </Modal>

                <h1>Добавление земельного участка</h1>
                <Form>
                    <Form.Group>



                        <div className="input-group mb-3" style={{marginTop: 30}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.cadastralNumber = e.target.value} name='cadastralNumber' placeholder='Кадастровый номер участка' className="form-control" aria-describedby="basic-addon1" />
                        </div>

                        <div className="alert alert-info" role="alert">
                            Кадастровый номер земельного участка в формате <strong>хх:хх:хххххх(х):хх(х)</strong>
                        </div>

                        <Prompter isInvalid={!this.state.isCadastralNumberValid} message="Неверный формат кадастрового номера"/>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.document = e.target.value} name='document' placeholder='Реквизиты документа, подтверждающие право на земельный участок' className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input type="date" onChange={e => this.documentEndDate = e.target.value} name='documentEndDate' placeholder='Срок окончания действия документа' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><button onClick={e => this.openModal(e)} type="button" className="btn btn-primary" style={{height:20, width:20, fontWeight:5}}/></span>
                        </div>
                        <div className="mb-3">

                            <Select placeholder="Категория земель"
                                    onChange={e=>this.selectCategory(e)}
                                    options={this.state.landCategoriesOptions}

                            />
                        </div>

                        {/*<div className="input-group mb-3">*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <span className="input-group-text" id="basic-addon1"><button onClick={e => this.openModal(e)} type="button" className="btn btn-primary" style={{height:20, width:20, fontWeight:5}}/></span>*/}
                        {/*    </div>*/}
                        {/*    <input onChange={e => this.landCategory = e.target.value} name='landCategory' placeholder='Категория земель' className="form-control" aria-describedby="basic-addon1"/>*/}
                        {/*</div>*/}

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"></span>
                            </div>
                            <input onChange={e => this.totalArea = e.target.value} name='totalArea' placeholder='Общая площадь земельного участка, занятая посевами и посадками в гектарах' className="form-control" aria-describedby="basic-addon1"/>
                        </div>

                    </Form.Group>
                </Form>
                <SuccessOrNotInformation isInvalid={this.state.isInvalid} isFirst={this.state.isFirst}/>
                <button style={{marginTop: 20}} type="submit" className="btn btn-primary" onClick={e => this.addButtonPressed(e)}>Добавить земельный участок</button>
            </Fragment>
        )
    }
}