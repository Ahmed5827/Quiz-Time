
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import Alert_Box from '../Alert-Box/Alert_Box';
import { useNavigate } from 'react-router-dom';
function Timer(props) {
  const [timeRemaining, setTimeRemaining] = useState(props.time);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setTimerCompleted(true);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed || timerCompleted) {
      return( <span>Countdown completed! <Alert_Box box="warning" message="Looks like you exceeded the time given for this quiz" Title="time's up"></Alert_Box></span> );
    } else {
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return (
          <span>
            {hours}:{minutes}:{formattedSeconds}
          </span>
        );
    }
  };
  return (
    <div>
      <h3>
        Timer:{" "}
        <Countdown date={Date.now() + timeRemaining} renderer={renderer} />
      </h3>
    </div>
  );
}
export default Timer;
