import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../components/loader/full-screen-loader/FullScreenLoader';
import { editActivitiy, getActivities } from '../../../service/rest/apis/activityRestApi';
import { listDisciplines } from '../../../service/rest/apis/disciplineRestApi';
import { Discipline } from '../../../types/Discipline';
import { EditQuestions } from './EditQuestions';

export type IEditActivityInputs = {
  id: number,
  name: string,
  idUser: number,
  idDiscipline: string,
  questions: AnswerQuestions[]
}

export type AnswerQuestions = {
  id: number,
  description: string,
  answers: Answer[],
  idAnswerCorrect: string
}

export type Answer = {
  id: number,
  description: string
}

const schemaActivity = z.object({
  name: z.string().min(1, "Name is required."),
  idUser: z.number({ required_error: "User is required" }),
  idDiscipline: z.string({ required_error: "Discipline is required" }),
  questions: z.array(
    z.object({
      id: z.number(),
      description: z.string().min(1, "Description is required."),
      answers: z.array(z.object({
        id: z.number(),
        description: z.string().min(1, "Description is required."),
      })),
      idAnswerCorrect: z.string(),
    })
  ),
});

export default function EditActivities() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const navigate = useNavigate();

  const { id } = useParams();
  
  useEffect(() => {
    if(id === undefined) {
      toast.error("Não foi possivel encontrar a atividade.");
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }

    listDisciplines().then( data => {
      setDisciplines(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  const {
    register,
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IEditActivityInputs>({
    resolver: zodResolver(schemaActivity),
    defaultValues: async () => getActivities(id || '-1')
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully create activity');
      reset();
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IEditActivityInputs> = async (values) => {
    console.log(values)
    await editActivitiy(id || '-1', values);
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
        <h2 className="text-center">Editar atividade</h2>

        <div className="mb-3">
          <label>Nome:</label>
          <input type="text" placeholder="Adicione o nome da atividade" {...register("name")} />
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
              <option> Lista vazia </option>
            }
          </select>
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <EditQuestions
          {...{ control, register }}
        />

        <div className="d-flex justify-content-center">
          <button className="" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </>
  )
}
