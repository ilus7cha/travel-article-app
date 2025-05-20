import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { login, register } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = (email: string, password: string) => {
    return dispatch(
      login({
        identifier: email,
        password,
      })
    );
  };

  const registerUser = (email: string, password: string) => {
    return dispatch(
      register({
        email,
        password,
      })
    );
  };

  return { loginUser, registerUser };
};
