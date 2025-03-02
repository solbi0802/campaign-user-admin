import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUserName,
} from "../utils";
import { useReducer, useCallback } from "react";
const initialState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  confirmPassword: "",
  confirmPasswordError: "",
  userName: "",
  userNameError: "",
};

// reducer 함수
const formReducer = (
  state: typeof initialState,
  action: {
    type: string;
    payload: { field: string; value?: string; error?: string };
  }
) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_ERROR":
      return {
        ...state,
        [`${action.payload.field}Error`]: action.payload.error,
      };
    default:
      return state;
  }
};

export const useFormHook = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = useCallback(
    async (field: string, value: string) => {
      dispatch({ type: "SET_FIELD", payload: { field, value } });

      let errorMessage = "";
      switch (field) {
        case "email":
          errorMessage = await validateEmail(value);
          dispatch({
            type: "SET_ERROR",
            payload: { field, error: errorMessage },
          });
          break;
        case "password":
          errorMessage = validatePassword(value);
          dispatch({
            type: "SET_ERROR",
            payload: { field, error: errorMessage },
          });
          break;
        case "confirmPassword":
          errorMessage = validateConfirmPassword(state.password, value);
          dispatch({
            type: "SET_ERROR",
            payload: { field, error: errorMessage },
          });
          break;
        case "userName":
          errorMessage = validateUserName(value);
          dispatch({
            type: "SET_ERROR",
            payload: { field, error: errorMessage },
          });
          break;
        default:
          break;
      }
    },
    [state.password] // password는 confirmPassword의 검증에 사용되므로 의존성에 추가
  );

  return { state, handleChange };
};
