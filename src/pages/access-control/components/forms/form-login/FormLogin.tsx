import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from "zod";

interface IFormInputs {
  username: string
  password: string
}

const schemaLogin = z.object({
  username: z.string().min(6, { message: 'Required 6 caracters.' }),
  password: z.string().max(16, { message: 'Max caracters is 16.' }),
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function FormLogin() {
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
      <h2 className="text-center m-1">LOGIN</h2>

      <div className="mx-3" > 
        <h3>username:</h3>
        <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='Username*' />
        <div  placeholder="Enter username" {...register("username")} />
        <p className='text-red-500'>{errors.username?.message}</p>
      </div>

      <div className="mx-3" > 
      <h3>password:</h3>
        <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type="text" placeholder='password*' />
        <div placeholder="Password" {...register("password")} />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
 

      <div className='flex justify-between mx-5 mb-2'>
        <Link to={`/access-control/forget-password`}>
         <div className='bg-blue-800 text-white px-4 py-3 rounded-lg transition'> Forget Password</div>
          </Link>
        <Link to={`/access-control/sign-up`}>Sing up</Link>
      </div>

      <div className="flex justify-center">
        <button className='bg-blue-800 text-white px-4 py-3 rounded-lg transition m-2' type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
