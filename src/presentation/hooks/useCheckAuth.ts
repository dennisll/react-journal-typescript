import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FirebaseAuth } from "../../config/firabaseConfig";
import { login, logout } from "../redux/authSlice/authSlice";
import { User as UserEntity} from "../../domain";


export const useCheckAuth = () => {
  
  const { status } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatch();

  useEffect(() => {
    
    onAuthStateChanged(FirebaseAuth, async (user) => {

      if (!user) return dispatch(logout());

      const {uid, emailVerified, displayName, email} = FirebaseAuth.currentUser!;
  
      const userAuth = new UserEntity(
        uid,
        displayName!,
        email!,
        emailVerified,
        ""
      );

      dispatch(login(userAuth));
      //dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};
