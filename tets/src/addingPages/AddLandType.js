import React, {Component} from "react";
import {AddLandPath, AddLandTypePath, GetLandsPath, GetLendTypesPath} from "../helpers/Path";
import axios from "axios";

export default class AddLandType extends Component {

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
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            isApply: true
        })
    }

    render() {
        return (
            <h1>Salam voram</h1>
        )
    }
}