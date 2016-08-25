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
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  image: {
    alignSelf: 'stretch',
    flex: 0.7,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    color: 'rgb(97, 97, 96)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

function DetailMovieView({ movie }) {
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

  return (
    <View style={styles.container}>
      {backdropPath &&
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: getPosterURI(imagePath) }}
        />
      }

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
  );
}

DetailMovieView.propTypes = propTypes;

export default DetailMovieView;
