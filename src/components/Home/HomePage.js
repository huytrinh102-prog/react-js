import videohomepage from "../../assets/video-homepage1.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const islogin = useSelector((state) => state?.user?.isLogin);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video className="video-over" autoPlay muted loop playsInline>
        <source src={videohomepage} type="video/mp4" />
      </video>
      <div className="video-overlay" />
      <div className="homepage-contain">
        <div className="title-1">{t("homepage.part1")}</div>
        <div className="title-2"> {t("homepage.part2")}</div>
        <div className="title-3">
          {islogin ? (
            <button onClick={() => navigate("/users")}>
              {t("homepage.Get Start")}
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              {t("homepage.Doing Right Now")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
