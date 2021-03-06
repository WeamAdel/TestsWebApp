import PropTypes from "prop-types";

export default function AddQuestionBtn({ clicked }) {
  return (
    <button
      title="Add new question"
      className="add-question-btn"
      onClick={clicked}
    >
      <img src="/assets/images/add-test/add-btn.svg" />
    </button>
  );
}

AddQuestionBtn.propTypes = {
  clicked: PropTypes.func.isRequired,
};
