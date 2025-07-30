import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterEntryPage } from "../pages/RegisterEntryPage";
import { RegisterSearchPage } from "../pages/RegisterSearchPage";
import { UpdateRegisterEntryPage } from "../pages/UpdateRegisterEntryPage";
import { useRenewTokenQuery } from "../../../redux/services/authApi";

export const RegisterRoutes = () => {

  const token = localStorage.getItem("token");

  const { data, isSuccess } = useRenewTokenQuery(token!);

  if(isSuccess){
    const {token} = data;
    localStorage.setItem('token', token);
  }

  return (
    <Routes>
      <Route path="/" element={<RegisterEntryPage />} />
      <Route path="/:id" element={<UpdateRegisterEntryPage />} />
      <Route path="/search" element={<RegisterSearchPage />} />
      <Route path="/*" element={<Navigate to="/register" />} />
    </Routes>
  );
};
