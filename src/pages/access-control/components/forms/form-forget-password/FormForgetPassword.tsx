import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import FullScreenLoader from '../../../../../components/loader/full-screen-loader/FullScreenLoader';
import { useRecoverPasswordMutation } from '../../../../../redux/apis/userApi';

export interface IRecoverPasswordInputs {
  email: string
}

const schemaForgetPassword = z.object({
  email: z.string().email(),
});

export default function FormForgetPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRecoverPasswordInputs>({
    resolver: zodResolver(schemaForgetPassword),
  });

  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation();

  const onSubmitHandler: SubmitHandler<IRecoverPasswordInputs> = async (values) => {
    await recoverPassword(values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  if(isSubmitting || isLoading) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  return (
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-white font-bold text-center">ESQUECI A SENHA</h2>

      <div className="flex flex-col text-gray-400 py-2" >
        <h3>Email:</h3> 
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder="Email*" {...register("email")} />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>
 

      <div className='flex justify-around mb-2'>
        <Link to={`/access-control/login`}>
         <div className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Acessar conta</div>
          </Link>
        <Link to={`/access-control/sign-up`}>
        <div className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Cadastre-se</div>  
          </Link>
      </div>

      <div className="flex justify-center">
        <button className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">
          Recuperar senha
        </button>
      </div>
    </form>
  )
}
