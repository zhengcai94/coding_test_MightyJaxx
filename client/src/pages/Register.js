import { useState, useEffect } from "react";
import { FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { displayAlert, clearAlert, setupUser } from "../store/user-slice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, user } = useSelector((store) => store.user);
  //global state and useNavigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember, name } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(displayAlert());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      dispatch(
        setupUser({
          currentUser,
          endPoint: "login",
          alertText: "Login Successful! Redirecting...",
        })
      );
    } else {
      dispatch(
        setupUser({
          currentUser,
          endPoint: "register",
          alertText: "User Created! Redirecting...",
        })
      );
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
    console.log(values);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h2>
          Sneaker App
        </h2>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
