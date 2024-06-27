import { func } from "joi";
import React from "react";
import "./Alert_Box.css";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
function Alert_Box(props) {
  const navigate = useNavigate();

  console.log(props);
  const location = useLocation();
  const { message, Title, box } = location.state;

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
      </div>
    </div>
  );
}
export default Alert_Box;
