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
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if (isSuccess && user) {
      toast.success('Você acessou sua conta com sucesso');
      if(user?.role === ROLES[ROLES.TEACHER]) {
        navigate('/environment/teacher/home', { replace: true });
      }else if(user?.role === ROLES[ROLES.STUDENT]) {
        navigate('/environment/student/game-select', { replace: true });
      }
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
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-white font-bold text-center">LOGIN</h2>

      <div className='flex flex-col text-gray-400 py-2' > 
        <h3>Email:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder="Email*" {...register("username")} />
        <p className='text-red-500'>{errors.username?.message}</p>
      </div>

      <div className='flex flex-col text-gray-400 py-2' > 
        <h3>Senha:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" placeholder="Senha*" {...register("password")} />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
 

      <div className='flex justify-between mx-5 mb-2'>
        <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/access-control/forget-password`}>
          Esqueci a senha
        </Link>
        <Link  className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'to={`/access-control/sign-up`}>
          Cadastre-se
        </Link>
      </div>

      <div className="flex justify-center">
        <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">
          Acessar
        </button>
      </div>
    </form>
  )
}
