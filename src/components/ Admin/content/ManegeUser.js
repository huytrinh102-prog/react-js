import ModalCreateUser from "../ModalCreateUser";

const ManegeUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">manege User</div>
      <div className="users-content">
        <div>
          <button>Add new user</button>
        </div>
        <div>
          table users
          <ModalCreateUser />
        </div>
      </div>
    </div>
  );
};
export default ManegeUser;
