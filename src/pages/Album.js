import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCards from '../components/MusicCard';

class Album extends React.Component {
  state = {
    array: [],
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ loading: false, array: [...musics] });
  }

  render() {
    const { array, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3>Album</h3>
        { loading ? <Loading /> : (
          <div>
            <p data-testid="artist-name">{ array[0].artistName }</p>
            <p data-testid="album-name">{ array[0].collectionName }</p>
            { array.filter((a) => a.trackId)
              .map((a) => (
                <MusicCards
                  key={ a.trackId }
                  trackName={ a.trackName }
                  previewUrl={ a.previewUrl }
                  trackId={ a.trackId }
                  track={ a }
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
