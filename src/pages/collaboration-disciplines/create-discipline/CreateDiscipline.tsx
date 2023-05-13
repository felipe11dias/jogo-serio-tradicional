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
    .min(1, "Nome é obrigatório"),
  theme: z.string()
    .min(1, "Tema é obrigatório"),
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
      toast.success('Você cadastrou a disciplina com sucesso!');
      reset();
      navigate('/environment/teacher/collaboration-disciplines/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IRegisterDisciplineInputs> = async (values) => {
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
      <form className='max-w-[400px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className="text-4xl text-textColorThird font-bold text-center my-10">CRIAR DISCIPLINA</h2>

        <div className='flex flex-col text-textHintColor py-2' >
          <h3>Nome:</h3>
          <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Enter name*" {...register("name")} />
          <p className='text-errTextColor'>{errors.name?.message}</p>
        </div>

        <div className='flex flex-col text-textHintColor py-2' >
          <h3>Tema:</h3>
          <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Enter theme*" {...register("theme")} />
          <p className='text-errTextColor'>{errors.theme?.message}</p>
        </div>

        <div className="flex justify-center">
          <button className='text-center my-5 py-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
            Criar disciplina
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <Link className='text-center my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/environment/teacher/collaboration-disciplines/list`}>
            Voltar
          </Link>
        </div>
      </form>
    </>
  )
}
