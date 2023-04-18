import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { User } from "../redux/types/User";
import { checkToken } from "../service/authService";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const token = checkToken();
  const user: User | null = useAppSelector(state => state.userState.user)

  console.log(user)
  
  return token && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/access-control/login' state={{ from: location }} replace />
  );
};  

export default RequireUser;