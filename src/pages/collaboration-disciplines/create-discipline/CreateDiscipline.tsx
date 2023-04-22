import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../components/loader/FullScreenLoader/FullScreenLoader';

export type IFormInputs = {
  name: string
  theme: string
  idUser: number
}

const schemaDiscipline = z.object({
  name: z.string({ required_error: "Name is required." }),
  theme: z.string({ required_error: "Theme is required." }),
  idUser: z.number({ required_error: "Id user is required." }),
});

export async function loader() {
  const user = 'teste'
  return { user };
}

export default function CreateDiscipline() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isLoading, isSubmitSuccessful, errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schemaDiscipline),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully create discipline');
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  if(isLoading) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center">CREATE DISCIPLINE</h2>

        <div className="mb-3" >
          <div>Discipline Name:</div>
          <input placeholder="Enter name discipline" {...register("name")} />
          <p className='text-danger'>{errors.name?.message}</p>
        </div>

        <div className="mb-3" >
          <div>Discipline Theme:</div>
          <input placeholder="Theme discipline" {...register("theme")} />
          <p className='text-danger'>{errors.theme?.message}</p>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  )
}
