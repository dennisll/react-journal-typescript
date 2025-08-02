import { useAppDispatch } from "../reduxHooks";
import {
  //createRegister,
  deleteRegister,
  setActiveRegister,
  setErrorMessage,
  setIsLoading,
  //setRegisters,
  updateRegister,
} from "./registerSlice";
import { RegisterFirebaseDatasource, RegisterRepository } from "../../../data";
import { CreateRegisterDto, UpdateRegisterDto } from "../../../domain";
import type { Register } from "../../../domain/entities/register";
import {
  useCreateRegisterMutation,
} from "../services/registerApi";

const registerDatasource = new RegisterFirebaseDatasource();
const registerRepository = new RegisterRepository(registerDatasource);

export const useRegisterStore = () => {

  const [
    createRegister,
    {
      isError: isCreateError,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      data: createRegisterData,
      error: errorWhileCreate,
    },
  ] = useCreateRegisterMutation();

  function customSetTimeOut() {
    setTimeout(() => {
      dispatch(dispatch(setErrorMessage(null)));
    }, 3000);
  }

  const dispatch = useAppDispatch();

  const onCreateRegister = async (object: { [key: string]: string }) => {
    const { userId, lat, long, errorLocation } = object;

    if (errorLocation) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMessage(errorLocation));

      customSetTimeOut();

      return;
    }

    const formData = {
      lat,
      long,
      imageUrl: "imageUrl",
      idUser: userId,
    };

    const [error, registerDto] = CreateRegisterDto.create(formData);

    //const register = await registerRepository.create(registerDto!);

    createRegister(registerDto!);
  };

  const onGetRegisters = async () => {

    //dispatch(setIsLoading(true));
    //const registers = await registerRepository.getRegisters({ idUser, data });
    //dispatch(setRegisters(registers));
  };

  const onUpdateRegister = async (register: Register) => {
    dispatch(setIsLoading(true));
    const [error, registerDto] = UpdateRegisterDto.create({ ...register });

    if (error) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMessage(error));

      setTimeout(() => {
        dispatch(dispatch(setErrorMessage(null)));
      }, 3000);

      return;
    }

    const registerUpdated = await registerRepository.update(registerDto!);

    dispatch(updateRegister(registerUpdated));
  };

  const onSetActiveRegister = (register: Register) => {
    dispatch(setActiveRegister(register));
  };

  const onDeleteRegister = async (id: string) => {
    dispatch(setIsLoading(true));
    const register = await registerRepository.delete(id);
    dispatch(deleteRegister(register));
  };

  return {

    // create register
    createRegisterData,
    isCreateSuccess,
    isCreateError,
    isCreateLoading,
    errorWhileCreate,

    onCreateRegister,
    onGetRegisters,
    onUpdateRegister,
    onSetActiveRegister,
    onDeleteRegister,
  };
};
