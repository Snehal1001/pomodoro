import React from "react";
import TimeSession from "./TimeSession";

const TOTAL_SESSIONS = 4;
const SESSION_TYPES = {
  focus: "focus",
  shortBreak: "short break",
  longBreak: "long break",
};

const SESSION_DURATION_IN_MINUTES = {
  focus: 1,
  "short break": 5,
  "long break": 20,
};

const Pomodoro = () => {
  const [currentSession, setCurrentSession] = React.useState(1);
  const [currentSessionType, setCurrentSessionType] = React.useState(
    SESSION_TYPES.focus
  );

  const sessionManage = () => {
    if (currentSessionType === "focus") {
      if (currentSession < TOTAL_SESSIONS) {
        setCurrentSessionType(SESSION_TYPES.shortBreak);
      } else {
        setCurrentSessionType(SESSION_TYPES.longBreak);
      }
    } else if (currentSession === TOTAL_SESSIONS) {
      setCurrentSession(1);
      setCurrentSessionType(SESSION_TYPES.focus);
    } else {
      setCurrentSession(currentSession + 1);
      setCurrentSessionType(SESSION_TYPES.focus);
    }
  };

  const handleSkip = () => {
    sessionManage();
  };

  const onCompleteSession = () => {
    sessionManage();
  };

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "24px" }}>
        Session {currentSession} of {TOTAL_SESSIONS} ({currentSessionType})
      </p>

      <TimeSession
        initialDuration={SESSION_DURATION_IN_MINUTES[currentSessionType]}
        handleSkip={handleSkip}
        onCompleteSession={onCompleteSession}
      />
    </div>
  );
};

export default Pomodoro;
