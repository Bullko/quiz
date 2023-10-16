import "./AnswerTimer.scss";
import { useEffect, useState, useRef } from "react";

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 100);
    }
  }, [counter]);

  return (
    <div className="answer-loader-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 70
              ? "orange"
              : "red"
          }`,
        }}
        className="progress"
      ></div>
    </div>
  );
}

export default AnswerTimer;