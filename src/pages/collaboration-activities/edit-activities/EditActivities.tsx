import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../components/loader/full-screen-loader/FullScreenLoader';
import { editActivitiy, getActivity } from '../../../service/rest/apis/activityRestApi';
import { listDisciplinesSelection } from '../../../service/rest/apis/disciplineRestApi';
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

    listDisciplinesSelection().then( data => {
      setDisciplines(data)
    }).catch( error => {
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
    defaultValues: async () => getActivity(id || '-1')
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Você criou a atividade com sucesso!');
      reset();
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IEditActivityInputs> = async (values) => {
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
      <form className='max-w-[800px] w-full mx-auto rounded-lg bg-backgroundColorSecondary p-8 px-8' onSubmit={handleSubmit(onSubmitHandler)} >
        <h2 className="text-4xl text-textColorThird font-bold text-center my-10">Editar atividade</h2>

        <div className='flex flex-col text-textHintColor py-2'>
          <h3>Nome:</h3>
          <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Nome*" {...register("name")} />
          <p className='text-errTextColor'>{errors.name?.message}</p>
        </div>

        <div className="flex flex-col text-textHintColor py-2 rounded-lg">
          <h3>Disciplina:</h3>
          <select className='mt-2 p-2 bg-backgroundColorInput text-textColorSecondary' {...register("idDiscipline")}>
            <option></option>
            {
              disciplines.length > 0 ? 
              
              disciplines.map(discipline => (
                <option selected={parseInt(getValues("idDiscipline")) === discipline.id} value={discipline.id}>{discipline.name}</option>
              ))
              
              :
              <option> Nenhuma disciplina cadastrada. </option>
            }
          </select>
          <p className='text-errTextColor'>{errors.name?.message}</p>
        </div>

        <EditQuestions
          questions={getValues("questions")}
          {...{ control, register }}
        />

        <div className="flex justify-center">
          <button className='text-center my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="submit">
            Editar
          </button>
        </div>
      </form>
    </>
  )
}
