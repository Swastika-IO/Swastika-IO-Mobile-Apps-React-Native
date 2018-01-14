// @flow
import { fetchWeatherData } from '../../services/http-requests';
import { fetchDataError } from './fetch-data-error';
import { fetchDataRequest } from './fetch-data-request';
import { fetchDataSuccess } from './fetch-data-success';

export const fetchData = () => (
  (dispatch) => {
    console.log('param.data ');
    dispatch(fetchDataRequest());
    fetchWeatherData()
      .then((dataInfo) => dispatch(fetchDataSuccess(dataInfo)))
      .catch((err) => dispatch(fetchDataError(err)));
    return { type: 'ADD_TODO', text: 'Go to swimming pool' };
  }
);
