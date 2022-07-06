import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      Btndisabled: true,
      isLoading: false,
      loaded: false,
    };
  }

  handleBtnSave = (event) => {
    const minChar = 3;
    if (event.target.value.length >= minChar) {
      this.setState({
        Btndisabled: false,
        userName: event.target.value,
      });
    }
  }

  login = async () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false, loaded: true });
  }

  render() {
    const { isLoading, Btndisabled, loaded } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : null}
        {loaded ? <Redirect to="/search" /> : null}
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleBtnSave }
            placeholder="Digite seu nome"
          />
          <input
            type="button"
            disabled={ Btndisabled }
            data-testid="login-submit-button"
            name="button=login"
            onClick={ this.login }
            value="Entrar"
          />
        </form>
      </div>
    );
  }
}

export default Login;
