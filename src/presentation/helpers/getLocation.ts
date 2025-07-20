
interface CustomLocation {
  lat: string;
  long: string;
  imageUrl: string;
}

export const getLocation = (apiKey: string = ''): [error?: string, customLocation?: CustomLocation] => {

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

         return [undefined, customLocation];
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
        return[message, undefined];
      }
    );
  }
  else{
    return ["Geolocation is not supported by this browser.", undefined];
  }
  return ["Geolocation is not supported by this browser.", undefined];
};
