import { NavLink, Link } from "react-router-dom";

export default function Navbar({ doLogout, user }) {
  const adminLinksJSX = (
    <li className="nav-item">
      <NavLink className="nav-link" to="/dashboard/test">
        <span>Add Test</span>
        <i className="fa fa-plus-square ml-2" />
      </NavLink>
    </li>
  );

  const loggedUserLinksJSX = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard" exact>
          <span>Dashboard</span>
          <i className="fa fa-compass ml-2" />
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a
          className="dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-cogs" />
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="user-info dropdown-item" to="/dashboard">
            <img src="/assets/images/avatar.png" alt="avatar" />
            <div>
              <h4>{user.username}</h4>
              <span>{user.email}</span>
            </div>
          </Link>
          <hr />
          <a className="dropdown-item" onClick={doLogout}>
            <i className="fa fa-sign-out mr-2" /> Logout
          </a>
        </div>
      </li>{" "}
    </>
  );

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand logo mr-auto font-weight-bold text-light"
        >
          Quiz.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars text-light"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {user.isLogged == true ? (
              <>
                {user?.isAdmin ? adminLinksJSX : null}
                {loggedUserLinksJSX}
              </>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link" to="/sign-in" exact>
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/sign-up" exact>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
