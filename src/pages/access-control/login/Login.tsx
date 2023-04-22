import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { User } from "../../../redux/types/User";
import { ROLES } from "../../../router/router";
import FormLogin from "../components/forms/form-login/FormLogin";

export default function Login() {
  const user: User | null = useAppSelector(state => state.userState.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      if(user?.role === ROLES[ROLES.TEACHER]) {
        navigate('/environment/teacher/collaboration-disciplines/list', { replace: true });
      }else if(user?.role === ROLES[ROLES.STUDENT]) {
        navigate('/environment/student/game-select', { replace: true });
      }
    }
  }, [user])
  

  return (
    <>
      <FormLogin user={user} />
    </>
  )
}
