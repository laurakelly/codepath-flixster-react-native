const IMAGE_URI_PREFIX = 'https://image.tmdb.org/t/p/original';

export function getPosterURI(path) {
  return `${IMAGE_URI_PREFIX}/${path}`;
}
