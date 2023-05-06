import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../../../components/loader/full-screen-loader/FullScreenLoader';
import { useLoginUserMutation } from '../../../../../redux/apis/authApi';
import { useAppSelector } from '../../../../../redux/store';
import { User } from '../../../../../redux/types/User';
import { ROLES } from '../../../../../router/router';


export interface ILoginInputs {
  username: string
  password: string
}

const schemaLogin = z.object({
  username: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email é inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatório')
    .min(8, 'Senha tem que ter no mínimo 8 caracters')
    .max(32, 'Senha tem que ter no maximo 32 caracters'),
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function FormLogin() {
  const user: User | null = useAppSelector(state => state.userState.user)
  
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<ILoginInputs>({
    resolver: zodResolver(schemaLogin),
  });
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('Você acessou sua conta com sucesso!');
      if(user?.role === ROLES[ROLES.TEACHER]) {
        navigate('/environment/teacher/home', { replace: true });
      }else if(user?.role === ROLES[ROLES.STUDENT]) {
        navigate('/environment/student/game-select', { replace: true });
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ILoginInputs> = async (values) => {
    await loginUser(values);
  };

  if(isLoading) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  return (
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-textColorThird font-bold text-center">ACESSAR CONTA</h2>

      <div className='flex flex-col text-textHintColor py-2' > 
        <h3>Email:</h3>
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Email*" {...register("username")} />
        <p className='text-errTextColor'>{errors.username?.message}</p>
      </div>

      <div className='flex flex-col text-textHintColor py-2' > 
        <h3>Senha:</h3>
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="password" placeholder="Senha*" {...register("password")} />
        <p className='text-errTextColor'>{errors.password?.message}</p>
      </div>
 

      <div className='flex justify-between'>
        <Link className='text-center w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/access-control/forget-password`}>
          Esqueci a senha
        </Link>
        <Link  className='text-center w-full my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg'to={`/access-control/sign-up`}>
          Cadastre-se
        </Link>
      </div>

      <div className="flex justify-center">
        <button className='text-center w-full my-5 py-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
          Acessar
        </button>
      </div>
    </form>
  )
}
