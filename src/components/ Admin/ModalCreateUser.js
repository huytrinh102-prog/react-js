import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import axios from "axios";

const ModalCreateUser = ({ show, handleClose }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [preview, setpreview] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [image, setimage] = useState("");

  const handleimgchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setpreview(URL.createObjectURL(file));
    }
  };

  const handlesubmitCreateUser = async () => {
    if (!email || !password || !username || !role || !image) {
      alert("please fill the form");
      return;
    }

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    try {
      await axios.post("http://localhost:8081/api/v1/participant", data);

      setemail("");
      setpassword("");
      setusername("");
      setrole("");
      setimage("");
      setpreview("");
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
          <Modal.Title>Add new user</Modal.Title>
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
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
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
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
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
              <span>Preview Image</span>
              {preview && <img src={preview} alt="preview img" />}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesubmitCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
