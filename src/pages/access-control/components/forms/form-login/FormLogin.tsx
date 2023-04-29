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
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
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
    if (isSuccess && user) {
      console.log(user)
      toast.success('You successfully logged in');
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
    // 👇 Executing the loginUser Mutation
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
      <h2 className="text-4xl text-textColorPrimary font-bold text-center">Logar</h2>

      <div className='flex flex-col text-textHintColor py-2' > 
        <h3>Email:</h3>
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Email*" {...register("username")} />
        <p className='text-errTextColor'>{errors.username?.message}</p>
      </div>

      <div className='flex flex-col text-textHintColor py-2' > 
      <h3>Senha:</h3>
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Senha*" {...register("password")} />
        <p className='text-errTextColor'>{errors.password?.message}</p>
      </div>
 

      <div className='flex justify-between mx-5 mb-2 p-lg'>
        <Link className='w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/access-control/forget-password`}>
          Esqueceu a senha
        </Link>
        <Link  className='w-full  my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/access-control/sign-up`}>
          Se inscrever
        </Link>
      </div>

      <div className="flex justify-center">
        <button className='w-full my-5 py-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
          Enviar
        </button>
      </div>
    </form>
  )
}
