import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      arraymusic: [],
      inf: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicsList = await getMusics(id);
    const inf = musicsList[0];
    this.setState({ arraymusic: musicsList.slice(1), inf });
  }

  render() {
    const { arraymusic, inf } = this.state;
    const { artistName, collectionName } = inf;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <div>
            <h2 data-testid="artist-name">{artistName}</h2>
            <h3 data-testid="album-name">{collectionName}</h3>
            <div>
              <div>
                {arraymusic.map((music, i) => (
                  <div key={ i }>
                    <audio
                      data-testid="audio-component"
                      src={ music.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <span>{music.trackName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any),
};

Album.defaultProps = {
  id: '', match: '',
};

export default Album;
