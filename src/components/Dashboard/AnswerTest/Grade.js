import PropTypes from "prop-types";

export default function Grade({ points, final }) {
  const result = points >= final / 2 ? "pass" : "fail";
  const types = {
    pass: {
      imgName: "result-pass",
      alt: "Celebration",
    },
    fail: {
      imgName: "result-fail",
      alt: "Sad face",
    },
  };
  const content = types[result];

  return (
    <div className={"grade-details" + " " + result}>
      <h3>Your grade details</h3>
      <img src={`/assets/images/${content.imgName}.png`} alt={content.alt} />
      <p className="grade font-weight-bold mb-0">
        {points} / {final}
      </p>
    </div>
  );
}

Grade.propTypes = {
  points: PropTypes.number,
  final: PropTypes.number,
};
