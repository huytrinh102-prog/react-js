import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "./../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate, useLocation } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    let res = await getQuizByUser();
    console.log("location ", location);
    setArrQuiz(res.data.DT);
  };

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div key={index} className="list-quiz-content">
              <Card style={{ width: "18rem" }}>
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
        <div className="noquiz container">You dont have any quiz now</div>
      )}
    </div>
  );
};

export default ListQuiz;
