import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from 'react-hook-form';
import { z } from "zod";

interface IFormInputs {
  name: string
  theme: string
}

const schemaDiscipline = z.object({
  name: z.string({ required_error: "Name is required." }),
  theme: z.string({ required_error: "Theme is required." }),
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function CreateDiscipline() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaDiscipline),
  });
  
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center">CREATE DISCIPLINE</h2>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Discipline Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter name discipline" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTheme">
          <Form.Label>Discipline Theme:</Form.Label>
          <Form.Control type="text" placeholder="Theme discipline" {...register("theme")} />
          <p className='text-danger'>{errors.theme?.message}</p>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </div>
      </Form>
    </>
  )
}
