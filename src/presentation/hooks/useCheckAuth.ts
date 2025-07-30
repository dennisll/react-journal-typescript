//import { onAuthStateChanged } from "firebase/auth";
//import { useEffect } from "react";
///import { useDispatch, useSelector } from "react-redux";
//import type { RootState } from "../redux/store";
//import { FirebaseAuth } from "../../config/firabaseConfig";
//import { login, logout } from "../redux/authSlice/authSlice";
//import { User as UserEntity} from "../../domain";

import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { login, logout } from "../redux/authSlice/authSlice";
import { useEffect } from "react";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(logout());

    if (token !== null) {
      const decode = jwtDecode(token);

      const time = new Date().getSeconds();

      if (time > decode.exp!) {
        dispatch(logout());
      }

      const { displayName, email } = decode as { [key: string]: string };

      dispatch(login({ displayName: displayName, email: email }));
    }
  }, []);

  return { status };
};
