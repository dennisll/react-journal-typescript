import { useAppDispatch } from "../reduxHooks";
import {
  createRegister,
  deleteRegister,
  setActiveRegister,
  setErrorMessage,
  setIsLoading,
  setRegisters,
  updateRegister,
} from "./registerSlice";
import { RegisterFirebaseDatasource, RegisterRepository } from "../../../data";
import { CreateRegisterDto, UpdateRegisterDto } from "../../../domain";
import type { Register } from "../../../domain/entities/register";

const registerDatasource = new RegisterFirebaseDatasource();
const registerRepository = new RegisterRepository(registerDatasource);

export const useRegisterStore = () => {

  function customSetTimeOut() {
    setTimeout(() => {
      dispatch(dispatch(setErrorMessage(null)));
    }, 3000);
  }

  const dispatch = useAppDispatch();

  const onCreateRegister = async (object: { [key: string]: string }) => {

    const { userId, lat, long, errorLocation } = object;

    console.log({ userId, lat, long, errorLocation })

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

    if (error) {
      dispatch(setIsLoading(false));

      dispatch(setErrorMessage(error));

      customSetTimeOut();

      return;
    }

    const register = await registerRepository.create(registerDto!);

    console.log(register);

    dispatch(createRegister(register));

    /*    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          dispatch(setIsLoading(true));

          const formData = {
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
            imageUrl: "imageUrl",
            idUser: userId,
          };

          const [error, registerDto] = CreateRegisterDto.create(formData);

          if (error) {
            dispatch(setIsLoading(false));

            dispatch(setErrorMessage(error));

            setTimeout(() => {
              dispatch(dispatch(setErrorMessage(null)));
            }, 3000);

            return;
          }

          const register = await registerRepository.create(registerDto!);

          dispatch(createRegister(register));
        },

        (error) => {
          dispatch(setErrorMessage(error.message));

          setTimeout(() => {
            dispatch(dispatch(setErrorMessage(null)));
          }, 3000);
        }
      );
    } else {
      dispatch(
        setErrorMessage("Geolocation is not supported by this browser.")
      );

      setTimeout(() => {
        dispatch(dispatch(setErrorMessage(null)));
      }, 3000);
    } */
  };

  const onGetRegisters = async (object: { [key: string]: string }) => {
    const { idUser, data } = object;

    dispatch(setIsLoading(true));
    const registers = await registerRepository.getRegisters({ idUser, data });
    dispatch(setRegisters(registers));
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
    onCreateRegister,
    onGetRegisters,
    onUpdateRegister,
    onSetActiveRegister,
    onDeleteRegister,
  };
}
