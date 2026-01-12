import { useState } from "react";
import ModalCreateUser from "../ModalCreateUser";
import "./ManegeUser.scss";

const ManegeUser = (props) => {
  const [show, setShow] = useState(false);
  // const { show, handleClose } = props;
  return (
    <div className="manage-user-container">
      <div className="title">manege User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            // variant="primary"
            onClick={() => setShow(true)}
          >
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          table users
          <ModalCreateUser show={show} handleClose={() => setShow(false)} />
        </div>
      </div>
    </div>
  );
};
export default ManegeUser;
