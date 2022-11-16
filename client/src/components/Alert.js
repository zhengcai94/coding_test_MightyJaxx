import { useSelector } from "react-redux";

const Alert = () => {
  const { alertType, alertText } = useSelector((store) => store.user)
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
