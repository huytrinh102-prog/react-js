import NavDropdown from "react-bootstrap/NavDropdown";
import "../../components/Auth/Loginconver.scss";
import { useTranslation } from "react-i18next";
const Language = (props) => {
  const { className = "" } = props || {};
  const { i18n } = useTranslation();
  const handlechangelanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <NavDropdown
        className={`language ${className}`.trim()}
        title={i18n.language === "en" ? "ENGLISH" : "日本語"}
        id="basic-nav-dropdown"
        data-toggle="dropdown"
      >
        <NavDropdown.Item onClick={() => handlechangelanguage("en")}>
          ENGLISH
        </NavDropdown.Item>{" "}
        <NavDropdown.Item onClick={() => handlechangelanguage("ja")}>
          日本語
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
