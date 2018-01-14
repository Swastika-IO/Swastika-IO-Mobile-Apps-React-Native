// @flow
import { fetchDataError } from './fetch-data-error';
import { fetchDataRequest } from './fetch-data-request';
import { fetchDataSuccess } from './fetch-data-success';
import config from '../../utils/APIConfig';


export const fetchData = (data) => ((dispatch) => {
  dispatch(fetchDataRequest());
  return fetch(config.API_URL)
    .then((res) => res.json())
    .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo)))
    .catch((err) => err);
}
);

export const fetchDataArticles = (data) => ((dispatch) => {
  dispatch(fetchDataRequest());
  return fetch(config.ARTICLES_URL)
    .then((res) => res.json())
    .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo)))
    .catch((err) => err);
}
);
