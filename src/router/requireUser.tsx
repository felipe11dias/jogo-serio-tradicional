import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { Auth } from "../redux/types/Auth";
import { User } from "../redux/types/User";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();

  const user: User | null = useAppSelector(state => state.userState.user)
  const auth: Auth | null = useAppSelector(state => state.authState.auth)
  
  return (auth != null && allowedRoles.includes(user?.role || '')) ? (
    <Outlet />
  ) : (
    <Navigate to='/access-control/login' state={{ from: location }} replace />
  );
};

export default RequireUser;