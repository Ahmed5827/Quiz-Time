import React from "react";
import "./Result.css";
import { useLocation, Navigate, useNavigate } from "react-router-dom";


function Result(props) {
  const navigate = useNavigate();

  console.log(props);
  const location = useLocation();
  const { message, Title, box , questions , image , category } = location.state;
console.log("over here",questions)
  return (
    <div className={`alert alert-${box} ending`} role="alert">
      <h4 class="alert-heading">{Title}</h4>
      <p>{message}</p>
      <hr />
      <div className="row">
        <div className="col">
          {" "}
          <p class="mb-0 centred">
            <a
              onClick={() => {
                navigate(-1);
              }}
            >
              Retake ?
            </a>
          </p>
        </div>
        <div className="col">
          {" "}
          <p class="mb-0 centred">
            <a
              onClick={() => {
                navigate("/");
              }}
            >
              Back to menu
            </a>
          </p>
        </div>
        <div className="col">
          {" "}
          <p class="mb-0 centred">
            <a
              onClick={() => {
                navigate("/Review", { state: { questions , image , category } });
              }}
            >
              Review submission
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Result;
