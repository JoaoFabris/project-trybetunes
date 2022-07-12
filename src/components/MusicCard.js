import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCards extends React.Component {
  state = {
    checked: false,
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false });
    const { track } = this.props;
    const listSong = favoriteSongs.some((song) => song.trackId === track.trackId);
    if (listSong) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  favsong = async () => {
    const { track } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      await addSong(track);
    }
    this.setState({ loading: false });
  }

  InputChange = ({ target }) => {
    const { name } = target;
    const value = target.type
    === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.favsong());
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="containerMusicCard">
        { loading ? <Loading /> : (
          <div>
            <p>{ trackName }</p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento!
              <code>audio</code>
            </audio>
            <label htmlFor="checkboxFav">
              Favorita
              <input
                id="checkboxFav"
                data-testid={ `checkbox-music-${trackId}` }
                name="checked"
                type="checkbox"
                onChange={ this.InputChange }
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
