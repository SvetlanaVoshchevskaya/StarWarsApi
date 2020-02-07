import React, { Component } from 'react';
import axios from 'axios';
import url from '../services/url';
import Loader from '../Loader/Loader';
import s from './FilmCard.module.css';

class FilmCard extends Component {
  state = { film: null, characters: [] };

  componentDidMount() {
    const id = +this.props.match.params.id + 1;
    this.fetchFilmDetail(id);
  }

  fetchFilmDetail = async (id) => {
    await axios
      .get(url + id)
      .then((data) => {
        this.setState({ film: data.data }, () => {
          this.fetchExtraParam(this.state.film.characters);
        });
      })
      .catch((error) => error);
  };

  fetchExtraParam = (arr) => {
    const request = arr.map((el) => axios.get(el));
    Promise.all(request)
      .then((data) => this.setState({ characters: data }))
      .catch((error) => error);
  };

  render() {
    const { film, characters } = this.state;
    return (
      <>
        {!film && <Loader />}
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
export default FilmCard;
