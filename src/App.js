import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions, userActions } from './actions';
import {HomePage} from './components/HomePage';
import LoginPage  from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {LogoutPage} from './components/LogoutPage';
import './app.css'


class Apps extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
          history.listen((location, action) => {

          });
    }


    render() {
        const { alert } = this.props;
        return (
          <Router history={history} >
              <div className="container">
                    < Route exact path = "/logout"
                    component = {
                      LogoutPage
                    }

                    />
                      <Route path = "/login"
                      component = {
                        LoginPage
                      }
                      />
                      <Route path = "/register"
                      component = {
                        RegisterPage
                      }
                      />
                      <PrivateRoute authed = {
                        this.props.authentication.loggedIn
                      }
                      exact
                      path = '/'
                      component = {
                        HomePage
                      }
                      />

              </div>
          </Router>
        );
    }
}

function mapStateToProps(state) {
    const {
      alert,
      authentication
    } = state;
    return {
        alert,
        authentication
    };
}

export  const App = connect(mapStateToProps, alertActions)(Apps);



