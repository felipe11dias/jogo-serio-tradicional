import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateQuestions } from './CreateQuestions';

export type IFormInputs = {
  name: string
  theme: string
  answerQuestions: Array<AnswerQuestions>
}

interface CreateDisciplineProps {
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

const schemaDiscipline = z.object({
  name: z.string({ required_error: "Name is required." }),
  theme: z.string({ required_error: "Theme is required." }),
  answerQuestions: z.array(z.object({
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

export default function CreateDiscipline() {
  const defaultAnswerQuestion: AnswerQuestions = { id: 0, question: "Description question", answers: [{id: 0, description: ""}, {id: 1, description: ""}], answerCorrect: 0 }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaDiscipline),
    defaultValues: {
      answerQuestions: [defaultAnswerQuestion]
    }
  });

  const onSubmit = (data: any) => console.log(data, data.answerQuestions = getValues("answerQuestions"));

  return (
    <>
      <Form className='w-100 my-4' onSubmit={handleSubmit(onSubmit)} >
        <h2 className="text-center">CREATE DISCIPLINE</h2>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Discipline name:</Form.Label>
          <Form.Control type="text" placeholder="Enter name discipline" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTheme">
          <Form.Label>Discipline theme:</Form.Label>
          <Form.Control type="text" placeholder="Theme discipline" {...register("theme")} />
          <p className='text-danger'>{errors.theme?.message}</p>
        </Form.Group>

        <CreateQuestions
          {...{ control, register, getValues, setValue }}
        />

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </div>
      </Form>
    </>
  )
}
