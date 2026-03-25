import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
const rightcontent = () => {
  // #region Sample data
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "300px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Legend />
      <Bar dataKey="pv" barSize={20} fill="#8884d8" />
    </BarChart>
  );
};
export default rightcontent;
