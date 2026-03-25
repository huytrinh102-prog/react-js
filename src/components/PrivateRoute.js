import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const islogin = useSelector((state) => state?.user?.isLogin);
  if (!islogin) {
    return <Navigate to="/login" />;
  } else {
    return <>{props.children}</>;
  }
};
export default PrivateRoute;
