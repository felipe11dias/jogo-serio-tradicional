import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

interface IFormInputs {
  email: string
}

const schemaForgetPassword = z.object({
  email: z.string().email().min(6, { message: 'Required 6 caracters.' }),
});

export default function FormForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaForgetPassword),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl text-white font-bold text-center">FORGET PASSWORD</h2>

      <div className="flex flex-col text-gray-400 py-2" >
        <h3>email:</h3> 
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Email*' />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>
 

      <div className='flex justify-around mb-2'>
        <Link to={`/access-control/login`}>
         <div className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'> Login</div>
          </Link>
        <Link to={`/access-control/sign-up`}>
        <div className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'> Sing up</div>  
          </Link>
      </div>

      <div className="flex justify-center">
        <button className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
