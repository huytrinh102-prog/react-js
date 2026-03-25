import "./DashBoard.scss";
import { DashBoardData } from "../../../../services/apiServices";
import {
  BarChart,
  Legend,
  XAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useCallback, useEffect, useState } from "react";
const DashBoard = () => {
  const [DashBoardDT, setDashBoardDT] = useState([]);

  const getDashBOARD = useCallback(async () => {
    // Call API service, not the React component (calling the component would break hooks).
    let res = await DashBoardData();
    console.log("getdatat", res);
    if (res.data && res.data.EC === 0) {
      setDashBoardDT([
        {
          name: "Total users",
          us: res?.data?.DT?.users?.total,
        },
        {
          name: "Total Quiz",
          qz: res?.data?.DT?.others?.countQuiz,
        },
        {
          name: "Total Questions",
          qs: res?.data?.DT?.others?.countQuestions,
        },
        {
          name: "Total Answers",
          as: res?.data?.DT?.others?.countAnswers,
        },
      ]);
    }
  }, []);
  useEffect(() => {
    getDashBOARD();
  }, [getDashBOARD]);

  return (
    <>
      {" "}
      <div className="title">Analytics DashBoard</div>
      <div className="db-container">
        <div className="left-content">
          <div className="childen">
            <span className="first"> Total users</span>
            {DashBoardDT.length > 0 && (
              <span
                className="
            next"
              >
                {DashBoardDT[0].us}
              </span>
            )}
          </div>
          <div className="childen">
            <span className="first">Total Quiz</span>
            {DashBoardDT.length > 0 && (
              <span
                className="
            next"
              >
                {DashBoardDT[1].qz}
              </span>
            )}
          </div>
          <div className="childen">
            <span className="first">Total Questions</span>
            {DashBoardDT.length > 0 && (
              <span
                className="
            next"
              >
                {DashBoardDT[2].qs}
              </span>
            )}
          </div>
          <div className="childen">
            <span className="first">Total Answers</span>
            {DashBoardDT.length > 0 && (
              <span
                className="
            next"
              >
                {DashBoardDT[3].as}
              </span>
            )}
          </div>
        </div>
        <div className="right-content">
          {" "}
          <ResponsiveContainer width="100%" height="auto"></ResponsiveContainer>
          <BarChart
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
            data={DashBoardDT}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="us" fill="#fda900ff" />
            <Bar dataKey="qz" fill="#82ca9d" />
            <Bar dataKey="qs" fill="#8884d8" />
            <Bar dataKey="as" fill="#ff2f00ff" />
          </BarChart>
          <ResponsiveContainer />
        </div>
      </div>
    </>
  );
};
export default DashBoard;
