import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"
import { EmailPage } from "../pages/EmailPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPase";


export const AuthRoutes = () => {
  return (
   <Routes>
      <Route path="login" element={<LoginPage/>} />
      <Route path="register" element={<RegisterPage/>} />
      <Route path="email-to-reset-password" element={<EmailPage/>} />
      <Route path="reset-password/:token" element={<ResetPasswordPage/>} />


      <Route path="/*" element={<Navigate to="/auth/login" />}/>
   </Routes>
  );
}
