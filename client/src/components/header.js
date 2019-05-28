import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import '../App.css';

const AuthButton = withRouter(
  ({ history }) =>
    localStorage.accessToken ? (
        <button
          className="btn btn-danger btn-lg br-0"
          onClick={() => {
            signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
    ) : (
      <Redirect to="/login" />
    )
);

function signout(cb) {
  localStorage.removeItem("accessToken");
  setTimeout(cb, 100);
}

const Header = props =>{

  return(
    <header>
      <nav className="navbar navbar-expand-sm bg-white navbar-light justify-content-end p-0">
        <ul className="navbar-nav">
          <li className="nav-item">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}


export default Header;
