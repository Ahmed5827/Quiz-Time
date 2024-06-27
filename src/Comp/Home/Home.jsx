import React, { useState } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./Home.css";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import defaultimg from "../../assets/default.jpeg";
import { IoMdExit } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../Not_Found/NotFound";
import SelectTopic from "../SelectTopic/SelectTopic";
import Quiz from "../Quiz/Quiz";
import Questions from "../Questions/Questions";
import Alert_Box from "../Resusable/Alert-Box/Alert_Box";
import Review from "../Review/Review";
import Result from "../Resusable/Result/Result";
import { GoogleLogout } from "react-google-login";

function Home(props) {
  const [selectedpage, setSelectedPage] = useState("/");
  const clientID =
    "965453527920-vr412h4ff8hv0r5hv0cokua9norsjaf1.apps.googleusercontent.com";
  const active = (e) => {
    if (e === selectedpage) return "active";
    else return "notactive";
  };
  const handleclick = (e) => {
    setSelectedPage(e);
  };

  // Using useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle navigation to NotFound page
  const navigateToNotFound = () => {
    navigate("/NotFound");
  };

  const onLogoutSuccess=()=>{
    navigate('/Login')
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{ height: "100%", padding: "unset" }}
      >
        <div className="row">
          <div
            className="col-md-2"
            style={{ backgroundColor: "rgb(248, 249, 250)" }}
          >
            <div className="sidebar">
              <Link className="brand" to="/">
                <b>Quiz Time</b>
              </Link>
              <Link
                className={active("/Dashboard")}
                onClick={() => handleclick("/Dashboard")}
                to="/Dashboard"
              >
                <MdDashboard /> Dashboard
              </Link>

              <Link
                className={active("/notifications")}
                onClick={() => handleclick("/notifications")}
                to="/notifications"
              >
                <FaBell /> Notifications
              </Link>
              <Link
                className={active("/support")}
                onClick={() => handleclick("/support")}
                to="/support"
              >
                <MdOutlineSupportAgent /> Support
              </Link>

              <footer className="page-footer">
                <Link
                  className="notactive"
                  onClick={() => handleclick("/Login")}
                  to="/Login"
                >
                  <IoMdExit /> Log Out

                </Link>
                <GoogleLogout clientId={clientID} buttonText={"logout"} onLogoutSuccess={onLogoutSuccess} ></GoogleLogout>
              </footer>
            </div>
          </div>
          <div className="col" style={{ backgroundColor: "#f2efef" }}>
            <nav
              className="navbar navbar-expand-lg navbar-light bg-light "
              style={{
                paddingTop: "18px",
                marginLeft: "-12px",
              }}
            >
              <div className="collapse navbar-collapse" style={{marginLeft:"1%" }} id="navbarText">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <input
                      className="form-control scope"
                      type="search"
                      placeholder={"Search"}
                      aria-label="Search"
                    />
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <button className="btn btn-success" type="submit">
                        Search
                      </button>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/SelectTopic")}
                        type="submit"
                      >
                        Start Quiz
                      </button>
                    </a>
                  </li>
                  <Link
                    className="nav-link"
                    style={{ marginLeft: "45vw", display: "flex" }}
                    to="/Login"
                  >
                    <img className="pfp" src={defaultimg} alt="anonymos"></img>
                    <p style={{ marginTop: "13%" }}>Guest</p>
                  </Link>
                </ul>
              </div>
            </nav>
            <div className="content">
              <Routes>
                <Route path="/" element={<p>intro</p>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/support" element={<p>Support Page</p>} />
                <Route
                  path="/notifications"
                  element={<p>Notifications Page</p>}
                />
                <Route path="/info" element={<Alert_Box></Alert_Box>}></Route>
                <Route
                  path="/SelectTopic"
                  element={<SelectTopic></SelectTopic>}
                />
                <Route path="/Quiz" element={<Quiz></Quiz>} />
                <Route
                  path="/questions"
                  element={<Questions></Questions>}
                ></Route>
                <Route path="/Result" element={<Result></Result>}></Route>
                <Route path="/Review" element={<Review></Review>}>
                
                </Route>
                {/* Route to handle unknown paths */}
                <Route path="*" element={<Navigate to="/NotFound" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
