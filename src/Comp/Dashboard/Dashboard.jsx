import React,{useContext} from "react";
import "./Dashboard.css";
import defau from "../../assets/default.jpeg";
import { IoFlagSharp } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import M1 from "../../assets/M1.png";
import M2 from "../../assets/M2.png";
import M3 from "../../assets/M3.png";
import Category from "./../Resusable/Category/Category";
import { UserContext } from '../UserContext';
function Dashboard(props) {
  const { user } = useContext(UserContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container-fluid">
          <div className="row">
            <div className="col centred">
              <img src={user.profileImg} className="profile" alt="pfp"></img>
            </div>
            <div className="col">
              <div className="row stats">
                <h3>{user.name}</h3>
                <small>Bonus booster 24lv</small>
                <div class="progress"  style={{ padding: 'unset' }}>
                  <div
                    class="progress-bar bg-secondary"
                    role="progressbar"
                    style={{ width: "100%" }}
                  >
                    100%
                  </div>
                </div>
                <div className="row stats-attributs">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <IoFlagSharp size={80} />
                      </div>
                      <div className="col">
                        <h6>27</h6>
                        <small>Quiz passed</small>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <IoTimeSharp size={80} />
                      </div>
                      <div className="col">
                        <h6>17 min</h6>
                        <small>Fastest time</small>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <FaCheckCircle size={80} />
                      </div>
                      <div className="col">
                        <h6>270</h6>
                        <small>correct answer</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col ">
          <div className="row title">
            <div className="col">
              <h3> Achivements</h3>
            </div>
            <div className="col head">
              <div class="progress">
                <div
                  class="progress-bar bg-secondary"
                  role="progressbar"
                  style={{ width: "100%" }}
                >
                  100%
                </div>
              </div>
            </div>
          </div>
          <div class="card" style={{ width: "100%", height: "100%" }}>
            <div class="card-body flex centred">
              <div className="conatiner achivement">
                <div className="row">
                  <div className="col">
                    <img className="medaille" src={M1} />
                    <h5>comeback</h5>
                  </div>
                  <div className="col">
                    <img className="medaille" src={M2} />
                    <h5>Prodigy</h5>
                  </div>
                  <div className="col">
                    <img className="medaille" src={M3} />
                    <h5>faster than the speed of light</h5>
                  </div>
                </div>
              </div>
              <div className="top-buttom">
                <hr></hr>
                <a href="#" class="card-link centred colored">
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col flex">
              {" "}
              <h3>Featured category</h3>
            </div>
            <div className="col topleft">
              {" "}
              <small>View All</small>
            </div>
          </div>
          <div class="card" style={{ width: "100%", height: "100%" }}>
            <div class="card-body centred">
              <div className="row">
                <div className="col">
                  <Category image="Entertainment: Books"></Category>
                  <Category image="Agriculture"></Category>
                </div>
                <div className="col">
                  {" "}
                  <Category image="Medcine"></Category>
                  <Category image="Science: Computers"></Category>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
