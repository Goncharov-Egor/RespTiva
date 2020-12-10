import React, {Fragment, useState} from 'react';
import {Form} from "react-bootstrap";
import axios from "axios";
import {LoginPath, UsersListPath} from "../helpers/Path";

export const UsersList =  () => {
    const url = UsersListPath
    const user = {
        fio: String,
        login: String,
        role: String
    }
    var config = {
        method: 'get',
        url: UsersListPath,

        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzIiwicm9sZSI6Ik9SRElOQVJZIiwiZXhwIjoxNjA3NTg2NjQxfQ.mHYdANSotQfPwlqBsm_b41UuNIyrnaSYk2L-Gj8DaihoZFWfiKEua8tRdl8uzJu1505aARX9jO1rgOWcprGbuQ'
        },
        data : user
    };
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailHandler = (e) => {setEmail(e.target.value)}
    const [users, setUsers] = useState([user])

    var Users = [user]

    var resp = axios.get(url, config).then((respnse) => {
        Users = (JSON.parse(JSON.stringify(respnse)).data.payload.employees)
        setUsers(Users)
        //console.log(Users)
    })
    //Users = (JSON.parse(JSON.stringify(resp)).data.payload.employees)
    //console.log(users[0].fio)
    return (
        <ul class="list-group">
            {
               users.map((empl) => {
                    return <li className="list-group-item">{empl.fio} {empl.login}</li>
                })

            }

        </ul>
    )
}