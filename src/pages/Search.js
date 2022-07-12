import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.validadeBtn = this.validadeBtn.bind(this);
    this.state = {
      searchName: '',
      disableBtn: true,
    };
  }

  onChangeInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeBtn());
  }

  validadeBtn() {
    const { searchName } = this.state;
    const lim = 2;
    if (searchName.length >= lim) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  render() {
    const { searchName, disableBtn } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search"> </div>
        <form>
          <label htmlFor="searchName">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchName"
              placeholder="Nome do artista"
              value={ searchName }
              onChange={ this.onChangeInput }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disableBtn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
