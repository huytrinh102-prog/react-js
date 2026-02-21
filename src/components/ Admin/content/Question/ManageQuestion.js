import React, { useState } from "react";
import Select from "react-select";
const ManageQuestion = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [question, setQuestion] = useState([]);
  return (
    <div className="q-container">
      <div className="title">Manage Quetion</div>
      <div className="q-content">
        <div className="select">
          <Select
            // value={selectedOption}
            // onChange={this.handleChange}
            options={options}
          />
        </div>
        <div className="question">
          <input className="aa"></input>
        </div>
      </div>
    </div>
  );
};
export default ManageQuestion;
