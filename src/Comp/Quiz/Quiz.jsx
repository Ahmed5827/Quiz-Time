import React, { useState } from "react";
import Agriculure from "../../assets/Agriculture.jpeg";
import Books from "../../assets/Books.jpeg";
import Medcine from "../../assets/Medcine.jpeg";
import Technology from "../../assets/Technology.jpeg";
import Comics from "../../assets/Comics.jpg";
import History from "../../assets/History.jpg";
import Music from "../../assets/Music.jpg";
import science from "../../assets/Science & Nature.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Sports from "../../assets/sports.jpg"
import Politics from "../../assets/Politics.jpg"
import "./Quiz.css";
import Arts from "../../assets/Art.jpg"

function Quiz(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [time , settime] = useState(30)
  const { image } = location.state || {}; // Correctly retrieve the image from the state
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const images = {
    "Agriculture": Agriculure,
    "Entertainment: Books": Books,
    "Medcine": Medcine,
    "Science: Computers": Technology,
    "Entertainment: Comics": Comics,
    "History": History,
    "Entertainment: Music": Music,
    "Science & Nature": science,
    "Sports" : Sports,
    "Politics" : Politics,
    "Art" :Arts
  };

  const selectedimg = () => {
    return images[image] || images["Agriculture"];
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h3>{image} Quiz</h3>
          <small>Read the following instructions</small>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img className="Quizpic" src={selectedimg()} alt={image}></img>
        </div>
        <div className="col">
          <ul className="stats">
            <li><label>Date: {date}</label></li>
            <li><label>Time Limit: {time} min</label></li>
            <li><label>Attempts: once</label></li>
            <li><label>Points: 200</label></li>
          </ul>
        </div>
      </div>
      <div className="row">
        <h3>Introduction</h3>
        <p>
          This quiz consists of 5 multiple-choice questions. To be successful
          with the quizzes, it’s important to be conversant with the topics. Keep
          the following in mind:
        </p>
        <p>
          Timing - You need to complete each of your attempts in one sitting, as
          you are allotted 30 minutes to each attempt.
        </p>
        <p>
          Answers - You may review your answer choices and compare them to the
          correct answers after your final attempt.
        </p>
        <p>
          To start, click the "Start" button. When finished, click the "Submit"
          button.
        </p>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <button
            onClick={() => navigate("/questions", { state: { image ,time } })}
            className="btn btn-secondary centered"
            style={{ width: '50%', marginLeft: '40%' }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
