import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink to="/">About</NavLink>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/generate">Generate</NavLink>
            <NavLink to="/guru">Guru</NavLink>
            <NavLink to="/game">Game</NavLink>
            <NavLink to="/qna">Q&A</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default NavBar;