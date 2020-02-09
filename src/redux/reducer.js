import {
  FETCH_IS_LOADING,
  FETCH_IS_SUCCSESS,
  FETCH_IS_ERROR,
  ADD_VALUE
} from './action-type';

const InitState = {
  films: [],
  isLoading: true,
  isError: false,
  value: ''
};

const FilmReducer = (state = InitState, { payload, type }) => {
  switch (type) {
    case FETCH_IS_SUCCSESS:
      return { ...state, films: payload };
    case FETCH_IS_LOADING:
      return { ...state, isLoading: payload };
    case FETCH_IS_ERROR:
      return { ...state, isError: payload };
    case ADD_VALUE:
      return {
        ...state,
        value: payload,
        films: state.films.filter((film) => film.title.includes(payload))
      };
    default:
      return state;
  }
};

export default FilmReducer;
