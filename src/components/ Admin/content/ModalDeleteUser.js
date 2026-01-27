import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    selectedUser,
    FetchGetallapiwithPaginate,
    currentPage,
  } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async (event) => {
    // const isvalidateEmail = validateEmail(email);
    console.log(`User requested page number ${event.selected}}`);
    let res = await DeleteUser(selectedUser.id);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      await FetchGetallapiwithPaginate(currentPage);
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
          <Modal.Title>Confirm Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user email ="
          <b>{selectedUser && selectedUser.email ? selectedUser.email : ""}</b>"
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
