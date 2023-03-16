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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">SIGN UP</h2>

      <div className="mb-3" >
        <div>Email:</div>
        <div  placeholder="Enter email" {...register("email")} />
        <p className='text-danger'>{errors.email?.message}</p>
      </div>

      <div className="mb-3"  >
        <div>Username:</div>
        <div   placeholder="Enter username" {...register("username")} />
        <p className='text-danger'>{errors.username?.message}</p>
      </div>

      <div className="mb-3"  >
        <div>Password:</div>
        <div   placeholder="Password" {...register("password")} />
        <p className='text-danger'>{errors.password?.message}</p>
      </div>

      <div className='mb-4'>
        <Link to={`/access-control/login`}>Login</Link>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
