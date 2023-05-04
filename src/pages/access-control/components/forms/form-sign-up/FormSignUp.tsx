import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FullScreenLoader from '../../../../../components/loader/full-screen-loader/FullScreenLoader';
import { useRegisterUserMutation } from '../../../../../redux/apis/userApi';
import { useAppSelector } from '../../../../../redux/store';
import { User } from '../../../../../redux/types/User';
import { ROLES } from '../../../../../router/router';


export interface ISignUpInputs {
  email: string
  role: string
  name: string
  password: string
}

const schemaLogin = z.object({
  name: z.string()
    .min(1, 'Senha é obrigatório'),
  role: z.string()
        .min(1, "Perfil é obrigatório"),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatório')
    .min(8, 'Senha tem que ter no mínimo 8 caracters')
    .max(32, 'Senha tem que ter no maximo 32 caracters'),
});

export default function FormSignUp() {
  const user: User | null = useAppSelector(state => state.userState.user)

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ISignUpInputs>({
    resolver: zodResolver(schemaLogin),
  });

  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && isSubmitSuccessful && user) {
      toast.success('Você criou e acessou sua conta com sucesso, aproveite');
      reset();
      if(user?.role === ROLES[ROLES.TEACHER]) {
        navigate('/environment/teacher/home', { replace: true });
      }else if(user?.role === ROLES[ROLES.STUDENT]) {
        navigate('/environment/student/game-select', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  if(isSubmitting || isLoading) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  const onSubmitHandler: SubmitHandler<ISignUpInputs> = async (values) => {
    console.log(values);
    await registerUser(values);
  };

  return (
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-white font-bold text-center">REGISTRE-SE</h2>

      <div className="className='flex flex-col text-gray-400 py-2'" >
        <h3>Perfil:</h3>
        <select className='mt-2 p-2' {...register("role")}>
          <option value="">Selecione</option>
          <option value="STUDENT">Aluno</option>
          <option value="TEACHER">Professor</option>
        </select>
        <p className='text-red-500'>{errors.role?.message}</p>
      </div>

      <div className="className='flex flex-col text-gray-400 py-2'" >
        <h3>Email:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Email*' {...register("email")} />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>

      <div className="className='flex flex-col text-gray-400 py-2" >
        <h3>Nome:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Nome*' {...register("name")} />
        <p className='text-red-500'>{errors.name?.message}</p>
      </div>

      <div className="className='flex flex-col text-gray-400 py-2" >
        <h3>Senha:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" placeholder='Senha*' {...register("password")} />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
 
      <div className="flex justify-between ">
        
        <button className='my-5 py-2 w-28 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">
          Cadastrar
        </button>

        <div className='flex justify-center items-center w-28 my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
        <Link to={`/access-control/login`}>Acessar conta</Link>
      </div>
      </div>
    </form>
  )
}
