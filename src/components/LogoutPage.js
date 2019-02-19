import React from 'react';

import { connect } from 'react-redux';

import { history } from '../helpers';
import { userActions } from '../actions';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    const {
      dispatch
    } = this.props;



    history.listen((location, action) => {

    });

  }

  componentDidMount() {
    console.log(this)
    console.log(this.props)
    this.props.dispatch(userActions.logout())
      history.push('/')
  }

  render() {
    return null
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export const LogoutPage = connect(mapStateToProps, mapDispatchToProps)(Logout)