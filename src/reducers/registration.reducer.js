import { userConstants } from '../constants';

const initialState = {
  registering: false,
  registered: false,
  user: null,
  error: false
}

export function registration(state = initialState, action) {
  
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true, user: action.user, registered: false };
    case userConstants.REGISTER_SUCCESS:
      return {registering: false, user: action.user, registered: true};
    case userConstants.REGISTER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state
  }
}