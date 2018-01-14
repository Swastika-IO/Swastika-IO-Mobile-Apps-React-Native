// @flow

import config from '../utils/APIConfig';

export const fetchWeatherData = () => (
  fetch(config.API_URL)
    .then((res) => res.json())
    .then((data) => data.currently)
    .catch((err) => err)
);
