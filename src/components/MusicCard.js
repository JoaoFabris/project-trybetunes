import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCards extends React.Component {
  state = {
    checked: false,
    inloading: false,
  }

  addFavoriteSong = async () => {
    const { track } = this.props;
    const { checked } = this.state;
    this.setState({ inloading: true });
    if (checked) {
      await addSong(track);
    }
    this.setState({ inloading: false });
  }

  handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.addFavoriteSong());
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { inloading, checked } = this.state;
    return (
      <div className="containerMusicCard">
        { inloading ? <Loading /> : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="checkboxFav">
              Favorita
              <input
                id="checkboxFav"
                data-testid={ `checkbox-music-${trackId}` }
                name="checked"
                type="checkbox"
                onChange={ this.handleInputChange }
                value={ trackId }
                checked={ checked }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCards.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.objectOf.isRequired,
};

export default MusicCards;
