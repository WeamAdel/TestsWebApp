import { connect } from "react-redux";
import { doLogout } from "../../redux/auth/ActionCreators";
import { NavLink, Link } from "react-router-dom";

function Navbar({ doLogout }) {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link
          to="/dashboard"
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/test">
                <span>Add Test</span>
                <i className="fa fa-plus-square ml-2" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard" exact>
                <span>Dashboard</span>
                <i className="fa fa-compass ml-2" />
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-cogs" />
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={doLogout}>
                  <i className="fa fa-fa-sign-out" /> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: () => {
      dispatch(doLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
