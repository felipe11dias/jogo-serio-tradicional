import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "../components/loader/FullScreenLoader/FullScreenLoader";
import { userApi } from "../redux/apis/userApi";
import { checkToken } from "../service/authService";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  //  const user: User | null = useAppSelector(state => state.userState.user)
  const token = checkToken();
  
  const location = useLocation();
  
  //const { data: user, isLoading, isError, error } = useGetMeQuery(null);

  const { data: user, isLoading, isError, error } = userApi.endpoints.getMe.useQuery(null, {
    skip: !token,
  });
  
  
  if (isError) {
    if(Array.isArray((error as any).data)) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
        toast.error(el.message)
        );
      } else {
        toast.error((error as any).data.message);
      }
    }
  }
  
  console.log("user: ", user)
  console.log("token: ", token)
  console.log("isLoading: ", isLoading)
  
  if(isLoading && !user) {
    return (
      <>
        <FullScreenLoader />
      </>
    )
  }
  
  return token && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : (
    <Navigate to='/access-control/login' state={{ from: location }} replace />
  );
};  

export default RequireUser;