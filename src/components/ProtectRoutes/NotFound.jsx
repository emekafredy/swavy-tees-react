import React from 'react';
import { Link } from 'react-router-dom';

import './notFound.scss';

const NotFound = () => (
    <div className="not-found">
      <div className="error">
        <i className="fa fa-frown-o fa-5x" aria-hidden="true"></i>
        <p className="not-found-message">Not Found</p>
      </div>

      <div className="not-found-content">
        <span className="not-found-blue">4</span>
        <span className="not-found-red">0</span>
        <span className="not-found-blue">4</span>
        <p className="not-found-message">
          Sorry, the page you are looking for might have been removed, 
          or does not exist
        </p>
        <Link className="return-home" to="/"> Return Home </Link>
      </div>
    </div>
)

export default NotFound;
