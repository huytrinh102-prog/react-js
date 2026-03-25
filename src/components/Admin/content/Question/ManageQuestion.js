import { useEffect, useState } from "react";
import Select from "react-select";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./ManageQuestion.scss";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import {
  getQuizbyAdmin,
  CreateNewQforQuiz,
  CreateNewAforQ,
} from "../.././../../services/apiServices";

const ManageQuestion = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      quiz_id: "",
      description: "",
      imageFile: "",
      imageName: "No image selected",
      answer: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [question, setQuestion] = useState(initQuestion);

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [errors, setErrors] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const feachquiz = async (e) => {
    let res = await getQuizbyAdmin();
    console.log("res", res);
    if (res && res.data.EC === 0) {
      const newQuiz = res.data.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  useEffect(() => {
    feachquiz();
  }, []);
  const menuPortalTarget =
    typeof document !== "undefined" ? document.body : null;
  const selectStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      borderColor: "rgba(255, 255, 255, 0.14)",
      boxShadow: "none",
      color: "rgba(255, 255, 255, 0.92)",
    }),
    singleValue: (base) => ({ ...base, color: "rgba(255, 255, 255, 0.92)" }),
    placeholder: (base) => ({ ...base, color: "rgba(255, 255, 255, 0.6)" }),
    input: (base) => ({ ...base, color: "rgba(255, 255, 255, 0.92)" }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: "rgba(2, 6, 23, 0.92)",
      border: "1px solid rgba(255, 255, 255, 0.14)",
      overflow: "hidden",
      borderRadius: 12,
    }),
    option: (base, state) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.9)",
      backgroundColor: state.isSelected
        ? "rgba(14, 165, 233, 0.55)"
        : state.isFocused
          ? "rgba(14, 165, 233, 0.18)"
          : "transparent",
    }),
    dropdownIndicator: (base) => ({ ...base, color: "rgba(255, 255, 255, 0.72)" }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.14)",
    }),
  };

  const handleImageChange = (questionId, event) => {
    const newQ = [...question];
    const index = newQ.findIndex((q) => q.id === questionId);
    if (index > -1) {
      const file = event.target.files?.[0];
      newQ[index].imageName = file ? file.name : "No image selected";
      newQ[index].imageFile = file;
      setQuestion(newQ);
    }
  };
  const handleEditQ = (type, questionId) => {
    if (type === "ADD") {
      const newQ = {
        id: uuidv4(),
        quiz_id: "",
        description: "aa",
        imageFile: "",
        imageName: "No image selected",
        answer: [
          {
            id: uuidv4(),
            description: "",
          },
        ],
      };
      setQuestion([...question, newQ]);
    }
    if (type === "DELETE") {
      console.log(questionId);
      const newQ = question.filter((item) => item.id !== questionId);
      setQuestion(newQ);
    }
  };
  const handleEditA = (type, questionId, answerId) => {
    const NewQ = [...question];
    if (type === "DELETE") {
      const index = NewQ.findIndex((a) => a.id === questionId);
      if (index > -1) {
        NewQ[index].answer = NewQ[index].answer.filter(
          (a) => a.id !== answerId,
        );
        setQuestion(NewQ);
      }
    }
    if (type === "ADD") {
      const index = NewQ.findIndex((a) => a.id === questionId);
      if (index > -1) {
        const newA = {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        };
        NewQ[index].answer.push(newA);
      }
      setQuestion(NewQ);
    }
    console.log(question);
  };
  const handleOnchangeQ = (questionId, value) => {
    const NewQ = [...question];
    const index = NewQ.findIndex((q) => q.id === questionId);
    if (index > -1) {
      NewQ[index].description = value;
    }
    setQuestion(NewQ);
  };
  const handleOnchangeA = (type, questionId, answerId, value) => {
    const newQ = [...question];
    const index = newQ.findIndex((q) => q.id === questionId);
    if (index > -1) {
      const id = newQ[index].answer.findIndex((a) => a.id === answerId);
      if (id > -1) {
        if (type === "checkbox") {
          newQ[index].answer[id].isCorrect = value;
        }
        if (type === "input") {
          newQ[index].answer[id].description = value;
        }
      }
    }

    setQuestion(newQ);
  };

  const submitBtn = async () => {
    let newErrors = {};

    question.forEach((q) => {
      if (!q.description) {
        newErrors[q.id] = true;
      }

      q.answer.forEach((a) => {
        if (!a.description) {
          newErrors[a.id] = true;
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all fields");
      return;
    }

    const isValid = question.every(
      (q) => q.description && q.answer.every((a) => a.description),
    );

    if (!isValid) {
      toast.error("Please fill all fields");
      return;
    }

    for (const q of question) {
      const resQ = await CreateNewQforQuiz(
        selectedQuiz.value,
        q.description,
        q.imageFile,
      );
      if (resQ && resQ.data.EC === 0) {
        for (const a of q.answer) {
          const resA = await CreateNewAforQ(
            a.description,
            a.isCorrect,
            resQ.data.DT.id,
          );
          if (!resA || resA.data.EC !== 0) {
            toast.error("Create answer failed");
            return;
          }
        }
        toast.success(resQ.data.EM);
        setQuestion(initQuestion);
      } else {
        toast.error("Create question failed");
        return;
      }
    }
  };
  const getImageSrc = (imageFile) => {
    if (!imageFile) return "";
    if (typeof imageFile === "string") {
      return imageFile.startsWith("data:")
        ? imageFile
        : `data:image/png;base64,${imageFile}`;
    }
    // File/Blob
    return URL.createObjectURL(imageFile);
  };
  return (
    <div className="q-container">
      <div className="q-card">
        <div className="q-title">Manage Question</div>
        <p className="q-subtitle">
          Create a question, attach image, and add answer.
        </p>

        <div className="q-field">
          <label className="q-label">Select quiz</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            placeholder="Choose a quiz..."
            classNamePrefix="q-select"
            menuPortalTarget={menuPortalTarget}
            menuPosition="fixed"
            styles={selectStyles}
          />
        </div>

        <div className="q-section-title">Add question</div>
        {question &&
          question.length > 0 &&
          question.map((q, index) => (
            <div key={q.id} className="q-field">
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className={`form-control mt-0 ${errors[q.id] ? "is-invalid" : ""}`}
                  id={q.id}
                  placeholder="Enter question description"
                  value={q.description}
                  onChange={(e) => handleOnchangeQ(q.id, e.target.value)}
                />
                <label htmlFor="floatingInput">Description</label>
                <div className="q-action-buttons">
                  <button
                    type="button"
                    className="q-icon-btn add"
                    title="Add answer"
                    onClick={(e) => handleEditQ("ADD")}
                  >
                    <FaPlus />
                  </button>
                  {question.length > 1 && (
                    <button
                      type="button"
                      className="q-icon-btn remove"
                      title="Remove answer"
                      onClick={(e) => handleEditQ("DELETE", q.id)}
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              </div>

              <div className="q-upload">
                <label className="q-upload-btn" htmlFor={`addimage-${q.id}`}>
                  Add image
                </label>
                <input
                  id={`addimage-${q.id}`}
                  type="file"
                  hidden
                  onChange={(event) => handleImageChange(q.id, event)}
                />
                {q.imageFile && (
                  <img
                    src={getImageSrc(q.imageFile)}
                    alt="question"
                    style={{
                      width: 72,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginLeft: 12,
                    }}
                  />
                )}
                <span className="q-file-name">{q.imageName}</span>
              </div>
              <div className="q-section-title">Answers</div>
              {q.answer &&
                q.answer.length > 0 &&
                q.answer.map((a, index) => (
                  <div key={a.id} className="answers">
                    <input
                      type="checkbox"
                      className="form-check-input mt-0"
                      onChange={(e) => {
                        handleOnchangeA(
                          "checkbox",
                          q.id,
                          a.id,
                          e.target.checked,
                        );
                      }}
                    />
                    <input
                      className={`form-control mt-0 ${errors[a.id] ? "is-invalid" : ""}`}
                      placeholder="Your answer"
                      value={a.description}
                      onChange={(e) => {
                        handleOnchangeA("input", q.id, a.id, e.target.value);
                      }}
                    />
                    <div className="q-action-buttons">
                      <button
                        type="button"
                        className="a-icon-btn add"
                        title="Add answer"
                        onClick={() => handleEditA("ADD", q.id)}
                      >
                        <FaPlus />
                      </button>
                      {q.answer.length > 1 && (
                        <button
                          type="button"
                          className="a-icon-btn remove"
                          title="Remove answer"
                          onClick={() => handleEditA("DELETE", q.id, a.id)}
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        {question && (
          <button onClick={() => submitBtn()} className="btn btn-warning">
            SAVE
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ManageQuestion;
