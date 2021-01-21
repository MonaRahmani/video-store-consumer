import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieSearchBar from './MovieSearchBar.js';
import './Navbar.css';

const Navbar = (props) => {
  const isHomepage = props.home;

  return (
    <div>
      { isHomepage
        ? <div className='top-nav'>
          <h2><Link to="/">video store</Link></h2>
        </div>
        : <div className='top-nav'>
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
          <div className='nav-rental-info'>
            <div className='rental-status'>
              <div className={`${props.movie ? 'rental-status-fulfilled' : null}`}>
                rental movie: {props.movie ? props.movie : 'none selected'}
              </div>
              <div className={`${props.customer ? 'rental-status-fulfilled' : null}`}>
                customer: {props.customer ? props.customer : 'none selected'}
              </div>
            </div>
            { props.movie && props.customer
              ? <button>checkout</button>
              : null
            }
          </div>
        </div>
      }
    </div>
  );
};

Navbar.propTypes = {
  home: PropTypes.bool,
  movie: PropTypes.string,
  customer: PropTypes.string
};

export default Navbar;