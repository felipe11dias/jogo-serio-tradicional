import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateQuestions } from './CreateQuestions';

export type IRegisterActivityInputs = {
  name: string
  theme: string
  questions: Array<AnswerQuestions>
}

interface CreateActivityProps {
  questionsAmout: number
}

export type AnswerQuestions = { 
  id: number,
  question: string,
  answers: Array<Answer>,
  answerCorrect: number
}

export type Answer = {
  id: number,
  description: string
}

const schemaActivity = z.object({
  name: z.string({ required_error: "Name is required." }),
  theme: z.string({ required_error: "Theme is required." }),
  questions: z.array(z.object({
    question: z.string(),
    answers: z.object({
      id: z.string(),
      description: z.number(),
    }),
    answerCorrect: z.number(),
  })),
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function CreateActivities() {
  const defaultAnswerQuestion: AnswerQuestions = { id: 0, question: "Description question", answers: [{id: 0, description: ""}, {id: 1, description: ""}], answerCorrect: 0 }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IRegisterActivityInputs>({
    resolver: zodResolver(schemaActivity),
    defaultValues: {
      questions: [defaultAnswerQuestion]
    }
  });

  const onSubmit = (data: any) => console.log(data, data.questions = getValues("questions"));

  return (
    <>
      <form className='w-100 my-4' onSubmit={handleSubmit(onSubmit)} >
        <h2 className="text-center">CREATE ACTIVITY</h2>

        <div className="mb-3">
          <label>Activity name:</label>
          <input type="text" placeholder="Enter name activity" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <label>Activity theme:</label>
          <input type="text" placeholder="Theme activity" {...register("theme")} />
          <p className='text-danger'>{errors.theme?.message}</p>
        </div>

        <CreateQuestions
          {...{ control, register, getValues, setValue }}
        />

        <div className="d-flex justify-content-center">
          <button className="" type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  )
}
