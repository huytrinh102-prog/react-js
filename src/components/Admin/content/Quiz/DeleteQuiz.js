import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteQuizbyAdmin } from "../../../../services/apiServices";
import { toast } from "react-toastify";
const DeleteQuiz = (props) => {
  const { show, setShow, selectedQuiz, feachquiz } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteQuiz = async (id) => {
    // const isvalidateEmail = validateEmail(email);
    let res = await DeleteQuizbyAdmin(selectedQuiz);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      await feachquiz();
    } else {
      toast.error(res.data.EM);
    }

    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Quiz'id :"
          <b>{selectedQuiz ? selectedQuiz : ""}</b>"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQuiz;
