import {
  Navigate,
  Outlet
} from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "../components/loader/full-screen-loader/FullScreenLoader";
import { useGetMeQuery } from "../redux/apis/userApi";
import { getToken } from "../service/authService";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = getToken();
  
  const { data: user, isLoading, isError, error } = useGetMeQuery(null, {
    skip: !token
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
  
  if(isLoading && !user) {
    return (
      <>
        <FullScreenLoader />
      </>
    )
  }

  function notification() {
    toast.error("Você não tem permissão de acesso para a página requisitada")
  }
  
  return token && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : (
    <>
      {notification()}
      <Navigate to='/access-control/login' replace />
    </>
  );
};  

export default RequireUser;