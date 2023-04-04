import { Outlet } from "react-router-dom" 
import loginImg from '../../assets/login.jpg'
export default function TemplateAccessControl() {
  return (
    <>
   <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>

<div className='hidden sm:block'>
<img className='w-full h-full object-cover' src={loginImg} alt="" />
</div>
<div className='bg-backgroundColorLogin flex flex-col justify-center'>
  <Outlet />   
</div>
</div>
    </>
  )
}