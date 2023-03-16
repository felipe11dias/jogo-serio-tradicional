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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">FORGET PASSWORD</h2>

      <div className="mb-3" >
        <div>Email:</div>
        
        <p className='text-danger'>{errors.email?.message}</p>
      </div>

      <div className='d-flex justify-content-between mb-4'>
        <Link to={`/access-control/login`}>Login</Link>
        <Link to={`/access-control/sign-up`}>Sing up</Link>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
