import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";

const inititalState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, clearAlert }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, inititalState, useAppContext };
