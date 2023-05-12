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
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-textColorThird font-bold text-center my-10 ">ESQUECI A SENHA</h2>

      <div className="flex flex-col text-textHintColor py-2" >
        <h3>Email:</h3> 
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2 focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Email*" {...register("email")} />
        <p className='text-errTextColor'>{errors.email?.message}</p>
      </div>
 

      <div className='flex justify-between'>
        <Link to={`/access-control/login`}>
         <div className='text-center w-full my-5 py-2 px-2  text-textColorFoured hover:text-textColorThird shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 font-semibold rounded-lg'>Acessar conta</div>
          </Link>
        <Link to={`/access-control/sign-up`}>
        <div className='text-center w-full my-5 py-2 px-2  text-textColorFoured hover:text-textColorThird shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 font-semibold rounded-lg'>Cadastre-se</div>  
          </Link>
      </div>

      <div className="flex justify-center">
        <button className='text-center w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
          Recuperar senha
        </button>
      </div>
    </form>
  )
}
