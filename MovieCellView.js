import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { POSTER_PLACEHOLDER } from './imageConstants';
import { getPosterURI } from './imageUtils';

const propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

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
  },
});

class MovieCellView extends React.Component {
  render() {
    const { movie, onPress } = this.props;
    const {
      title,
      overview,
      poster_path: posterPath,
    } = movie;

    const imagePath = posterPath ? posterPath : POSTER_PLACEHOLDER;

    return (
      <TouchableOpacity onPress={() => onPress(movie)}>
        <View
          style={styles.rowContainer}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: getPosterURI(imagePath) }}
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
      </TouchableOpacity>
    );
  }
}

MovieCellView.propTypes = propTypes;

export default MovieCellView;
