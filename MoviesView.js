import React, { PropTypes } from 'react';
import { ListView, ActivityIndicator } from 'react-native';
import MovieCellView from './MovieCellView';
import { fetchMoviesMock } from './api';

const propTypes = {
  onPressMovie: PropTypes.func.isRequired,
  filterTopRated: PropTypes.bool,
};

const defaultProps = {
  filterTopRated: false,
};

function processMovies(shouldFilter, movies) {
  console.log("filter: ", shouldFilter);
  console.log(movies.filter((movie) => movie.vote_average > 5));
  if (shouldFilter) return movies.filter((movie) => movie.vote_average > 5);
  return movies;
}

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
  }

  componentDidMount() {
    const { filterTopRated } = this.props;
    fetchMoviesMock()
    .then(movies => processMovies(filterTopRated, movies))
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


  render() {
    const { loading } = this.state;
    const { onPressMovie } = this.props;

    if (loading) {
      return (
        <ActivityIndicator
          animating
          size={'large'}
          style={{ flex: 1 }}
        />
      );
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(movie) => <MovieCellView movie={movie} onPress={() => onPressMovie(movie)} />}
        style={{ marginTop: 20 }}
      />
    );
  }
}

MoviesView.propTypes = propTypes;
MoviesView.defaultProps = defaultProps;
export default MoviesView;
