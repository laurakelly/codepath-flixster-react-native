import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

const IMAGE_URI_PREFIX = 'https://image.tmdb.org/t/p/original';
const getPosterURI = path => `${IMAGE_URI_PREFIX}/${path}`;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 100,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 0,
  },
  text: {
    color: 'rgb(97, 97, 96)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

class MovieCellView extends React.Component {
  render() {
    const {
      title,
      overview,
      poster_path: posterPath,
    } = this.props.movie;

    return(
      <View style={styles.rowContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: getPosterURI(posterPath) }}
        />
        <View
          style={styles.textContainer}
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
    )
  }
}

MovieCellView.propTypes = propTypes;
export default MovieCellView;
