import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <h1>DIYesk8Guide</h1>
    </header>
  );
}

function NavBar() {
  return (
    <nav>
      <Header />
      <NavLink to="/">About</NavLink>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/generate">Generate</NavLink>
      <NavLink to="/guru">Guru</NavLink>
      <NavLink to="/qna">Q&A</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default NavBar;
