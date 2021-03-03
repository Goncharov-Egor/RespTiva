import React, {Fragment} from 'react';

export const Home = () => {

    if(localStorage.getItem('token')) {
        window.location.href='/HouseholdBooks'
    } else {
        window.location.href= '/login'
    }

    if(localStorage.getItem('role')) {
        return (
            <Fragment>
                <h1>{localStorage.getItem('role')}</h1>
            </Fragment>
        )
    }
    return (

        <Fragment>
            <h1>Главная страница</h1>
        </Fragment>
    )
}