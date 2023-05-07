import { Navigate, Outlet } from "react-router-dom"
import loginImg from '../../assets/login.jpg'
import { useAppSelector } from "../../redux/store"
import { ROLES } from "../../router/router"

export default function TemplateAccessControl() {
  const user = useAppSelector(state => state.userState.user)

  if(user) {
    if(user?.role === ROLES[ROLES.TEACHER]) {
      <Navigate to='/environment/teacher/collaboration-disciplines/list' replace />
    }else if(user?.role === ROLES[ROLES.STUDENT]) {
      <Navigate to='/environment/student/game-select' replace />
    }
  }
  
  return (
    <> 
        <div className='flex justify-center items-center h-screen bg-backgroundColorPrimary'>
          <Outlet />   
        </div> 
    </>
  )
}