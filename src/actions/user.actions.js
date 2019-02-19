import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';



 const login = (username, password) => async dispatch =>{
    // return the promise using fetch which adds to localstorage on resolve
    dispatch(request({username, password}));
    userService.login(username, password).then(user =>{

      dispatch(success(user));
      history.push('/');
    }).catch(err =>{
      dispatch(failure(err));
    });

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
  console.log('dispatch')
  if (userService.logout()){
   return {
      type: userConstants.LOGOUT
    };

  }
}

const register = (user) =>async dispatch => {
  console.log(user)
    // return the promise using fetch which dispatches appropriately
    dispatch(request(user))
    userService.register(user).then(user =>{
      dispatch(success(user))
    }).catch(err =>{
      dispatch(failure(err))
    })

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


export const userActions = {
  login,
  logout,
  register
};