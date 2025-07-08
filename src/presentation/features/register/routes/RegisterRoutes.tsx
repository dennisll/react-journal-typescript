import { Route, Routes } from "react-router-dom"
import { RegisterEntryPage } from "../pages/RegisterEntryPage"
import { RegisterSearchPage } from "../pages/RegisterSearchPage"
import { UpdateRegisterEntryPage } from "../pages/UpdateRegisterEntryPage"





export const RegisterRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<RegisterEntryPage/>} />
        <Route path="/:id" element={<UpdateRegisterEntryPage/>} />
        <Route path="/search" element={<RegisterSearchPage/>} />
        {/* <Route path="/" element={<Navigate to="/register" />} /> */}
    </Routes>
  )
}
