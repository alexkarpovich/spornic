import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../actions/auth';
import Signup from '../components/signup';

class SignupContainer extends Component {
  getChildContext() {
    return {
      actions: this.props.actions,
    }
  }

  componentDidMount() {
    this.redirectLoggedIn(this.props.auth.isLoggedIn);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectLoggedIn(nextProps.auth.isLoggedIn);
  }

  redirectLoggedIn(isLoggedIn) {
    const {routerActions} = this.context;

    if (isLoggedIn) {
      routerActions.push('/')
    }
  }

  render() {
    return (
      <div className="signup-container">
        <Signup />
      </div>
    )
  }
}

SignupContainer.childContextTypes = {
  actions: PropTypes.object.isRequired,
};

SignupContainer.contextTypes = {
  routerActions: PropTypes.object.isRequired,
};

SignupContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators({
      ...AuthActions
    }, dispatch)
  }),
)(SignupContainer);
