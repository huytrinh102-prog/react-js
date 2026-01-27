import { useState } from "react";
import ModalCreateUser from "../ModalCreateUser";
import "./ManegeUser.scss";
import Tableuser from "./TableUser";
import { useEffect } from "react";
import { getALLapi } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
const ManegeUser = (props) => {
  const [show, setShow] = useState(false);
  const [ListUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  useEffect(() => {
    FetchGetallapi();
  }, []);
  const FetchGetallapi = async () => {
    let res = await getALLapi();
    if (res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUpdatebtn = (user) => {
    setSelectedUser(user);
    setShowModalUpdateUser(true);
  };
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
          <Tableuser ListUser={ListUser} handleUpdatebtn={handleUpdatebtn} />
          <ModalCreateUser
            FetchGetallapi={FetchGetallapi}
            show={show}
            handleClose={() => setShow(false)}
          />
          <ModalUpdateUser
            FetchGetallapi={FetchGetallapi}
            show={showModalUpdateUser}
            handleClose={() => setShowModalUpdateUser(false)}
            selectedUser={selectedUser}
          />
        </div>
      </div>
    </div>
  );
};
export default ManegeUser;
