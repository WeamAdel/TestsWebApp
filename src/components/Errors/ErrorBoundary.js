import React, { Component } from "react";
import { Link } from "react-router-dom";

class ErorrBoundary extends Component {
  state = {
    appHasError: false,
  };

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    this.setState({ appHasError: true });
  }

  render() {
    return this.state.appHasError ? (
      <>
        <main className="errors http-errors">
          <div className="container">
            <div className="image">
              <img src="/assets/images/errors/error.svg" />
            </div>
            <h1 className="heading">Whoops something went wrong</h1>
            <p>
              Please Try again later or go to <Link to="/">Home</Link>
            </p>
          </div>
        </main>
      </>
    ) : (
      this.props.children
    );
  }
}

export default ErorrBoundary;
