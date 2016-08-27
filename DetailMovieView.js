import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { BACKDROP_PLACEHOLDER } from './imageConstants';
import { getPosterURI } from './imageUtils';

const propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  layout: PropTypes.string,
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'flex-start',
  },
  image: {
    alignSelf: 'stretch',
  },
  portraitImage: {
    flex: 0.7,
  },
  landscapeImage: {
    flex: 0.8,
  },
  container: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  text: {
    color: 'rgb(97, 97, 96)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  portrait: {
    flex: 1,
  },
  landscape: {
    flex: 0.2,
  },
});

class DetailMovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: 'portrait' };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(e) {
    const { width, height } = e.nativeEvent.layout;
    if (width > height) {
      this.setState({ layout: 'landscape' });
    } else {
      this.setState({ layout: 'portrait' });
    }
  }

  render() {
    const { movie } = this.props;
    const { layout } = this.state;
    const {
      title,
      overview,
      backdrop_path: backdropPath,
      poster_path: posterPath,
    } = movie;

    let imagePath;
    if (backdropPath) {
      imagePath = backdropPath;
    } else if (posterPath) {
      imagePath = posterPath;
    } else {
      imagePath = BACKDROP_PLACEHOLDER;
    }

    const imageLayout = () => layout === 'landscape' ? styles.landscapeImage : styles.portraitImage;
    const layoutStyles = () => layout === 'landscape' ? styles.landscape : styles.portrait;

    return (
      <View
        style={styles.container}
        onLayout={this.onLayoutChange}
      >
        {backdropPath &&
          <Image
            resizeMode="contain"
            style={[styles.image, imageLayout()]}
            source={{ uri: getPosterURI(imagePath) }}
          />
        }

        <View
          style={[styles.textContainer, layoutStyles()]}
        >
          <Text
            style={[styles.text, styles.title]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={styles.text}
            numberOfLines={3}
          >
            {overview}
          </Text>
        </View>
      </View>
    );
  }
}

DetailMovieView.propTypes = propTypes;

export default DetailMovieView;
