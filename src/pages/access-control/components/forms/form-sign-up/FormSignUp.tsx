import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';


interface IFormInputs {
  email: string
  username: string
  password: string
}

const schemaLogin = z.object({
  email: z.string().email().min(6, { message: 'Required 6 caracters.' }),
  username: z.string().min(6, { message: 'Required 6 caracters.' }),
  password: z.string().max(16, { message: 'Max caracters is 16.' }),
});

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center m-1">SIGN UP</h2>

      <div className="mx-3" >
        <div>Email:</div>
        <input className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='Email*' />
        <div  placeholder="Enter email" {...register("email")} />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>

      <div className="mx-3"  >
        <div>Username:</div>
        <input className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='Username*' />
        <div   placeholder="Enter Username" {...register("username")} />
        <p className='text-red-500'>{errors.username?.message}</p>
      </div>

      <div className="mx-3"  >
        <div>Password:</div>
        <input className='border border-gray-300 focus:border-blue-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='Password*' />
        <div   placeholder="Password" {...register("password")} />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
 
      <div className="flex justify-center">
        <button className='bg-blue-800 text-white px-3 py-3 rounded-lg transition m-2' type="submit">
          Send
        </button>
        <div className='bg-blue-800 text-white px-3 py-3 rounded-lg transition m-2'>
        <Link to={`/access-control/login`}>Login</Link>
      </div>
      </div>
    </form>
  )
}
