import PropTypes from "prop-types";

export default function QuestionsCounter({ counter }) {
  return (
    <div className="col-md-3 offset-md-1 order-md-last order-first mb-5 mb-md-0">
      <div className="q-counter text-center">
        <img src="/assets/images/add-test/question.png" />
        <p className="mb-0">{counter < 10 ? "0" + counter : counter}</p>
      </div>
    </div>
  );
}

QuestionsCounter.propTypes = {
  counter: PropTypes.number.isRequired,
};
