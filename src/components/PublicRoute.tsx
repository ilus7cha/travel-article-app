import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PublicRouteProps {
  children?: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user) {
    return <Navigate to="/articles" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
