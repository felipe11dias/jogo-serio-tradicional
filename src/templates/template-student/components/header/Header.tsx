 
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
    
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
    await logoutUser()
  };

  return (
    <header className='py-6  bg-backgroundColorHeaderPrimary'>
      <div className='  container sm:flex-col md:flex-row lg:flex-row xl:flex-row mx-auto flex justify-between items-center bg-backgroundColorHeaderPrimary'>
        {
          user?.role === ROLES[ROLES.TEACHER] ?
          <>
            <Link to="/environment/teacher/home" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-3xl'>Início</Link>
            <div className='flex items-center gap-6'>
              <Link to="/environment/teacher/collaboration-disciplines/list" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl'>Disciplinas</Link>
              <Link to="/environment/teacher/collaboration-activities/list" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl'>Atividades</Link>
              <Link to="/environment/student/game-select" className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl'>Jogos</Link>
            </div>
          </> :
          <div>
            <Link className='w-full my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-3xl' to="/environment/student/game-select" replace={true}>
              Início
            </Link>
          </div>
        }
        
        <div className='my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton-500/50 hover:shadow-hoverColorButton-500/40 text-textColorPrimary font-semibold rounded-lg'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button type='submit'>Encerrar sessão</button>
          </form>
        </div>
      </div>
    </header>
  )
}
