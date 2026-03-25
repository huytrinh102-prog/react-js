import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { UpdateProfile } from "../../services/apiServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../redux/userSlice";

const UserImformation = ({ show, handleClose }) => {
  // code xử lý create user

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [preview, setpreview] = useState("");
  const [email, setemail] = useState("");
  const password = "";
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const t = useSelector((state) => state.user.account);
  useEffect(() => {
    if (!show) return;
    if (_.isEmpty(t)) return;

    setemail(t.email || "");
    setusername(t.username || "");
    setrole(t.role || "");
    setimage("");
    if (t.image) setpreview(`data:image/jpeg;base64,${t.image}`);
    else setpreview("");
  }, [show, t]);

  const handleimgchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setpreview(URL.createObjectURL(file));
    }
  };

  const handlesubmitUpdateUser = async () => {
    let res = await UpdateProfile(username, image);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      const updated = res?.data?.DT;
      if (updated && typeof updated === "object") {
        dispatch(updateAccount(updated));
      } else {
        dispatch(updateAccount({ username }));
      }
      if (handleClose) handleClose();
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handlesubmitUpdateUser();
      }}
    >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            value={password}
            disabled
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUsename">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setrole(e.target.value)}
            disabled
          >
            <option value="" disabled>
              Choose...
            </option>
            <option>User</option>
            <option>Admin</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group className="imageform-add" as={Col} controlId="imageform">
        <Form.Label className="upload-box">
          <FcPlus className="upload-icon" />
          Upload file IMG
        </Form.Label>
        <input hidden type="file" id="imageform" onChange={handleimgchange} />
      </Form.Group>
      <div className="imageform-preview">
        {!preview && <span>Preview Image</span>}
        {/* <span>Preview Image</span> */}
        {preview && <img src={preview} alt="preview img" />}
      </div>
      <div className="mt-3">
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </Form>
  );
};
export default UserImformation;
