import React from 'react';
import { ListView, Text } from 'react-native';
import MovieCellView from './MovieCellView';
import { fetchMoviesMock } from './api';
import DetailMovieView from './DetailMovieView';

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds,
      loading: true,
      isDetailView: false,
      selectedMovie: null,
    };

    this.onPressMovie = this.onPressMovie.bind(this);
  }

  componentDidMount() {
    fetchMoviesMock()
    .then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loading: false,
      });
    })
    .catch(() => {
      this.setState({ loading: false });
    });
  }

  onPressMovie(movie) {
    this.setState({
      isDetailView: true,
      selectedMovie: movie,
    });
  }

  render() {
    const { loading, isDetailView, selectedMovie } = this.state;

    if (loading) {
      return <Text style={{ marginTop: 20 }}>Loading...</Text>;
    }

    if (isDetailView && selectedMovie) {
      console.log('rendering detail');
      return <DetailMovieView movie={selectedMovie} />;
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(movie) => <MovieCellView movie={movie} onPress={this.onPressMovie} />}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default MoviesView;
