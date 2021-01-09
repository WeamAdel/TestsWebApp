import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import $ from "jquery";

export default function Result({ points, final, isAnswered }) {
  const modalRef = useRef(null);
  const result = points >= final / 2 ? "pass" : "fail";
  const types = {
    pass: {
      imgName: "result-pass",
      alt: "Celebration",
      text: "Congrats on passing the test!",
    },
    fail: {
      imgName: "result-fail",
      alt: "Sad face",
      text: "You did not pass the test!",
    },
  };
  const content = types[result];

  useEffect(() => {
    if (isAnswered) $("#result-modal").modal("show");
  }, [isAnswered]);

  function closeModal() {
    $("#result-modal").modal("hide");
  }

  return (
    <div
      className={"modal text-center result " + result}
      tabIndex="-1"
      role="dialog"
      ref={modalRef}
      id="result-modal"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Test Results</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img
              src={`/assets/images/${content.imgName}.png`}
              alt={content.alt}
            />
            <p>{content.text}</p>
            <p className="grade font-weight-bold">
              {points} / {final}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Result.propTypes = {
  points: PropTypes.number,
  final: PropTypes.number,
  isAnswered: PropTypes.bool,
};
