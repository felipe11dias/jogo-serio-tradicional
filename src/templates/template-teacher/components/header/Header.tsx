 
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="#home"></Link>
        <div className='flex items-center gap-6'>
          <Link to="#home" className='hover:text-violet-900' >Home</Link>
          <Link to="#features" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition' >Features</Link>
          <Link to="#pricing" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition' >Pricing</Link>
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
