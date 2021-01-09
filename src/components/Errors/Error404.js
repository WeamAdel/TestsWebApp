import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound(props) {
  console.log(props);
  return (
    <div>
      <main className="errors http-errors page-not-found">
        <div className="container">
          <div className="image">
            <img src="/assets/images/errors/404.svg" />
          </div>
          <h1 className="heading">Sorry, the page could not be found!</h1>
          <p className="text mb-0">
            Be sure to enter a valid page url or you can go to{" "}
            <Link to="/">Home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
