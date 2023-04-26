import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateQuestions } from './CreateQuestions';

export type IRegisterActivityInputs = {
  name: string
  questions: Array<AnswerQuestions>
}

export type AnswerQuestions = {
  description: string,
  answers: Array<Answer>,
  idAnswerCorrect: number
}

export type Answer = {
  description: string
}

const schemaActivity = z.object({
  name: z.string().min(1, "Name is required."),
  questions: z.array(z.object({
    description: z.string().min(1, "Description is required."),
    answers: z.object({
      description: z.string().min(1, "Description is required."),
    }),
    idAnswerCorrect: z.number(),
  })),
});

export default function CreateActivities() {
  const defaultAnswerQuestion: AnswerQuestions = {description: "Description question", answers: [{description: ""}, {description: ""}], idAnswerCorrect: 0 }

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

  function verificarForm() {
    console.log(getValues())
  }

  const onSubmitHandler: SubmitHandler<IRegisterActivityInputs> = async (values) => {
    console.log(values)
  };

  return (
    <>
      <form className='w-100 my-4' onSubmit={handleSubmit(onSubmitHandler)} >
        <h2 className="text-center">CREATE ACTIVITY</h2>

        <div className="mb-3">
          <label>Activity name:</label>
          <input type="text" placeholder="Enter name activity" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <CreateQuestions
          {...{ control, register }}
        />

        <div className="d-flex justify-content-center">
          <button className="" type="submit">
            Send
          </button>
          <button className="" type="button" onClick={verificarForm}>
            check
          </button>
        </div>
      </form>
    </>
  )
}
