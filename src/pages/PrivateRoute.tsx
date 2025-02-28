import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles: string[];
  userRoles: string[];
}

const PrivateRoute = ({ roles, userRoles }: PrivateRouteProps) => {
  // 사용자가 어드민 권한을 가지고 있지 않으면 접근을 차단
  if (!roles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
