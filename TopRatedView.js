import React from 'react';
import {
  Navigator,
  TouchableOpacity,
  BackAndroid,
  Platform,
  Text,
} from 'react-native';
import MoviesView from './MoviesView';
import DetailMovieView from './DetailMovieView';

const routes = [
  { component: 'List', id: 0 },
  { component: 'Detail', id: 1 },
];

class TopRatedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedMovie: null };
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onPressMovie = this.onPressMovie.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onPressMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });

    this.navBackAndroid.push(routes[1]);
  }

  renderScene(route, navigator) {
    this.navBackAndroid = navigator;
    const { selectedMovie } = this.state;
    switch (route.component) {
        case 'List':
          return <MoviesView onPressMovie={this.onPressMovie} filterTopRated />
          break;
        case 'Detail':
          return <DetailMovieView movie={selectedMovie}/>
          break;
        default:
          break;
    }
  }

  navBackAndroid = null

  onBackAndroid() {
    if (this.navBackAndroid && this.navBackAndroid.getCurrentRoutes().length > 1) {
      this.navBackAndroid.pop();
      return true;
    }

    // exit app
    return false;
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.renderScene}
      />
    );
  }
}

export default TopRatedView;
