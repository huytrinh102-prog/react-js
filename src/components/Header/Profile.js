import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserImformation from "./UI";

const ModalProfile = (props) => {
  const { show = false, setShow } = props || {};
  const handleClose = () => setShow && setShow(false);

  return (
    <>
      <Modal
        className="modal-add-user"
        show={!!show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="User Imformation">
              <UserImformation show={show} handleClose={handleClose} />
            </Tab>
            <Tab eventKey="profile" title="Change password">
              Tab content for Profile
            </Tab>
            <Tab eventKey="contact" title="History">
              Tab content for Contact
            </Tab>
          </Tabs>
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
export default ModalProfile;
