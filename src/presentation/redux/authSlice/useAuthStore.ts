import { useDispatch } from "react-redux";
import { checkingCredentials, login, logout } from "./authSlice";
import { LoginDto } from "../../../domain";
import { AuthFirebaseDatasource, AuthRepository } from "../../../data";

const authFirebaseDatasource = new AuthFirebaseDatasource();

const authRepository = new AuthRepository(authFirebaseDatasource);

export const useAuthStore = () => {

  const dispatch = useDispatch();

  const checkCredentials = () => {

    return async () => {
      dispatch(checkingCredentials());
    };
  }

  const startCreatingUserWithEmailPassword = (formData: {[key: string]: string} ) => {

    // TODO llamar a la funcion de crear user de firebase

    console.log(formData);
    //dispatch(login(user));
  }

  const startGoogleSingIn = async ()=> {

    dispatch(checkingCredentials());

    const user = await authRepository.loginWithGoogle();

    console.log(user);

    dispatch(login(user));

  }

  const startLoginWithEmailAndPassword = async (formData: {[key: string]: string} ) => {

    const [error, loginDto] = LoginDto.create(formData);

    if(error){
      console.log(error);
      return;
    }

    const user = await authRepository.login(loginDto!); 

    dispatch(login(user));
  }

  const startLogout = async () => {

    await authRepository.logout()

    dispatch(logout());
  }


  return {
    checkCredentials,
    startGoogleSingIn,
    startCreatingUserWithEmailPassword,
    startLoginWithEmailAndPassword,
    startLogout
  } 
}; 

