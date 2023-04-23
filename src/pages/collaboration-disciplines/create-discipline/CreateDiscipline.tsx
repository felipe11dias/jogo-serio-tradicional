import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../components/loader/full-screen-loader/FullScreenLoader';
import { useAppSelector } from '../../../redux/store';
import { User } from '../../../redux/types/User';
import { createDisciplines } from '../../../service/rest/apis/disciplineRestApi';

export type IRegisterDisciplineInputs = {
  name: string
  theme: string
  idUser: number
}

const schemaDiscipline = z.object({
  name: z.string()
    .min(1, "Name is required."),
  theme: z.string()
    .min(1, "Theme is required."),
  idUser: z.number().nullable()
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function CreateDiscipline() {
  const user: User | null = useAppSelector(state => state.userState.user)

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRegisterDisciplineInputs>({
    resolver: zodResolver(schemaDiscipline),
    defaultValues: {
      name: '',
      theme: '',
      idUser: user?.id
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully create discipline');
      reset();
      navigate('/environment/teacher/collaboration-disciplines/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IRegisterDisciplineInputs> = async (values) => {
    console.log(values)
    await createDisciplines(values)
  };

  if(isSubmitting) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className="text-center">CREATE DISCIPLINE</h2>

        <div className="mb-3" >
          <div>Name: </div>
          <input type="text" placeholder="Enter name*" {...register("name")} />
          <p className='text-red-600'>{errors.name?.message}</p>
        </div>

        <div className="mb-3" >
          <div>Theme: </div>
          <input type="text" placeholder="Enter theme*" {...register("theme")} />
          <p className='text-red-600'>{errors.theme?.message}</p>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit">
            Send
          </button>
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/environment/teacher/collaboration-disciplines/list`}>
            Go to list discipline
          </Link>
        </div>
      </form>
    </>
  )
}
