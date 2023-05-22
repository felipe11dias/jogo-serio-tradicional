 
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

  const [logoutUser, { isLoading, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Você encerrou sua sessão com sucesso!');
      window.location.reload()
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
        <Link to="/environment/teacher/home" className='my-5 py-2 px-2 text-textColorPrimary hover:text-hoverColorButtonSecondary font-semibold rounded-lg text-3xl hover:scale-125 hover:bg-hoverColorFooter  hover:cursor-pointer'>Início</Link>  
        <div className='flex items-center gap-6 px-10'>
          <Link to="/environment/teacher/collaboration-disciplines/list" className='w-full hover:text-hoverColorButtonSecondary my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl hover:scale-125 hover:bg-hoverColorFooter  hover:cursor-pointer'>Disciplinas</Link>
          <Link to="/environment/teacher/collaboration-activities/list" className='w-full hover:text-hoverColorButtonSecondary my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl hover:scale-125 hover:bg-hoverColorFooter  hover:cursor-pointer'>Atividades</Link>
          <Link to="/environment/student/game-select" className='w-full hover:text-hoverColorButtonSecondary my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl hover:scale-125 hover:bg-hoverColorFooter  hover:cursor-pointer'>Jogos</Link>
          <Link to="/environment/student/ranking" className='w-full hover:text-hoverColorButtonSecondary my-5 py-2 px-2 text-textColorPrimary font-semibold rounded-lg text-xl hover:scale-125 hover:bg-hoverColorFooter  hover:cursor-pointer'>Classificação</Link>
        </div>
        <div className='bg-buttonColor p-2 hover:text-hoverColorButtonSecondary hover:bg-errTextColor text-textColorPrimary font-semibold rounded-lg'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button type='submit'>Encerrar sessão</button>
          </form>
        </div>
      </div>
      
  </header>
  )
}
