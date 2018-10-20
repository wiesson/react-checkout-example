import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userLogin, userLogout } from '../actions/user';
import { connect } from 'react-redux';
import Button from '../components/Button';
import '../components/forms/Form.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'yolo@example.com',
      password: 'yoloyolo',
      hasError: {
        email: false,
        password: false,
      },
    };
  }

  handleFormSubmit = ev => {
    ev.preventDefault();
    const credentials = this.state;
    this.props.userLogin(credentials);
  };

  handleFormFieldIsInvalid = name => () =>
    !this.state.hasError[name]
      ? this.setState({
          hasError: {
            ...this.state.hasError,
            [name]: true,
          },
        })
      : undefined;

  handleFormFieldIsValid = name => () =>
    this.state.hasError[name]
      ? this.setState({
          hasError: {
            ...this.state.hasError,
            [name]: false,
          },
        })
      : undefined;

  handleFormChange = name => event =>
    this.setState({ [name]: event.target.value });

  render() {
    const { email, password, hasError } = this.state;
    const { userIsAuthorized } = this.props.app;

    const errorStyles = {
      border: '1px solid red',
      color: 'red',
    };

    return (
      <div>
        <div className="form-control__group">
          <input
            className="form-control"
            style={hasError['email'] ? errorStyles : {}}
            type="text"
            required
            onChange={this.handleFormChange('email')}
            onInvalid={this.handleFormFieldIsInvalid('email')}
            onInput={this.handleFormFieldIsValid('email')}
            placeholder={'Email'}
            value={email}
            disabled={userIsAuthorized}
          />
        </div>
        <div className="form-control__group">
          <input
            className="form-control"
            type="password"
            style={hasError['password'] ? errorStyles : {}}
            required
            placeholder={'Password'}
            onChange={this.handleFormChange('password')}
            onInvalid={this.handleFormFieldIsInvalid('password')}
            onInput={this.handleFormFieldIsValid('password')}
            value={password}
            disabled={userIsAuthorized}
          />
        </div>

        {!userIsAuthorized ? (
          <Button
            type="button"
            disabled={userIsAuthorized}
            onClick={this.handleFormSubmit}
          >
            Login
          </Button>
        ) : (
          <Button
            type="button"
            disabled={!userIsAuthorized}
            onClick={this.props.userLogout}
          >
            Logout
          </Button>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  onSuccess: PropTypes.string,
};

const mapDispatchToProps = {
  userLogin,
  userLogout,
};
const mapStateToProps = state => ({
  app: state.app,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
