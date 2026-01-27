import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import { useState } from "react";
import { useEffect } from "react";

const TablePaginate = ({
  ListUser,
  handleUpdatebtn,
  handleViewUser,
  handleDeleteUser,
  FetchGetallapiwithPaginate,
  pageCount,
}) => {
  const handlePageClick = (event) => {
    FetchGetallapiwithPaginate(+event.selected + 1);
    console.log(`User requested page number ${event.selected}}`);
  };

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
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewUser()}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdatebtn(item)}
                    className="btn btn-warning mx-3"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(item)}
                  >
                    Delete
                  </button>
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
      <div className="paginate">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
export default TablePaginate;
