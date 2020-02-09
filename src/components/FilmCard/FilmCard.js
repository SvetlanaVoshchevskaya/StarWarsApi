import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import url from '../../services/url';
import Loader from '../Loader/Loader';
import s from './FilmCard.module.css';

class FilmCard extends Component {
  state = { film: [], characters: [] };

  componentDidMount() {
    const id = +this.props.match.params.id;
    const filtredFilm = this.props.films.find((film, idx) => {
      if (idx === id) {
        return film;
      }
    });
    this.setState(
      {
        film: filtredFilm
      },
      () => {
        this.fetchExtraParam(this.state.film.characters);
      }
    );
  }

  fetchExtraParam = (arr) => {
    const request = arr.map((el) => axios.get(el));
    Promise.all(request)
      .then((data) => this.setState({ characters: data }))
      .catch((error) => error);
  };

  render() {
    const { film, characters } = this.state;
    const { isLoading } = this.props;
    return (
      <>
        {isLoading && <Loader />}
        {film && (
          <div>
            <h2 className={s.filmTitle}>{film.title} </h2>
            <div className={s.mainDetail}>
              <div>
                Episode:<span className={s.filmDetail}> {film.episode_id}</span>
              </div>
              <div>
                Date of release:
                <span className={s.filmDetail}>{film.release_date} </span>{' '}
              </div>
              <div>
                Director: <span className={s.filmDetail}> {film.director}</span>
              </div>
              <div>
                Producer:<span className={s.filmDetail}>{film.producer} </span>{' '}
              </div>
              <div>
                Characters:
                {characters.map((character) => (
                  <span key={character.data.name} className={s.extraDetails}>
                    {character.data.name},
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const MSTP = (state) => ({
  isLoading: state.isLoading,
  films: state.films
});
export default connect(MSTP)(FilmCard);
