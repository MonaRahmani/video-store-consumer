import React, { useState, useEffect } from 'react'
import CustomerList from './components/CustomerList.js';
import MovieLibrary from './components/MovieLibrary.js';
import MovieSearchBar from './components/MovieSearchBar.js';
import MovieSearchResults from './components/MovieSearchResults.js';
import Rental from './components/Rental.js';
import axios from 'axios';

// import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

const BASE_API_URL = 'http://localhost:3000';

export default function App() {
  const [customers, setCustomers] = useState(null)
  const [movie, setMovies] = useState(null)

  const selectCustomer = (singleCustomer) => {
    setCustomers(singleCustomer)
  }

  const selectMovie = (singleMovie) => {
    setMovies(singleMovie)
  }

  const dueDate = () => {
    const result = new Date();
    result.setDate(result.getDate() + 14);
    return result;
  }




  return (
    <Router>
      <div>
        <div className='top-nav'>
          <h2><Link to="/">video store</Link></h2>
          <nav className='main-fns'>
            <ul>
              <li>
                <Link to="/library">movie library <i class="arrow down"></i></Link>
              </li>
              <li>
                <Link to="/customers">customer list <i class="arrow down"></i></Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/library">
            <MovieLibrary url={BASE_API_URL} />
          </Route>
          <Route path="/customers">
            <CustomerList selectCustomerCallback={selectCustomer}/>
          </Route>
          <Route path='/results' render={props => <MovieSearchResults {...props} />}/>
          <Route path="/">
            { Home() }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className='homepage-container'>
      <div className='homepage'>
        <h1>start a rental</h1>
        <div className='btn-container'>
          <div className='main-btn'>movies</div>
          <div className='main-btn'>customers</div>
        </div>
        <br />
        <h1>search for a movie</h1>
        <MovieSearchBar url={BASE_API_URL} />
      </div>
      <div className='img-carousel'>
        
      </div>
    </div>
  );
};