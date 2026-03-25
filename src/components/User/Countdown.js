import { useEffect, useState, useRef } from "react";
import "./detailquizz.scss";
const Countdown = (props) => {
  const { index, setIndex, quizId, dataQuiz, handleSumit, isSelected } = props;
  const [isTimeup, setIsTimeup] = useState(false);
  const [timeleft, setTimeleft] = useState(2);
  const submittedRef = useRef(false);

  useEffect(() => {
    setTimeleft(600);
    setIsTimeup(false);
    submittedRef.current = false;
  }, [quizId]);

  useEffect(() => {
    if (isTimeup) return;

    if (timeleft <= 0) {
      setIsTimeup(true);
      if (!submittedRef.current) {
        submittedRef.current = true;
        handleSumit();
      }
      return;
    }

    const id = setInterval(() => {
      setTimeleft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [timeleft, isTimeup, handleSumit]);

  const mm = String(Math.floor(timeleft / 60)).padStart(2, "0");
  const ss = String(timeleft % 60).padStart(2, "0");
  console.log("dtaaquiz", isSelected, dataQuiz);

  return (
    <div className="countdown-container">
      <div className="countdown">
        <div className="title">Timeleft</div>
        <div className="timer">
          {mm} : {ss}
        </div>
      </div>
      <div className="question-number">
        <div className="title">Question</div>{" "}
        <div className="numberct">
          {dataQuiz.length > 0 &&
            dataQuiz.map((item, idx) => (
              <div
                onClick={() => setIndex(idx)}
                key={`question - ${idx}`}
                className={`number ${idx === index ? "active" : ""} ${(isSelected?.[item.id] || []).length > 0 ? "answered" : ""}`}
              >
                {idx + 1}
              </div>
            ))}{" "}
        </div>
      </div>
    </div>
  );
};
export default Countdown;
