import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {userActions, alertActions} from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false,
            error: false,
        };
         const {
           dispatch
         } = this.props;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      let {key, value} = e
     this.setState({...this.state, [key]: value})
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.login(this.state.username, this.state.password);
      this.setState({...this.state, submitted: true});

    }

 componentWillReceiveProps(nextProps) {
   console.log(nextProps)
   if (nextProps.authentication.loggingIn !== this.props.authentication.loggingIn &&
     nextProps.authentication.error !== this.props.authentication.error &&
     !nextProps.authentication.loggingIn && nextProps.authentication.error) {
    nextProps.error(nextProps.authentication.error)
   }

    if (nextProps.authentication.loggingIn !== this.props.authentication.loggingIn &&
      nextProps.authentication.loggedIn !== this.props.authentication.loggedIn &&
      !nextProps.authentication.loggingIn && nextProps.authentication.loggedIn) {
      nextProps.history.push('/')
    }

 }

 componentDidMount(){
       if (this.props.registration && this.props.registration.registered) {
        this.props.success('Registration Successfull');
           setTimeout(() =>{
             this.props.clear();
           }, 5000)
       }


 }
    render() {
        const { username, password, submitted } = this.state;

        return (
            <div className="col-md-6 offset-md-3 mt-5">
             {
              this.props.alert && this.props.alert.message ? < div className = {
                 this.props.alert.type
               } > {
                 this.props.alert.message
               } </div> : <div></div >
             }
                <h2>Login</h2>

                < form name = "form"
                onSubmit = { this.handleSubmit } >
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={(e) => this.handleChange({key: 'username', value: e.target.value })} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        < input type = "password"
                        className = "form-control password"
                        name = "password"
                        onChange = {
                            (e) => this.handleChange({
                              key: 'password',
                              value: e.target.value
                            }) } / >
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="row">
                        < div className = "form-group col-md-2" >
                          <button className = "btn btn-primary" > Login </button>
                          </div>
                          <div className="col-md-6 mt-2">
                          <Link to='/register'>Register</Link>
                          </div>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = ({alert, authentication, registration}) =>{
  return {
    alert,
    authentication,
    registration
  };
}
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(userActions.login(username, password)),
   success: message => dispatch(alertActions.success(message)),
   error: message => dispatch(alertActions.error(message)),
   clear: () => dispatch(alertActions.clear()),
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export { LoginPage as TestLoginPage };
