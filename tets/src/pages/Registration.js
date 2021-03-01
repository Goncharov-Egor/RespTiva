import React, {Fragment, useState} from 'react';
import {Form} from "react-bootstrap";
import axios from "axios";
import {RegistrationPath} from '../helpers/Path'
import Select from "react-select";
import SuccessOrNotInformation from "../errors/SuccessOrNotInformation";

const options = [{ value: "Администратор", label: "Администратор" }, { value: "Пользователь", label: "Пользователь" }]

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const [role, setRole] = useState('')

    const emailHandler = (e) => {setEmail(e.target.value)}
    const passwordHandler = (e) => {setPassword(e.target.value)}
    const nameHandler = (e) => {setName(e.target.value)}
    const surnameHandler = (e) => {setSurname(e.target.value)}
    const middlenameHandler = (e) => {setMiddlename(e.target.value)}
    const isValidHandler = (e) => {setIsValid(e)}
    const isFirstHandler = (e) => {setIsFirst(e)}
    const roleHandler = (e) => (setRole(e.value))

    const registrationButtonPressed = async () => {

        const localRole = role === "Администратор" ? "ADMIN" : "ORDINARY"

        console.log(localRole, role === "Администратор", role)

        const user = {
            firstName: name,
            lastName: surname,
            login: email,
            middleName: middlename,
            password: password,
            role: localRole
        }

        console.log(user)
        var config = {
            method: 'post',
            url: RegistrationPath,
            headers: {
                'Content-Type': 'application/json'
            },
            data : user
        };

        const url = RegistrationPath
        await axios.post(url, user, config)
            .then(response => {
                console.log(response.request)
                console.log(response.status)
                console.log(response)
                console.log(response.data)
                isValidHandler(response.data.success)
                isFirstHandler(false)
            })
    }
    if(localStorage.getItem('role') !== "ADMIN") {
        return (
            <h3>
                Недостаточно прав
            </h3>
        )
    }

    return (
        <Fragment>
            <h1>Регистрация</h1>
            <Form>
                <Form.Group>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => nameHandler(e)} name='name' placeholder='Имя' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => surnameHandler(e)} name='surname' placeholder='Фамилия' className="form-control" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => middlenameHandler(e)} name='middleName' placeholder='Отчество' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="mb-3">
                        <Select placeholder="Роль"
                                onChange={ e => roleHandler(e) }
                                options={options}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => emailHandler(e)} name='email' placeholder='Email' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"></span>
                        </div>
                        <input onChange={e => passwordHandler(e)} name='password' type='password' placeholder='Пароль' className="form-control" aria-describedby="basic-addon1"/>
                    </div>

                    <SuccessOrNotInformation isFirst={isFirst} isInvalid={!isValid}/>

                </Form.Group>
            </Form>
            <button type="submit" className="btn btn-primary" onClick={registrationButtonPressed}>Зарегистрироваться</button>
        </Fragment>
    )
}