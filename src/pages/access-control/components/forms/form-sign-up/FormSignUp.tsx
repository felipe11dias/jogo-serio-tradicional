import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FullScreenLoader from '../../../../../components/loader/full-screen-loader/FullScreenLoader';


interface IFormInputs {
  email: string
  username: string
  password: string
}

const schemaLogin = z.object({
  username: z.string()
    .min(1, 'Password is required')
    .min(6, 'Required 6 caracters.'),
  email: z.string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export default function FormSignUp() {

  const {
    register,
    reset,
    handleSubmit,
    formState: { isLoading, isSubmitSuccessful, errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaLogin),
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully create user');
      reset();
      navigate('/access-control/login', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  if(isLoading) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  const onSubmitHandler: SubmitHandler<IFormInputs> = async (values) => {
    console.log(values);
    
  };

  return (
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-4xl text-textColorPrimary font-bold text-center">SIGN UP</h2>

      <div className="className='flex flex-col text-textHintColor py-2'" >
        <h3>Email:</h3>
        <input className='rounded-lg bg-backgroundColorPrimary mt-2 p-2  focus:bg-backgroundColorPrimary focus:outline-none' type="text" placeholder='Email*' />
        <div  placeholder="Enter email" {...register("email")} />
        <p className='text-errTextColor'>{errors.email?.message}</p>
      </div>

      <div className="className='flex flex-col text-textHintColor py-2" >
        <h3>Username:</h3>
        <input className='rounded-lg bg-backgroundColorPrimary mt-2 p-2  focus:bg-backgroundColorPrimary focus:outline-none' type="text" placeholder='Username*' />
        <div   placeholder="Enter Username" {...register("username")} />
        <p className='text-errTextColor'>{errors.username?.message}</p>
      </div>

      <div className="className='flex flex-col text-textHintColor py-2" >
        <h3>Password:</h3>
        <input className='rounded-lg bg-backgroundColorPrimary mt-2 p-2  focus:bg-backgroundColorPrimary focus:outline-none' type="text" placeholder='Password*' />
        <div   placeholder="Password" {...register("password")} />
        <p className='text-errTextColor'>{errors.password?.message}</p>
      </div>
 
      <div className="flex justify-between ">
        
        <button className='my-5 py-2 w-28 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-white font-semibold rounded-lg' type="submit">
          Send
        </button>

        <div className='flex justify-center items-center w-28 my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-white font-semibold rounded-lg'>
        <Link to={`/access-control/login`}>Login</Link>
      </div>
      </div>
    </form>
  )
}
