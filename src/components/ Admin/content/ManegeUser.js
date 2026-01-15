import { useState } from "react";
import ModalCreateUser from "../ModalCreateUser";
import "./ManegeUser.scss";
import Tableuser from "./TableUser";
import { useEffect } from "react";
import { getALLapi } from "../../../servies/apiServices";

const ManegeUser = (props) => {
  const [show, setShow] = useState(false);
  const [ListUser, setListUser] = useState([]);
  useEffect(() => {
    FetchGetallapi();
  }, []);
  const FetchGetallapi = async () => {
    let res = await getALLapi();
    if (res.data.EC === 0) {
      setListUser(res.data.DT);
    }
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
          <Tableuser ListUser={ListUser} />
          <ModalCreateUser
            FetchGetallapi={FetchGetallapi}
            show={show}
            handleClose={() => setShow(false)}
          />
        </div>
      </div>
    </div>
  );
};
export default ManegeUser;
