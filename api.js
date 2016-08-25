import mockData from './mockData';

const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const URL_PREFIX = 'https://api.themoviedb.org/3/movie';
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`;
const TOP_RATED_URL = `${URL_PREFIX}/top_rated?api_key=${API_KEY}`;
const isError = false;

export function fetchMoviesMock() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject({ msg: 'network error' });
      }
      resolve(mockData.results);
    }, 1000);
  });
}

function fetchURL(url) {
  return fetch(url)
          .then(response => response.json())
          .then(response => response.results);
}

export function fetchTopRated() {
  return fetchURL(TOP_RATED_URL);
}

export function fetchNowPlaying() {
  return fetchURL(NOW_PLAYING_URL);
}
