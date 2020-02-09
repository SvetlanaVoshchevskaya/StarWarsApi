import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import FilmReducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
  FilmReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
