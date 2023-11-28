import {
  Navigate,
  Outlet
} from "react-router-dom";
import FullScreenLoader from "../components/loader/full-screen-loader/FullScreenLoader";
import { useGetMeQuery } from "../redux/apis/userApi";
import { getToken } from "../service/authService";


const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = getToken();
  
  const { data: user, isLoading } = useGetMeQuery(null, {
    skip: !token
  });

  if(isLoading && !user) {
    return (
      <>
        <FullScreenLoader />
      </>
    )
  }

  if(!user) {
    localStorage.clear();
  }
  
  return token && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : token && !allowedRoles.includes(user?.role as string) ? (
    <>
      <Navigate to='/access-control/login' state={ { message: "Você não tem permissão de acesso para a página requisitada!", type: 'error' }  } replace />
    </>
  ) : (
    <>
      <Navigate to='/access-control/login' state={ { message: "Sessão encerrada!", type: 'success' } } replace />
    </>
  );
};  

export default RequireUser;