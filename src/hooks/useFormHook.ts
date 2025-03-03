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
type Action =
  | { type: "SET_FIELD"; payload: { field: string; value: string } }
  | { type: "SET_ERROR"; payload: { field: string; error: string } }
  | { type: "SET_ERRORS"; payload: Partial<typeof initialState> }
  | { type: "RESET_FORM" };

const formReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_ERROR":
      return {
        ...state,
        [`${action.payload.field}Error`]: action.payload.error,
      };
    case "SET_ERRORS":
      return { ...state, ...action.payload };
    case "RESET_FORM":
      return initialState;
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
          break;
        case "password":
          errorMessage = validatePassword(value);
          break;
        case "confirmPassword":
          errorMessage = validateConfirmPassword(state.password, value);
          break;
        case "userName":
          errorMessage = validateUserName(value);
          break;
        default:
          break;
      }
      dispatch({
        type: "SET_ERROR",
        payload: { field, error: errorMessage },
      });
    },
    [state.password] // password는 confirmPassword의 검증에 사용되므로 의존성에 추가
  );

  const validateForm = async () => {
    const [emailError, passwordError, confirmPasswordError, userNameError] =
      await Promise.all([
        validateEmail(state.email),
        // 동기 함수는 Promise로 감싸기
        Promise.resolve(validatePassword(state.password)),
        Promise.resolve(
          validateConfirmPassword(state.password, state.confirmPassword)
        ),
        Promise.resolve(validateUserName(state.userName)),
      ]);
    const errors: Partial<typeof initialState> = {
      emailError,
      passwordError,
      confirmPasswordError,
      userNameError,
    };
    dispatch({ type: "SET_ERRORS", payload: errors });

    return !Object.values(errors).some((error) => error !== "");
  };

  // 폼 초기화
  const resetForm = () => {
    dispatch({
      type: "RESET_FORM",
    });
  };

  return { state, handleChange, validateForm, resetForm };
};
