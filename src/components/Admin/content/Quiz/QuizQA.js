import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./QuizQA.scss";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import {
  getQuizbyAdmin,
  getQuizwithQA,
  upsertQuiz,
} from "../../../../services/apiServices";

const QuizQA = () => {
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
  const feachQuizwithQA = useCallback(async () => {
    const normalizeAnswers = (item) => {
      const raw = item?.answer ?? item?.answers ?? [];
      const arr = Array.isArray(raw) ? raw : [];
      if (arr.length === 0) {
        return [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ];
      }
      return arr.map((a) => ({
        id: a?.id ?? uuidv4(),
        description: a?.description ?? "",
        // backend sometimes uses correct_answer instead of isCorrect
        isCorrect: Boolean(a?.isCorrect ?? a?.correct_answer),
      }));
    };

    const guessMime = (b64) => {
      const s = (b64 || "").startsWith("data:") ? b64.split(",")[1] : b64;
      if (s.startsWith("iVBORw0")) return "image/png"; // PNG
      if (s.startsWith("/9j/")) return "image/jpeg"; // JPG
      return "image/png";
    };

    const base64ToFile = (base64, filename, mime) => {
      const clean = base64.startsWith("data:") ? base64.split(",")[1] : base64;
      const byteString = atob(clean);
      const bytes = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        bytes[i] = byteString.charCodeAt(i);
      return new File([bytes], filename, { type: mime });
    };
    const res = await getQuizwithQA(selectedQuiz.value);
    if (res?.data?.EC !== 0) return;

    const qa = res.data.DT?.qa || [];

    const next = qa.map((item, idx) => {
      if (!item.imageFile) return { ...item, imageName: "No image selected" };

      const mime = guessMime(item.imageFile);
      const ext = mime === "image/jpeg" ? "jpg" : "png";
      const file = base64ToFile(
        item.imageFile,
        `q-${item.id || idx}.${ext}`,
        mime,
      );

      return {
        ...item,
        imageFile: file, // bay gio imageFile la File (giong luc upload)
        imageName: file.name,
      };
    });
    const normalized = next.map((item) => ({
      ...item,
      imageName: item?.imageName || "No image selected",
      answer: normalizeAnswers(item),
    }));

    setQuestion(normalized);
  }, [selectedQuiz?.value]);

  useEffect(() => {
    if (selectedQuiz?.value) {
      feachQuizwithQA();
    }
  }, [selectedQuiz?.value, feachQuizwithQA]);

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
        description: "",
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
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const submitBtn = async () => {
    let newErrors = {};

    question.forEach((q) => {
      if (!q.description) {
        newErrors[q.id] = true;
      }

      (q.answer || []).forEach((a) => {
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

    const isValid = question.every((q) => {
      const answers = Array.isArray(q?.answer) ? q.answer : [];
      return q.description && answers.every((a) => a.description);
    });

    if (!isValid) {
      toast.error("Please fill all fields");
      return;
    }

    const q = [...question];

    for (let i = 0; i < q.length; i++) {
      if (q[i].imageFile instanceof Blob) {
        q[i].imageFile = await toBase64(q[i].imageFile);
      }
    }

    const res = await upsertQuiz({
      quizId: selectedQuiz.value,
      questions: q,
    });
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
    } else {
      toast.error(res.data.EM);
    }
    console.log("check upse", res);
  };
  return (
    <div className="q-container">
      <div className="q-card">
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

export default QuizQA;
