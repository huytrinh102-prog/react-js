import App from "./App";
import Admin from "./components/ Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManegeUser from "./components/ Admin/content/ManegeUser";
import Dashboard from "./components/ Admin/content/DashBoard";
import Login from "./components/Auth/login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/ Admin/Quiz/ManageQuiz";
import ManageQuestion from "./components/ Admin/content/Question/ManageQuestion";
const Layout = (props) => {
  const NotFound = () => {
    return (
      <div className=" mt-4 alert alert-danger" role="alert">
        Not found current data
      </div>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={<Admin />}>
          <Route path="ManegeUser" element={<ManegeUser />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Manage-quizzes" element={<ManageQuiz />} />
          <Route path="Manage-questions" element={<ManageQuestion />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default Layout;
