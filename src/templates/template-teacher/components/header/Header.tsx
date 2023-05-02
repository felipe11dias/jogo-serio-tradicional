 
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
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="/environment/teacher/home" className='hover:text-violet-900'>Início</Link>  
        <div className='flex items-center gap-6'>
          <Link to="/environment/teacher/collaboration-disciplines/list" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Disciplinas</Link>
          <Link to="/environment/teacher/collaboration-activities/list" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Atividades</Link>
          <Link to="/environment/student/game-select" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Jogos</Link>
        </div>
        <div className='w-auto rounded p-3 text-primary bg-white'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button type='submit'>Encerrar sessão</button>
          </form>
        </div>
      </div>
    </header>
  )
}
