import "./ManageQuiz.scss";
const QuizTable = (props) => {
  const { handleEditQuiz, handleDeleteQuiz, listQuiz } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col">TYPE</th>
          <th scope="col">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td className="button">
                  <button
                    onClick={() => handleEditQuiz(item)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default QuizTable;
