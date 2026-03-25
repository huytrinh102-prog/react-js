import { getQuizbyAdmin } from "../../../../services/apiServices";
import { useEffect, useState } from "react";
import Select from "react-select";
import "./AssignQuiz.scss";
import { getALLapi, PostAssignQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const feachUser = async (e) => {
    let res = await getALLapi();
    console.log("resu", res);
    if (res && res.data.EC === 0) {
      const newQuiz = res.data.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username || ""}-${item.email}`,
        };
      });
      setListUser(newQuiz);
    }
  };
  useEffect(() => {
    feachUser();
  }, []);
  const AssignQuiz = async () => {
    if (!selectedQuiz?.value || !selectedUser?.value) {
      toast.error("please choose quiz and user");
      return;
    }
    const res = await PostAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <div className="container">
      <div className="select">
        <div className="q-field-1">
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
        <div className="q-field-2">
          <label className="q-label">Select </label>
          <Select
            value={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
            placeholder="Choose a user..."
            classNamePrefix="q-select"
            menuPortalTarget={menuPortalTarget}
            menuPosition="fixed"
            styles={selectStyles}
          />
        </div>
      </div>
      <div className="Assignbtn">
        <button onClick={() => AssignQuiz()} className="btn btn-warning">
          Assign
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
