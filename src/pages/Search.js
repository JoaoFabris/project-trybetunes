import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.validadeBtn = this.validadeBtn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      searchName: '',
      artist: '',
      disableBtn: true,
      array: [],
      searching: false,
      loading: false, // searchLoading

    };
  }

  handleSubmit(event) {
    const { searchName } = this.state;
    this.setState({ loading: true, artist: searchName, searching: true }, async () => {
      const array = await searchAlbumsAPI(searchName);
      this.setState({ loading: false, array, searchName: '' });
    });
    event.preventDefault();
  }

  onChangeInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeBtn());
  }

  loaded = () => {
    const { loading } = this.state;
    return (loading ? <Loading className="search-loading" /> : null);
  }

  results() {
    const { array, artist } = this.state;
    return (
      array.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
        : (
          <div>
            <h4>
              { `Resultado de álbuns de: ${artist}` }
            </h4>
            <div>
              {array.map(
                (a) => (
                  <div key={ a.collectionId }>
                    <img src={ a.artworkUrl100 } alt={ a.collectionName } />
                    <Link
                      to={ `/album/${a.collectionId}` }
                      data-testid={ `link-to-album-${a.collectionId}` }
                    >
                      {a.collectionName}
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        )
    );
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
    const {
      searchName,
      disableBtn,
      searching,
    } = this.state;
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
            type="submit"
            data-testid="search-artist-button"
            disabled={ disableBtn }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {searching && this.loaded()}
          {searching && this.results()}
        </div>
      </div>
    );
  }
}

export default Search;
