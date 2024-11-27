import React from "react";
import { FormatTime, formatTime } from "../utils/formatTime";

const TimeSession = ({ initialDuration, handleSkip, onCompleteSession }) => {
  const changeBySec = React.useRef(0);
  console.log("Timesession");

  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = React.useState<FormatTime>();

  React.useEffect(() => {
    changeBySec.current = initialDuration * 60 * 1000;
    setIsRunning(false);
    setTimeRemaining(formatTime(changeBySec.current));
  }, [initialDuration]);

  React.useEffect(() => {
    if (timeRemaining?.min === 0 && timeRemaining?.secs === 0) {
      onCompleteSession();
    }
  }, [timeRemaining]);
  React.useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (changeBySec.current > 0) {
          changeBySec.current -= 1000;

          setTimeRemaining(formatTime(changeBySec.current));
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, initialDuration]);

  const handleRestart = () => {
    changeBySec.current = initialDuration * 60 * 1000;
    setTimeRemaining(formatTime(changeBySec.current));
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div
      style={{
        border: "2px solid black",
        height: "300px",
        width: "400px",
        backgroundColor: "skyblue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <h1
        style={{ textAlign: "center", fontSize: "50px" }}
      >{`${timeRemaining?.min.toString().padStart(2, "0")}:${timeRemaining?.secs
        .toString()
        .padStart(2, "0")}`}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "25px",
        }}
      >
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
};

export default TimeSession;
