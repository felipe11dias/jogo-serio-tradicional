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
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl text-textColorThird font-bold text-center">ESQUECEU A SENHA?</h2>

      <div className="flex flex-col text-textHintColor py-2" >
        <h3>email:</h3> 
        <input className='rounded-lg bg-backgroundColorInput mt-2 p-2 focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder='Email*' />
        <p className='text-errTextColor'>{errors.email?.message}</p>
      </div>
 

      <div className='flex justify-between'>
        <Link to={`/access-control/login`}>
         <div className='text-center w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg'> Logar</div>
          </Link>
        <Link to={`/access-control/sign-up`}>
        <div className='text-center w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg'> Se inscrever</div>  
          </Link>
      </div>

      <div className="flex justify-center">
        <button className='text-center w-full my-5 py-2 px-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
          Enviar
        </button>
      </div>
    </form>
  )
}
