import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../actions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      let {
        key,
        value
      } = e;
      let {user} = this.state;
      user[key] = value;
      this.setState({
        ...this.state,
       user
      })
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.register(this.state.user);
      this.setState({
        ...this.state,
        submitted: true
      });

    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      if (nextProps.registration.registering !== this.props.registration.registering &&
        nextProps.registration.error !== this.props.registration.error &&
        !nextProps.registration.registering && nextProps.registration.error) {
        nextProps.error(nextProps.registration.error)
      }

      if (nextProps.registration.registered !== this.props.registration.registered &&
        nextProps.registration.user !== this.props.registration.user &&
        !nextProps.registration.registering) {
        nextProps.history.push('/login');
      }
    }


    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 offset-md-3 mt-5">
             {
               this.props.alert && this.props.alert.message ? < div className = {
                 this.props.alert.type
               } > {
                 this.props.alert.message
               } </div> : <div></div >
             }
                <h2>Register</h2>
                < form name = "form"
                onSubmit = {
                  this.handleSubmit
                } >
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        < input type = "text"
                        className = "form-control username"
                        name = "username"
                        onChange = {
                          (e) => this.handleChange({
                            key: 'username',
                            value: e.target.value
                          })
                        }
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        < input type = "password"
                        className = "form-control password"
                        name = "password"
                        onChange = {
                          (e) => this.handleChange({
                            key: 'password',
                            value: e.target.value
                          })
                        }
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps({alert, registration}) {
   return {
     alert,
     registration
   };
}

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(userActions.register(username, password)),
  error: message => dispatch(alertActions.error(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export { RegisterPage as TestRegisterPage };
