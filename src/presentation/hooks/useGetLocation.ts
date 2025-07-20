import { useState } from "react";
import { getEnvironments } from "../../config/getEnvironments";
//import { getLocation } from "../helpers/getLocation";

interface CustomLocation {
  lat: string;
  long: string;
  imageUrl: string;
}

const {VITE_MAPS_KEY} = getEnvironments();

export const useGetLocation = () => {

  const [location, setLocation] = useState<
    [error?: string, customLocation?: CustomLocation]
  >([]);
  
  const setCustomLocation = (apiKey: string = VITE_MAPS_KEY) => {
  
    if (navigator.geolocation) {
  
      navigator.geolocation.getCurrentPosition(
  
        async (position: GeolocationPosition) => {
  
          const lat =  position.coords.latitude.toString();
          const long = position.coords.longitude.toString();
  
          const customLocation: CustomLocation = {
            lat,
            long,
            imageUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=15&size=400x300&key=${apiKey}`,
          };
  
          setLocation([undefined, customLocation]);
        },
        (error) => {
  
          let message: string;
  
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "Permiso denegado por el usuario.";
              break; //return ["Permiso denegado por el usuario.", undefined]
            case error.POSITION_UNAVAILABLE:
              message = "La posición no está disponible.";
              break;
            case error.TIMEOUT:
              message = "Tiempo de espera agotado.";
              break;
            default:
              message = error.message;
          }
          setLocation([message, undefined]);
        }
      );
    }

    setLocation(["Geolocation is not supported by this browser.", undefined]);
  };

  return {
    location, setCustomLocation
  }
  
};
