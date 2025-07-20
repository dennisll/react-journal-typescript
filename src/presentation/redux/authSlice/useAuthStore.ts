import { useDispatch } from "react-redux";
import { checkingCredentials, login, logout } from "./authSlice";
import { CreateUserDto, LoginDto } from "../../../domain";
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

  const startCreatingUserWithEmailPassword = async (formData: {[key: string]: string} ) => {

    dispatch(checkingCredentials());

    const [error, userDto] = CreateUserDto.create(formData);

    if(error){
      console.log(error);
      return;
    }
    
    const user = await authRepository.createUser(userDto!);

    dispatch(login(user));
  }

  const startGoogleSingIn = async ()=> {

    dispatch(checkingCredentials());

    const user = await authRepository.loginWithGoogle();

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

