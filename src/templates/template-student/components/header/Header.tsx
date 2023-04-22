 
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../../../../redux/apis/authApi';

export default function () {

  const {
    handleSubmit,
  } = useForm<{}>({});

  const navigate = useNavigate();

  const [logoutUser, { isLoading, isError, error, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logout');
      navigate('/access-control/login', { replace: true })
    }
    
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      } else {
        toast.error((error as any).data.message);
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
    // 👇 Executing the logoutUser Mutation
    await logoutUser()
  };

  return (
    <header className='py-6 mb-12  bg-backgroundColorPrimary'>
      <div className='container sm:flex-col md:flex-row lg:flex-row xl:flex-row mx-auto flex justify-between items-center bg-backgroundColorPrimary'>
        <div><Link className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-3xl' to="#home">Home</Link></div>
        <div className='flex items-center gap-6'>
          <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
          <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
          <Link to="#features" className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-xl' >Features</Link>
        </div>
        <div className='w-auto rounded p-3 text-primary bg-white'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button type='submit'>Logout</button>
          </form>
        </div>
      </div>
    </header>
  )
}
