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
    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center m-1">FORGET PASSWORD</h2>

      <div className="mx-3" >
        <h3>email:</h3> 
        <input className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='Email*' />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>
 

      <div className='flex justify-between mx-5 mb-2'>
        <Link to={`/access-control/login`}>
         <div className='bg-blue-800 text-white px-3 py-3 rounded-lg transition'>Login</div>
          </Link>
        <Link to={`/access-control/sign-up`}>
        <div className='bg-blue-800 text-white px-3 py-3 rounded-lg transition'>Sing up</div>  
          </Link>
      </div>

      <div className="flex justify-center">
        <button className='bg-blue-800 text-white px-3 py-3 rounded-lg transition m-2' type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
