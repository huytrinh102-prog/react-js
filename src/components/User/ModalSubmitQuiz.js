import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ModalSubmitQuiz = (props) => {
  const { show, setShow, QuizResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div>
              Total : <b> {QuizResult.countTotal} </b>{" "}
            </div>
            <hr></hr>
            <div>
              Correct : <b> {QuizResult.countCorrect} </b>{" "}
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSubmitQuiz;
