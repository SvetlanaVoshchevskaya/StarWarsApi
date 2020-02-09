import { axiosData } from '../services/request';

import {
  FETCH_IS_LOADING,
  FETCH_IS_SUCCSESS,
  FETCH_IS_ERROR,
  ADD_VALUE
} from './action-type';

export const fetchIsError = (bool) => ({ type: FETCH_IS_ERROR, payload: bool });

export const fetchIsLoading = (bool) => ({
  type: FETCH_IS_LOADING,
  payload: bool
});
export const fetchIsSuccsess = (items) => ({
  type: FETCH_IS_SUCCSESS,
  payload: items
});
export const addValue = (value) => ({ type: ADD_VALUE, payload: value });

export const fetchFilms = (url) => (dispatch) => {
  dispatch(fetchIsLoading(true));
  axiosData(url)
    .then((data) => {
      dispatch(fetchIsLoading(false));
      dispatch(fetchIsSuccsess(data.data.results));
    })
    .catch(() => dispatch(fetchIsError(true)));
};
