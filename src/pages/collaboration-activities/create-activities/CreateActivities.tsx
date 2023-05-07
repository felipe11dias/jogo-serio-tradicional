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
  name: z.string().min(1, "Name is required."),
  idUser: z.number({ required_error: "User is required" }),
  idDiscipline: z.string({ required_error: "Discipline is required" }),
  questions: z.array(
    z.object({
      description: z.string().min(1, "Description is required."),
      answers: z.array(z.object({
        description: z.string().min(1, "Description is required."),
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
      <form className='w-100 my-4' onSubmit={handleSubmit(onSubmitHandler)} >
        <h2 className="text-center">Criar atividade</h2>

        <div className="mb-3">
          <label>Nome:</label>
          <input type="text" placeholder="Enter name activity" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <label>Disciplina:</label>
          <select {...register("idDiscipline")}>
            <option></option>
            {
              disciplines.length > 0 ? 
              
              disciplines.map(discipline => (
                <option value={discipline.id}>{discipline.name}</option>
              ))
              
              :
              <option> Nenhuma disciplina cadastrada. </option>
            }
          </select>
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <CreateQuestions
          {...{ control, register }}
        />

        <div className="d-flex justify-content-center">
          <button className="" type="submit">
            Cadastrar atividade
          </button>
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/environment/teacher/collaboration-activities/list`}>
            Voltar
          </Link>
        </div>
      </form>
    </>
  )
}
