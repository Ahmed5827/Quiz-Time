import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getquestions from "../../utils/utils";
import Timer from "../Resusable/Timer/Timer";
import Agriculure from "../../assets/Agriculture.jpeg";
import Books from "../../assets/Books.jpeg";
import Medcine from "../../assets/Medcine.jpeg";
import Technology from "../../assets/Technology.jpeg";
import Comics from "../../assets/Comics.jpg";
import History from "../../assets/History.jpg";
import Music from "../../assets/Music.jpg";
import science from "../../assets/Science & Nature.jpg";
import Sports from "../../assets/sports.jpg";
import Politics from "../../assets/Politics.jpg";
import "./Review.css"
import he from "he";
import Alert_Box from "../Resusable/Alert-Box/Alert_Box";
import Arts from "../../assets/Art.jpg";

function Review(props) {
  const location = useLocation();
  const Navigate = useNavigate();
  const { image , questions , category } = location.state || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  const imgs = {
    Agriculture: Agriculure,
    "Entertainment: Books": Books,
    Medcine: Medcine,
    "Science: Computers": Technology,
    "Entertainment: Comics": Comics,
    History: History,
    "Entertainment: Music": Music,
    "Science & Nature": science,
    Sports: Sports,
    Politics: Politics,
    Art: Arts,
  };

  const selectedimg = () => {
    if (image in imgs) {
      return imgs[image];
    } else {
      return imgs["Agriculture"];
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

 console.log(questions[0])



 

  return (
    <>
     <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h3 className="colored">{category} Quiz</h3>
              <small className="colored">Answer the question below</small>
              <div className="row">
                <img className="quiz-pic" src={selectedimg()} alt="pic" />
              </div>
            </div>
            <div className="col">
              <div className="row">
                {" "}
                <h3>Time's over</h3>
              </div>
              <div className="row">
                <h6 className="colored1">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </h6>
              </div>
              <div className="row">
                <p className="colored1">
                  {questions[currentQuestionIndex].question}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">
                <div>
                  <h6 className="colored">choose your answer</h6>
                  <div className="colored1">
                    {questions[currentQuestionIndex].answers.map(
                      (item, index) => (
                        <div className="row" key={index}>
                        <div className="col">                          <input
                            className="radiocolor"
                            type="radio"
                            name={`question_${currentQuestionIndex}`}
                            value={item}
                            checked={
                              questions[currentQuestionIndex].chosen_answer ===
                              item
                            }
                            onClick={()=>(false)}
                           
                          />
                          <label>{item}</label></div>
                            <div className="col"> <span className={(item === questions[currentQuestionIndex].correct_answer)?"correct":"wrong"}>{(item === questions[currentQuestionIndex].correct_answer)?"correct":"wrong"}</span></div>
                         
                          <div className="col"></div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <button
                className="btn btn-secondary sep"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              
              
                <button
                  className="btn btn-secondary sep"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              
            </div>
          </div>
        </div>
      
    </>
  
  );
}

export default Review;
