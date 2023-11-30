import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <h1>
        <Link to="/home">DIYesk8Guide</Link>
      </h1>
    </header>
  );
}

export default Header;
