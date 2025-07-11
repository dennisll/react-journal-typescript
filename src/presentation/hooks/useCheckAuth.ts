import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FirebaseAuth } from "../../config/firabaseConfig";
import { login, logout } from "../redux/authSlice/authSlice";
import { User } from "../../domain";


export const useCheckAuth = () => {
  
  const { status } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatch();

  useEffect(() => {
    
    onAuthStateChanged(FirebaseAuth, async (user) => {

      if (!user) return dispatch(logout());

      const userEntity = User.getUserFromObject(user);

      dispatch(login(userEntity));
      //dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};
