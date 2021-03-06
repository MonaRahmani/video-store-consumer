import { useEffect, useState } from 'react';
import Movie from './Movie.js'
import Popup from './Popup.js'
import Navbar from './Navbar.js';
import './MovieLibrary.css';
import './MovieSearchResults.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const MovieLibrary = props => {
  const [movies, setMovies] = useState([]);
  const [clickedMovie, setClickedMovie] = useState(null);
  const [alert, setAlert] = useState(null);
  const url = props.url + '/videos';

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        setAlert(error.message);
      });
  }, []);

  const moreInfoOnClick = movie => {
    setClickedMovie(movie);
  };

  const exitPopup = () => {
    setClickedMovie(null);
  };

  const addMovieRental = rentalMovie => {
    props.selectMovieCallback(rentalMovie);
    setAlert(`Selected ${rentalMovie.title} for rental transaction.`);
  };

  return (
    <div>
      <Navbar customer={props.customer} movie={props.movie} checkoutCallback={props.checkoutCallback} />
      <div className='movie-library-container'>
        { alert ? <div className='movie-library-alert'>{alert}</div> : '' }
        { clickedMovie 
          ? <Popup 
              clickedMovieInfo={clickedMovie}
              exitCallbackFn={exitPopup}
              addMovieRentalCallback={addMovieRental} 
              location='library' 
            /> 
          : null 
        }
        <div className={`search-results-container ${ clickedMovie ? 'search-results-fade' : null }`}>
          {movies.map((movie) => 
            <Movie 
              key={movie.external_id}  
              id={movie.external_id}  
              title={movie.title} 
              overview={movie.overview}
              releaseDate={movie.release_date}
              imageURL={movie.image_url}
              handleClickCallback={moreInfoOnClick}
              location='library'
              addMovieRentalCallback={addMovieRental}
            />
          )}
        </div>
      </div>
    </div>
  )
}

MovieLibrary.propTypes = {
  url: PropTypes.string.isRequired,
  selectMovieCallback: PropTypes.func.isRequired,
  customer: PropTypes.string,
  movie: PropTypes.string,
  checkoutCallback: PropTypes.func
};

export default MovieLibrary;