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
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl text-white font-bold text-center">SIGN UP</h2>

      <div className="className='flex flex-col text-gray-400 py-2'" >
        <h3>Email:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Email*' />
        <div  placeholder="Enter email" {...register("email")} />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>

      <div className="className='flex flex-col text-gray-400 py-2" >
        <h3>Username:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Username*' />
        <div   placeholder="Enter Username" {...register("username")} />
        <p className='text-red-500'>{errors.username?.message}</p>
      </div>

      <div className="className='flex flex-col text-gray-400 py-2" >
        <h3>Password:</h3>
        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Password*' />
        <div   placeholder="Password" {...register("password")} />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
 
      <div className="flex justify-between ">
        
        <button className='my-5 py-2 w-28 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">
          Send
        </button>

        <div className='flex justify-center items-center w-28 my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
        <Link to={`/access-control/login`}>Login</Link>
      </div>
      </div>
    </form>
  )
}
