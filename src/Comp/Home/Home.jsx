import React, { useState, useEffect,useContext } from "react";
import { Link, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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
import { UserContext } from '../UserContext';
function Home(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  const [selectedpage, setSelectedPage] = useState("/");
  const clientID = "965453527920-vr412h4ff8hv0r5hv0cokua9norsjaf1.apps.googleusercontent.com";
  
  const active = (e) => {
    return e === selectedpage ? "active" : "notactive";
  };

  const handleclick = (e) => {
    setSelectedPage(e);
  };
console.log("home",user)
  const onLogoutSuccess = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
  console.log("this user",user)
    if (auth2) {
      try {
        await auth2.signOut(); // Wait for sign-out to complete
        const profileImg = defaultimg;
        const name = "Guest";
        
        setUser({ profileImg, name }); // Update user state
        
        navigate("/Login"); // Navigate to login page
      } catch (error) {
        console.error('Error during sign out:', error);
        navigate("/Login"); // Handle error by navigating to /Login
      }
    } else {
      navigate("/Login"); // If auth2 instance is not available, navigate to /Login directly
      console.log('usssser', user)
    }
  };
  

  return (
    <>
      <div className="container-fluid" style={{ height: "100%", padding: "unset" }}>
        <div className="row">
          <div className="col-md-2" style={{ backgroundColor: "rgb(248, 249, 250)" }}>
            <div className="sidebar">
              <Link className="brand" to="/">
                <b>Quiz Time</b>
              </Link>
              <Link className={active("/Dashboard")} onClick={() => handleclick("/Dashboard")} to="/Dashboard">
                <MdDashboard /> Dashboard
              </Link>
              <Link className={active("/notifications")} onClick={() => handleclick("/notifications")} to="/notifications">
                <FaBell /> Notifications
              </Link>
              <Link className={active("/support")} onClick={() => handleclick("/support")} to="/support">
                <MdOutlineSupportAgent /> Support
              </Link>
              <footer className="page-footer">
                <Link className="notactive" onClick={onLogoutSuccess} to="/Login">
                  <IoMdExit /> Log Out
                </Link>
                
              </footer>
            </div>
          </div>
          <div className="col" style={{ backgroundColor: "#f2efef" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ paddingTop: "12px", marginLeft: "-12px" }}>
              <div className="collapse navbar-collapse" style={{ marginLeft: "1%" }} id="navbarText">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <input className="form-control scope" type="search" placeholder={"Search"} aria-label="Search" />
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
                      <button className="btn btn-secondary" onClick={() => navigate("/SelectTopic")} type="submit">
                        Start Quiz
                      </button>
                    </a>
                  </li>
                  <Link className="nav-link" style={{ marginLeft: "44vw", display: "flex" }} to="/Login">
                    <img className="pfp" src={user.profileImg} alt="anonymos"></img>
                    <p>{user.name}</p>
                  </Link>
                </ul>
              </div>
            </nav>
            <div className="content">
              <Routes>
                <Route path="/" element={<p>intro</p>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/support" element={<p>Support Page</p>} />
                <Route path="/notifications" element={<p>Notifications Page</p>} />
                <Route path="/info" element={<Alert_Box />} />
                <Route path="/SelectTopic" element={<SelectTopic />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/Result" element={<Result />} />
                <Route path="/Review" element={<Review />} />
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
