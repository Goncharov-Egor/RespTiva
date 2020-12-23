import React, {Component} from "react";
import {Form} from "react-bootstrap";

export default class FarmAnimals extends Component {

    componentDidMount() {

    }

    addButtonClickedd = (e) => {
        console.log({pathname : '/AddFarmAnimals/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName })
        this.props.history.push({pathname : '/AddFarmAnimals/' + this.props.match.params.householdBookName + '/' + this.props.match.params.kozhuunName + '/' + this.props.match.params.bankBookName } )
    }

    render() {
        return(
            <Form>
                <h2>-</h2>
                <h2>Сельскохозяйственные животные, птицы и пчелы</h2>
                <ul className="list-group">
                    <button type="submit" className="btn btn-primary" onClick={e => this.addButtonClickedd(e)}>Добавить xt</button>

                </ul>

            </Form>
        )
    }
}