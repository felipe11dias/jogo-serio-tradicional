import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";

export type IFormInputs = {
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
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaDiscipline),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center">CREATE DISCIPLINE</h2>

        <div className="mb-3" >
          <div>Discipline Name:</div>
          <div  placeholder="Enter name discipline" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <div className="mb-3" >
          <div>Discipline Theme:</div>
          <div  placeholder="Theme discipline" {...register("theme")} />
          <p className='text-danger'>{errors.theme?.message}</p>
        </div>

        <div className="d-flex justify-content-center">
          <button   type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  )
}
