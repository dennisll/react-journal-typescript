import { getEnvironments } from "../../config/getEnvironments";

const {VITE_APIKEY_CLOUDINARY} = getEnvironments();

export const fileUpload = async (file: File) => {
  
  
  if(!file) return null;

  const cloudUrl = "https://api.cloudinary.com/v1_1/dnsf5hicd/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  formData.append("api_key", VITE_APIKEY_CLOUDINARY);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if(!resp.ok) throw new Error("No se pudo subir la imagen");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;

  } catch (error) {

    console.log(error);
    return null;
    //console.log(error);
    //throw new Error(error.message)
  }
};
