import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../components/loader/full-screen-loader/FullScreenLoader';
import { useAppSelector } from '../../../redux/store';
import { User } from '../../../redux/types/User';
import { createActivities } from '../../../service/rest/apis/activityRestApi';
import { listDisciplinesSelection } from '../../../service/rest/apis/disciplineRestApi';
import { Discipline } from '../../../types/Discipline';
import { CreateQuestions } from './CreateQuestions';

export type IRegisterActivityInputs = {
  name: string,
  idUser: number,
  idDiscipline: string,
  questions: AnswerQuestions[]
}

export type AnswerQuestions = {
  description: string,
  answers: Answer[],
  idAnswerCorrect: string
}

export type Answer = {
  description: string
}

const schemaActivity = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  idUser: z.number({ required_error: "Usuário é obrigatório" }),
  idDiscipline: z.string({ required_error: "Disciplina é obrigatório." }).min(1, "Disciplina é obrigatório."),
  questions: z.array(
    z.object({
      description: z.string().min(1, "Descrição da questão é obrigatório."),
      answers: z.array(z.object({
        description: z.string().min(1, "Descrição da resposta é obrigatório."),
      })),
      idAnswerCorrect: z.string(),
    })
  ),
});

export default function CreateActivities() {
  const user: User | null = useAppSelector(state => state.userState.user)
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  
  useEffect(() => {
    listDisciplinesSelection().then( data => {
      setDisciplines(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  const defaultQuestion: AnswerQuestions = {
    description: "",
    answers: [
      {description: ""}, {description: ""}, {description: ""}, {description: ""}
    ],
    idAnswerCorrect: "0"
  }

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRegisterActivityInputs>({
    resolver: zodResolver(schemaActivity),
    defaultValues: {
      idUser: user?.id,
      questions: [defaultQuestion, defaultQuestion, defaultQuestion, defaultQuestion, defaultQuestion]
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Você cadastrou a atividade com sucesso!');
      reset();
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IRegisterActivityInputs> = async (values) => {
    await createActivities(values);
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
      <form className='max-w-[800px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)} >
        <h2 className="text-4xl text-textColorThird font-bold text-center my-10">CRIAR ATIVIDADE</h2>

        <div className='flex flex-col text-textHintColor py-2'>
          <h3>Nome:</h3>
          <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Nome*" {...register("name")} />
          <p className='text-errTextColor'>{errors.name?.message}</p>
        </div>

        <div className="flex flex-col text-textHintColor py-2 rounded-lg">
          <h3>Disciplina:</h3>
          <select className='mt-2 p-2 bg-backgroundColorInput text-textColorSecondary' {...register("idDiscipline")}>
            <option value={''}>Selecione</option>
            {
              disciplines.length > 0 ? 
              
              disciplines.map(discipline => (
                <option value={discipline.id}>{discipline.name}</option>
              ))
              
              :
              <option> Nenhuma disciplina cadastrada. </option>
            }
          </select>
          <p className='text-errTextColor'>{errors.name?.message}</p>
        </div>

        <CreateQuestions
          {...{ control, register }}
        />

        <div className="flex justify-center">
          <button className='text-center my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
            Criar atividade
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <Link className='text-center my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/environment/teacher/collaboration-activities/list`}>
            Voltar
          </Link>
        </div>
      </form>
    </>
  )
}
