import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {

  const tokenExists = () => localStorage.getItem("token") !== "";

  if (tokenExists()) {

    return <Outlet/>;

  }else{

    return <Navigate to="/login"/>;

  }

};
