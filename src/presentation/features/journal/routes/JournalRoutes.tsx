import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"
import { JournalSearchPage } from "../pages/JournalSearchPage"





export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<JournalPage/>} />
        <Route path="/search" element={<JournalSearchPage/>} />
         <Route path="/*" element={<Navigate to="/journal" />} /> 
    </Routes>
  );
}
