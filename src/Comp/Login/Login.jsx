import React, { useState } from "react";
import Home from "../Home/Home";
import Joi from "joi";
import "./Login.css";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { GoogleLogin } from "react-google-login";

function Login(props) {
  const [logininfo, setlogininfo] = useState({ login: "", password: "" });
  const [ischecked, setchecked] = useState(false);
  const [Error, setError] = useState({ login: "", password: "" });
  const navigate = useNavigate();
  const clientID =
    "965453527920-vr412h4ff8hv0r5hv0cokua9norsjaf1.apps.googleusercontent.com";

  const handlechange = (e) => {
    const x = { ...logininfo };
    x[e.target.name] = e.target.value;
    setlogininfo(x);
    console.log(logininfo);
  };
  const handlecheck = () => setchecked(!ischecked);

  const schema = Joi.object({
    login: Joi.string().required().label("E-mail"),
    password: Joi.string().required().pattern(new RegExp("Hello$")).messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be between 8-30 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
  });

  const handlesubmit = (e) => {
    const va = {};
    const x = {};

    const { error } = schema.validate(logininfo, { abortEarly: false });
    if (error !== undefined) {
      for (let item of error.details) {
        va[item.path[0]] = item.message;
        x[item.path[0]] = "";
        setlogininfo(x);
      }
      setError(va);
    } else {
      navigate("/");
    }

    console.log(error);
    e.preventDefault();
  };

  const onSuccess=(e)=>{console.log(e) ;navigate("/");}
  const onFailure =()=>{console.log("failure")}

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5 quote-bg">
            <div className="quote">
              <section class="component">
                <blockquote class="callout quote EN">
                  Those people who develop the ability to continuously acquire
                  new and better forms of knowledge that they can apply to their
                  lives will be the movers and shakers in our society for the
                  indefinite future
                  <cite>
                    {" "}
                    - <b>Brian Tracy</b>
                  </cite>
                </blockquote>
              </section>
            </div>
          </div>

          <div style={{ backgroundColor: "whitesmoke" }} className="col">
            <div>
              <button className="back-btn"> {"<"} Back</button>
              <div>
                <form onSubmit={handlesubmit} className="forum">
                  <div className="centred">
                    <h2>
                      <b>Login to your Account</b>
                    </h2>
                    <small style={{ color: "rgb(134, 146, 166)" }}>
                      with your registred Email Address
                    </small>
                  </div>
                  <div className="inputs">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Email address :
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="exemple@domain.com"
                        name="login"
                        value={logininfo["login"]}
                        onChange={handlechange}
                      />
                      {Error["login"] && (
                        <div class="alert alert-danger" role="alert">
                          {Error["login"]}
                        </div>
                      )}
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password :</label>
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        value={logininfo["password"]}
                        onChange={handlechange}
                      />
                      {Error["password"] && (
                        <div class="alert alert-danger" role="alert">
                          {Error["password"]}
                        </div>
                      )}
                    </div>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck1"
                        name="remember"
                        onClick={handlecheck}
                      />
                      <label class="form-check-label" for="exampleCheck1">
                        remember me
                      </label>
                    </div>
                  </div>

                  <div className="submission">
                    <button type="submit" class="button-Login">
                      Login
                    </button>
                    <small>or</small>
 
                    <GoogleLogin
                      clientId={clientID}
                      buttonText="sign in with google"
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      className="google"
                    ></GoogleLogin>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
