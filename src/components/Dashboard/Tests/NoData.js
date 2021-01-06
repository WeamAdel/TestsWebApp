import { Link } from "react-router-dom";

export default function NoData() {
  return (
    <div className="no-data">
      <img src="/assets/images/empty.png" />
      <p className="mb-0">
        You did not add any tests yet! <Link to="/dashboard/test">Add</Link> new
        tests now
      </p>
    </div>
  );
}
