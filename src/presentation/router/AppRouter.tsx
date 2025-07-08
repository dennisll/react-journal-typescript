import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../features/auth/routes/AuthRoutes"
import { JournalRoutes } from "../features/journal/routes/JournalRoutes"
import { RegisterRoutes } from "../features/register/routes/RegisterRoutes"
import { ClientRoutes } from "../features/clients/routes/ClientRoutes"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/auth/*" element={<AuthRoutes/>} />
        <Route path="/journal/*" element={<JournalRoutes/>} />
        <Route path="/register/*" element={<RegisterRoutes/>} />
        <Route path="/client/*" element={<ClientRoutes/>} />
        <Route path="*" element={<RegisterRoutes/>} />
    </Routes>
  );
}
