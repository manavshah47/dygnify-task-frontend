import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Dygnify</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add-user">Create User</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-business">Create business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-loan">Create loan</Link>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/show-users">show users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/show-business">show business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/show-loans">show loans</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
