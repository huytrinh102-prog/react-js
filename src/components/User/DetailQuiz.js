import { useParams } from "react-router-dom";
import {
  getQuestiondata,
  submitQuestionQuiz,
} from "./../../services/apiServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ".//detailquizz.scss";
import Question from "./Question";
import ModalSubmitQuiz from ".//ModalSubmitQuiz";
import Countdown from "./Countdown";
import _ from "lodash";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params?.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [QuizResult, setQuizResult] = useState({});
  const handlecheck = (questionId, answerId) => {
    setIsSelected((prev) => {
      const current = prev[questionId] || [];
      const existed = current.includes(answerId);
      const next = {
        ...prev,
        [questionId]: existed
          ? current.filter((id) => id !== answerId)
          : [...current, answerId],
      };

      return next;
    });
  };

  const nextbtn = () => {
    if (index >= dataQuiz.length - 1) return;
    return setIndex(index + 1);
  };

  const backbtn = () => {
    if (index <= 0) return;
    return setIndex(index - 1);
  };
  useEffect(() => {
    if (!quizId) return;
    const fetchQuestion = async () => {
      const res = await getQuestiondata(quizId);
      const raw = res?.data?.DT || [];
      const grouped = {};

      for (let i = 0; i < raw.length; i++) {
        const item = raw[i];
        if (!grouped[item.id]) {
          grouped[item.id] = {
            id: item.id,
            description: item.description,
            image: item.image,
            answers: [],
          };
        }
        grouped[item.id].answers.push(item.answers);
        grouped[item.id].answers = _.orderBy(
          grouped[item.id].answers,
          ["order"],
          ["asc"],
        );
      }

      const resul = Object.values(grouped);
      setDataQuiz(resul);
    };
    fetchQuestion();
  }, [quizId]);

  const handleSumit = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0)
      dataQuiz.forEach((question) => {
        let a = {
          questionId: question.id,
          userAnswerId: isSelected[question.id] || [],
        };
        answers.push(a);
      });
    payload.answers = answers;
    let res = await submitQuestionQuiz(payload);

    setIsShow(true);
    if (res.data.EC === 0)
      setQuizResult({
        countCorrect: res.data.DT.countCorrect,
        countTotal: res.data.DT.countTotal,
        quizData: res.data.DT.quizData,
      });
    else return <div>something wrong....</div>;
  };

  return (
    <div className="detail-quiz-container">
      <div className="quiz-container">
        <div className="title">
          Quiz-{quizId} {location?.state?.quizName}
        </div>
        <hr />
        <div className="q-body"></div>
        <div className="q-content ">
          {dataQuiz.length > 0 && (
            <Question
              isSelected={isSelected}
              handlecheck={handlecheck}
              index={index}
              data={dataQuiz[index]}
            />
          )}
        </div>
        <div className="footer">
          <button
            disabled={index === 0}
            onClick={() => backbtn()}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            disabled={index >= +dataQuiz.length - 1}
            onClick={() => nextbtn()}
            className="btn btn-primary"
          >
            Next
          </button>
          <button onClick={() => handleSumit()} className="btn btn-warning">
            Finish
          </button>
        </div>
      </div>
      <div className="count-down">
        <Countdown
          isSelected={isSelected}
          quizId={quizId}
          dataQuiz={dataQuiz}
          setIndex={setIndex}
          handleSumit={handleSumit}
          index={index}
        />
      </div>
      <ModalSubmitQuiz
        QuizResult={QuizResult}
        show={isShow}
        setShow={setIsShow}
      />
    </div>
  );
};
export default DetailQuiz;
