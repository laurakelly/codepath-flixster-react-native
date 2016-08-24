import React from 'react';
import { ListView, Text } from 'react-native';
import MovieCellView from './MovieCellView';
import { fetchMovies } from './api';

class MoviesView extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds,
      loading: true,
    };
  }

  componentDidMount() {
    fetchMovies()
    .then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loading: false,
      });
    })
    .catch(error => {
      console.log(error.msg);
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <Text style={{ marginTop: 20 }}>Loading...</Text>;
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={movie => <MovieCellView movie={movie} />}
        style={{ marginTop: 20 }}
      />
    );
  }
}

export default MoviesView;
