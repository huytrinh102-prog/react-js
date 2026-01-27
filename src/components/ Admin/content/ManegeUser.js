import { useState } from "react";
import ModalCreateUser from "../ModalCreateUser";
import "./ManegeUser.scss";
import Tableuser from "./TableUser";
import { useEffect } from "react";
import {
  getALLapi,
  getALLapiUserwithpaginate,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TablePaginate from "./TablePaginate";
const ManegeUser = (props) => {
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [ListUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const LimitUser = 10;
  useEffect(() => {
    //
    FetchGetallapiwithPaginate(1);
  }, []);
  const FetchGetallapi = async () => {
    let res = await getALLapi();
    if (res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };
  const FetchGetallapiwithPaginate = async (page) => {
    let res = await getALLapiUserwithpaginate(page, LimitUser);
    if (res.data.EC === 0) {
      console.log("dddd", res.data.DT);
      setListUser(res.data.DT.users);
      setPageCount(res.data.DT.totalPages);
    }
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUpdatebtn = (user) => {
    setSelectedUser(user);
    setShowModalUpdateUser(true);
  };
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModalViewUser(true);
  };
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModalDeleteUser(true);
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
          {/* <Tableuser
            ListUser={ListUser}
            handleUpdatebtn={handleUpdatebtn}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
          /> */}
          <TablePaginate
            ListUser={ListUser}
            handleUpdatebtn={handleUpdatebtn}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
            FetchGetallapiwithPaginate={FetchGetallapiwithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalCreateUser
            FetchGetallapi={FetchGetallapi}
            show={show}
            handleClose={() => setShow(false)}
            FetchGetallapiwithPaginate={FetchGetallapiwithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalUpdateUser
            FetchGetallapi={FetchGetallapi}
            show={showModalUpdateUser}
            handleClose={() => setShowModalUpdateUser(false)}
            selectedUser={selectedUser}
            FetchGetallapiwithPaginate={FetchGetallapiwithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalViewUser
            FetchGetallapi={FetchGetallapi}
            show={showModalViewUser}
            handleClose={() => setShowModalViewUser(false)}
            selectedUser={selectedUser}
            FetchGetallapiwithPaginate={FetchGetallapiwithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalDeleteUser
            // FetchGetallapi={FetchGetallapi}
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            selectedUser={selectedUser}
            FetchGetallapi={FetchGetallapi}
            FetchGetallapiwithPaginate={FetchGetallapiwithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManegeUser;
