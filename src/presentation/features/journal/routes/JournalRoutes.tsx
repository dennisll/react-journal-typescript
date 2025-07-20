import { Navigate, Route, Routes } from "react-router-dom"
import { JournalSearchPage } from "../pages/JournalSearchPage"
import { CreateJournalPage } from "../pages/CreateJournalPage";
import { JournalPage } from "../pages/JournalPage";





export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<CreateJournalPage/>} />
        <Route path="/search" element={<JournalSearchPage/>} /> 
        <Route path="/:id" element={<JournalPage/>} /> 
        <Route path="/*" element={<Navigate to="/journal" />} /> 
    </Routes>
  );
}
