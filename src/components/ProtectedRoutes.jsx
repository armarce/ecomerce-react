import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {

  if (localStorage.getItem("token") === null) {
    
    return <Navigate to="/login" />;
    
  } else {
    
    return <Outlet />;
  } 
};