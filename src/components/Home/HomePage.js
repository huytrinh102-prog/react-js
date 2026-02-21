import videohomepage from "../../assets/video-homepage1.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomePage = () => {
  const islogin = useSelector((state) => state?.user?.isLogin);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video className="video-over" autoPlay muted loop>
        <source src={videohomepage} type="video/mp4" />
      </video>
      <div className="video-overlay" />
      <div className="homepage-contain">
        <div className="title-1">Hello Im Yuu</div>
        <div className="title-2">enjoy my music</div>
        <div className="title-3">
          {islogin ? (
            <button onClick={() => navigate("/users")}>Get Start</button>
          ) : (
            <button onClick={() => navigate("/login")}>Doing Right Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
