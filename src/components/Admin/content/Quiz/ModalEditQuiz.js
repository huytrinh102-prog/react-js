import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { EditQuizbyAdmin } from "../../../../services/apiServices";
import _ from "lodash";

const EditQuiz = (props) => {
  const { show, selectedQuiz, feachquiz, handleClose } = props;
  // code xử lý create user

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(selectedQuiz)) {
      setName(selectedQuiz.name);
      setDifficulty(selectedQuiz.difficulty);
      setimage(selectedQuiz.image);
      setDescription(selectedQuiz.description);
      if (selectedQuiz.image) {
        setpreview(`data:image/jpeg;base64,${selectedQuiz.image}`);
      }
    }
  }, [selectedQuiz]);

  const handleimgchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setpreview(URL.createObjectURL(file));
    }
  };
  const handlesubmitUpdateQuiz = async () => {
    try {
      let res = await EditQuizbyAdmin(
        selectedQuiz.id,
        description,
        name,
        difficulty,
        image,
      );
      if (res && res.data.EC === 0) {
        toast.success(res.data.EM);
        handleClose();
        await feachquiz();
      } else {
        toast.error(res.data.EM);
      }
      setName("null");
      setDescription("null");
      setimage(null);
      setpreview(null);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Quiz'NAME</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Quiz'name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Quiz'Type</Form.Label>
                <Form.Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Difficult</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group
              className="imageform-add"
              as={Col}
              controlId="imageform"
            >
              <Form.Label className="upload-box">
                <FcPlus className="upload-icon" />
                Upload file IMG
              </Form.Label>
              <input
                hidden
                type="file"
                id="imageform"
                onChange={handleimgchange}
              />
            </Form.Group>
            <div className="imageform-preview">
              {!preview && <span>Preview Image</span>}
              {/* <span>Preview Image</span> */}
              {preview && <img src={preview} alt="preview img" />}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesubmitUpdateQuiz}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditQuiz;
