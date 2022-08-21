import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
    const showButtons = () => {
        if (!localStorage.getItem('token')) {
            return(
            <>
                    <Link className="btn btn-outline-success mx-1" to="/" role="button">Login</Link>
                    <Link className="btn btn-outline-info mx-1" to="/signup" role="button">SignUp</Link>
            </>)
        }
        else {
            return (
                <Link className="btn btn-outline-warning mx-1" to="/" role="button" onClick={handleClick}>Logout</Link>
            )
        }
    }
    const handleClick = () => {
        localStorage.removeItem('token');
}
    let location = useLocation();
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to={localStorage.getItem('token')?'/home':'/'} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                </div>

                {showButtons()}

            </div>
        </nav>
    )
}
export default Navbar

