import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "./../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const getQuizData = async () => {
      const res = await getQuizByUser();
      if (cancelled) return;
      setArrQuiz(res?.data?.DT || []);
    };
    getQuizData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="list-quiz-container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div key={index} className="list-quiz-content">
              <Card>
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${quiz.image}`}
                />
                <Card.Body>
                  <Card.Title>Quiz {quiz.id}</Card.Title>
                  <Card.Text>{quiz.description}</Card.Text>
                  <Button
                    onClick={() =>
                      navigate(`/quiz/${quiz.id}`, {
                        state: { quizName: quiz.description },
                      })
                    }
                    variant="primary"
                  >
                    Start now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && (
        <div className="noquiz">You don’t have any quizzes yet.</div>
      )}
    </div>
  );
};

export default ListQuiz;
