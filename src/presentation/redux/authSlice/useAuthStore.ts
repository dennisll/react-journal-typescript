import { useDispatch } from "react-redux";
import { login, logout} from "./authSlice";
import { jwtDecode } from "jwt-decode";

//const authFirebaseDatasource = new AuthFirebaseDatasource();

//const authRepository = new AuthRepository(authFirebaseDatasource);

export const useAuthStore = () => {

  const dispatch = useDispatch();

/* 
  const checkCredentials = () => {
    return async () => {
      dispatch(checkingCredentials());
    };
  };

  const startCreatingUserWithEmailPassword = async (token: string) => {

    console.log(token)

    let decodedToken = null;

    try {

      decodedToken = jwtDecode(token);

    } catch (error) {

      dispatch(setMessage(error as string));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 3000);
      return;
    }

    const { aud } = decodedToken;

    console.log(decodedToken)

    const user = new User("dennis", aud as string);

    dispatch(login(user));
  };
 
  
  const startGoogleSingIn = async () => {
    dispatch(checkingCredentials());

    const user = await authRepository.loginWithGoogle();

    dispatch(login(user));
  };
*/

  const startLogin = async ( token: string) => {

    const decode = jwtDecode(token);
      
          const time = new Date().getSeconds();
      
          if(time > decode.exp!){
            dispatch(logout());
          }
    
          const {displayName, email, id} = decode as {[key: string]: string};
      
          dispatch(login({displayName: displayName, email: email, id: id}));
  };

  const startLogout = async () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return {
    //checkCredentials,
    //startGoogleSingIn,
    //startCreatingUserWithEmailPassword,
    startLogin,
    startLogout,
  };
};
