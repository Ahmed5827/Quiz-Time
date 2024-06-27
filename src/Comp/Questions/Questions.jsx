import React, { useState, useEffect } from "react";
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
import "./Questions.css";
import he from "he";
import Alert_Box from "../Resusable/Alert-Box/Alert_Box";
import Arts from "../../assets/Art.jpg";

function Questions(props) {
  const location = useLocation();
  const Navigate = useNavigate();
  const { image ,time } = location.state || {};

  const [retriveddata, setretriveddata] = useState([]);
  const [questions, setquestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(image);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      console.log("Fetching data for category:", category);
      try {
        const data = await getquestions(category);
        if (isMounted) {
          setretriveddata(data.results);
          console.log("Data retrieved:", data.results);
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching questions");
        }
        console.error("Fetch error:", err);
      }
      if (isMounted) {
        setLoading(false);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [category]);
  

  useEffect(() => {
    const x =   retriveddata.map((m) => ({
      question: he.decode(m.question),
      answers: possibleAnswers(m),
      correct_answer: he.decode(m.correct_answer),
      chosen_answer: "",
    }));

    setquestions(x);
  }, [retriveddata]);

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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const possibleAnswers = (question) => {
    const response = shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
    return response.map((m) => he.decode(m));
  };

  const handleAnswerChange = (e) => {
    const updatedQuestions = questions.map((q, index) => {
      if (index === currentQuestionIndex) {
        return { ...q, chosen_answer: e.target.value };
      }
      return q;
    });
    setquestions(updatedQuestions);
  };

  const handlesubmit = () => {
    let count = 0;
    let unanswered = false;

    for (let item of questions) {
      if (item.chosen_answer === item.correct_answer) {
        count = count + 1;
      }
      if (item.chosen_answer === "") {
        unanswered = true;
        break;
      }
    }

    if (!unanswered) {
      Navigate("/Result", {
        state: {
          Title: "Results",
          message: `You got ${count} out of 10`,
          box: count >= 6 ? "success" : "danger",
          questions , image , category
        },
      });
    } else {
      Navigate("/info", {
        state: {
          Title: "Results",
          message: "some questions were not answered",
          box: "danger",
        },
      });
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && questions.length > 0 && (
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
                <Timer time={60000*time}></Timer>
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
                        <div key={index}>
                          <input
                            className="radiocolor"
                            type="radio"
                            name={`question_${currentQuestionIndex}`}
                            value={item}
                            checked={
                              questions[currentQuestionIndex].chosen_answer ===
                              item
                            }
                            onChange={handleAnswerChange}
                          />
                          <label>{item}</label>
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
              <span> </span>
              
              {currentQuestionIndex + 1 == 10 && (
                <button
                  onClick={handlesubmit}
                  className="btn btn-success sep"
                  type="sumbit"
                >
                  Submit
                </button>
              )}
              {currentQuestionIndex + 1 < 10 && (
                <button
                  className="btn btn-secondary"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Questions;
