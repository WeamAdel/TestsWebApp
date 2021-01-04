import PropTypes from "prop-types";

function Page({ children, classes }) {
  return (
    <main className={classes}>
      <div className="container">{children}</div>
    </main>
  );
}

Page.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default Page;
