import { useState, useEffect } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postQuiz, getQuizbyAdmin } from "./../../../services/apiServices";
import { toast } from "react-toastify";
import { useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import QuizTable from "./QuizTable";
import DeleteQuiz from "./DeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";
const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Difficult", label: "Difficult" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [image, setImage] = useState(null);
  const intervalRef = useRef("");
  const [show, setShow] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);

  const feachquiz = async (e) => {
    let res = await getQuizbyAdmin();
    console.log("res", res);
    if (res && res.data.EC === 0) setListQuiz(res.data.DT);
  };
  useEffect(() => {
    feachquiz();
  }, []);

  const handleEditQuiz = (id) => {
    setSelectedQuiz(id);
    setShowModalEditQuiz(true);
  };

  const handleDeleteQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModalDeleteQuiz(true);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    return;
  };
  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!name || !description || !type || !image) {
      toast.warning("Fill the Form");
      return;
    }
    let res = await postQuiz(description, name, type?.value, image);
    console.log("res", res);
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      setName("");
      setDescription("");
      setImage();
      setType();
      intervalRef.current.value = null;
    } else toast.error(res.data.EM);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="manage-container">
              <div className="from-content">
                <form onSubmit={handleSubmitQuiz}>
                  <fieldset className="border rounded-3 p-3">
                    <legend className="loat-none w-auto px-3">
                      Add new quiz:
                    </legend>
                    <div className="form-floating mb-3">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                      <label>Name</label>
                    </div>
                    <div className="form-floating">
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control"
                        id="floatingPassword"
                      />
                      <label>Description</label>
                    </div>
                    <div className="qtype my-3">
                      <Select
                        value={type}
                        defaultValue={type}
                        onChange={setType}
                        options={options}
                        isSearchable={false}
                      />
                    </div>
                    <div>
                      <label className="mb-2">Description</label>
                      <input
                        ref={intervalRef}
                        onChange={(e) => handleChangeFile(e)}
                        type="file"
                        className="form-control"
                        id="floatingPassword"
                      />
                    </div>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div></div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="quizTable mt-0">
        <QuizTable
          handleDeleteQuiz={handleDeleteQuiz}
          show={show}
          setShow={setShow}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
          listQuiz={listQuiz}
          setListQuiz={setListQuiz}
          feachquiz={feachquiz}
          handleEditQuiz={handleEditQuiz}
        />
        <DeleteQuiz
          handleDeleteQuiz={handleDeleteQuiz}
          show={showModalDeleteQuiz}
          setShow={setShowModalDeleteQuiz}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
          feachquiz={feachquiz}
          handleClose={() => setShowModalDeleteQuiz(false)}
        />
        <ModalEditQuiz
          handleEditQuiz={handleEditQuiz}
          show={showModalEditQuiz}
          setShow={setShowModalEditQuiz}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
          feachquiz={feachquiz}
          handleClose={() => setShowModalEditQuiz(false)}
        />
      </div>
    </>
  );
};
export default ManageQuiz;
