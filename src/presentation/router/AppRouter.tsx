import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../features/auth/routes/AuthRoutes";
import { Checking } from "../shared/components/Checking";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { RegisterRoutes } from "../features/register/routes/RegisterRoutes";
import { ClientRoutes } from "../features/clients/routes/ClientRoutes";
import { JournalRoutes } from "../features/journal/routes/JournalRoutes";

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === "checking") return <Checking />;

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/register/*" element={<RegisterRoutes />} />
          <Route path="/client/*" element={<ClientRoutes />} />
          <Route path="/journal/*" element={<JournalRoutes />} />
          <Route path="/*" element={<Navigate to="/register" />} />{" "}
        </>
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
