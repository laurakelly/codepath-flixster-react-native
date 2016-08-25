import React, { PropTypes } from 'react';
import { ListView, ActivityIndicator, RefreshControl } from 'react-native';
import MovieCellView from './MovieCellView';

const propTypes = {
  onPressMovie: PropTypes.func.isRequired,
  fetchFunction: PropTypes.func.isRequired,
};

class MoviesView extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds,
      loading: true,
      refreshing: false,
      isDetailView: false,
      selectedMovie: null,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { fetchFunction } = this.props;

    fetchFunction()
    .then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loading: false,
      });
    })
    .catch(() => { this.setState({ loading: false }); });
  }

  onRefresh() {
    const { fetchFunction } = this.props;

    this.setState({ refreshing: true });

    fetchFunction()
    .then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        refreshing: false,
      });
    })
    .catch(() => this.setState({ refreshing: false }));
  }

  render() {
    const { loading, refreshing } = this.state;
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    );
  }
}

MoviesView.propTypes = propTypes;
export default MoviesView;
