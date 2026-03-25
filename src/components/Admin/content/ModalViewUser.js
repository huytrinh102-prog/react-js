import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import _ from "lodash";

const ModalCreateUser = ({
  selectedUser,
  show,
  handleClose,
  FetchGetallapi,
}) => {
  // code xử lý create user

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [preview, setpreview] = useState("");
  const [email, setemail] = useState("");
  const [password] = useState("");
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    if (!_.isEmpty(selectedUser)) {
      setemail(selectedUser.email);
      setusername(selectedUser.username);
      setrole(selectedUser.role);
      if (selectedUser.image) {
        setpreview(`data:image/jpeg;base64,${selectedUser.image}`);
      }
    }
  }, [selectedUser]);

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
          <Modal.Title>Update a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  value={password}
                  disabled
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsename">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  disabled
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>User</option>
                  <option>Admin</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group
              className="imageform-add"
              as={Col}
              controlId="imageform"
            ></Form.Group>
            <div className="imageform-preview">
              {!preview && <span>Preview Image</span>}
              {/* <span>Preview Image</span> */}
              {preview && <img src={preview} alt="preview img" />}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
