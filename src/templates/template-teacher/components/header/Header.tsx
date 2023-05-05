 
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../../../../redux/apis/authApi';

interface HeaderProps {
  bg: string
  variant: string
}

export default function Header(props: HeaderProps) {

  const {
    handleSubmit,
  } = useForm<{}>({});

  const [logoutUser, { isLoading, isError, error, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logout');
      window.location.reload()
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
    <header className='py-6  bg-backgroundColorHeaderPrimary'>
    <div className='container sm:flex-col md:flex-row lg:flex-row xl:flex-row mx-auto flex justify-between items-center bg-backgroundColorHeaderPrimary'>
      <div><Link className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-3xl' to="#home">Inicio</Link></div>
      <div className='flex items-center gap-6'>
        <Link to="#features" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl' >Features</Link>
        <Link to="#features" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl' >Features</Link>
        <Link to="#features" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl' >Features</Link>
      </div>
      <div className='my-5 p-2 bg-buttonColor shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <button type='submit'>Deslogar</button>
        </form>
      </div>
    </div>
  </header>
  )
}
