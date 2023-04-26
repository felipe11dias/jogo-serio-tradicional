import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from "zod";
import FullScreenLoader from '../../../../components/loader/full-screen-loader/FullScreenLoader';
import { useAppSelector } from '../../../../redux/store';
import { User } from '../../../../redux/types/User';
import { editDisciplines } from '../../../../service/rest/apis/disciplineRestApi';

export type IEditDisciplineInputs = {
  name: string
  theme: string
  idUser: number
}

const schemaDiscipline = z.object({
  name: z.string()
    .min(1, "Name is required."),
  theme: z.string()
    .min(1, "Theme is required."),
  idUser: z.number().nullable()
});

export default function ModalEdit({ id }: { id: number}) {
  const user: User | null = useAppSelector(state => state.userState.user)
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IEditDisciplineInputs>({
    resolver: zodResolver(schemaDiscipline),
    defaultValues: {
      name: '',
      theme: '',
      idUser: user?.id
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully edit discipline');
      reset();
      navigate('/environment/teacher/collaboration-disciplines/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<IEditDisciplineInputs> = async (values) => {
    console.log(values)
    await editDisciplines(id, values)
  };

  if(isSubmitting) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="" type="button" onClick={openModal}>Edit</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div>
            <button onClick={closeModal}>X</button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h2>Edit Discipline</h2>
            <div className="mb-3" >
              <div>Name: </div>
              <input type="text" placeholder="Enter name*" {...register("name")} />
              <p className='text-red-600'>{errors.name?.message}</p>
            </div>

            <div className="mb-3" >
              <div>Theme: </div>
              <input type="text" placeholder="Enter theme*" {...register("theme")} />
              <p className='text-red-600'>{errors.theme?.message}</p>
            </div>

            <div className="d-flex justify-content-center">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}