const Tableuser = ({ ListUser, handleUpdatebtn }) => {
  // const { ListUser } = ListUser;
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ListUser.length > 0 ? (
            ListUser.map((item, index) => (
              <tr key={item.id || index}>
                <th scope="row">{item.id}</th>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    onClick={() => handleUpdatebtn(item)}
                    className="btn btn-warning mx-3"
                  >
                    Update
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No Users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default Tableuser;
