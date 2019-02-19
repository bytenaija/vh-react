import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {

    render() {
        return (
            <div className="col-md-6 offset-md-3, mt-5">
            <div >
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                <Link to='/logout' > Logout</Link>
                </p>
                </div>
            </div>
        );
    }
}
