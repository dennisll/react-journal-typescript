import { Navigate, Route, Routes } from "react-router-dom"
import { CreateClientPage} from "../pages/CreateClientPage"
import { ClientSearchPage } from "../pages/ClientSearchPage"
import { UpdateClientPage } from "../pages/UpdateClientPage"





export const ClientRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<CreateClientPage/>} />
        <Route path="/:id" element={<UpdateClientPage/>} />
        <Route path="/search" element={<ClientSearchPage/>} />
         <Route path="/*" element={<Navigate to="/client" />} />
    </Routes>
  )
}
