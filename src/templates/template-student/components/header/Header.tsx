 
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../../../../redux/apis/authApi';
import { useAppSelector } from '../../../../redux/store';
import { User } from '../../../../redux/types/User';
import { ROLES } from '../../../../router/router';

export default function () {
  const user: User | null = useAppSelector(state => state.userState.user)

  const {
    handleSubmit,
  } = useForm<{}>({});

  const navigate = useNavigate();

  const [logoutUser, { isLoading, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Você encerrou sua sessão com sucesso!');
      window.location.reload()
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
    await logoutUser()
  };

  return (
    <header className='py-6 mb-12  bg-backgroundColorPrimary'>
      <div className='container sm:flex-col md:flex-row lg:flex-row xl:flex-row mx-auto flex justify-between items-center bg-backgroundColorPrimary'>
        {
          user?.role === ROLES[ROLES.TEACHER] ?
          <>
            <Link to="/environment/teacher/home" className='hover:text-violet-900'>Início</Link>
            <div className='flex items-center gap-6'>
              <Link to="/environment/teacher/collaboration-disciplines/list" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Disciplinas</Link>
              <Link to="/environment/teacher/collaboration-activities/list" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Atividades</Link>
              <Link to="/environment/student/game-select" className='bg-violet-800 text-white px-4 py-3 rounded-lg transition'>Jogos</Link>
            </div>
          </> :
          <div>
            <Link className='w-full my-5 py-2 px-2 hover:text-white text-gray-400 font-semibold rounded-lg text-3xl' to="/environment/student/game-select" replace={true}>
              Início
            </Link>
          </div>
        }
        
        <div className='w-auto rounded p-3 text-primary bg-white'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button type='submit'>Encerrar sessão</button>
          </form>
        </div>
      </div>
    </header>
  )
}
