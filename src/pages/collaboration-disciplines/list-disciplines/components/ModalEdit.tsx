import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Modal } from "@mui/material";
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  borderRadius: '0.5rem',
  border: '2px solid #3349f1',
  boxShadow: 24,
  p: 4,
  color: '#000'
};

export default function ModalEdit({ id, name, theme }: { id: number, name: string, theme: string }) {
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
      name,
      theme,
      idUser: user?.id
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Você editou a disciplina com sucesso!');
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
      <button className="w-16 rounded p-2 bg-yellow-400 text-white hover:scale-125 hover:bg-hoverColorFooter hover:cursor-pointer" type="button" onClick={openModal}>Editar</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="float-right" onClick={closeModal}>X</button>
          
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1 className="mb-4 w-full text-center">Editar disciplina</h1>
            <div className="mb-3" >
              <div>Nome: </div>
              <input className='rounded-lg bg-backgroundColorInput mt-2 p-2 focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Nome*" {...register("name")} />
              <p className='text-red-600'>{errors.name?.message}</p>
            </div>

            <div className="mb-3" >
              <div>Tema: </div>
              <input className='rounded-lg bg-backgroundColorInput mt-2 p-2 focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Tema*" {...register("theme")} />
              <p className='text-red-600'>{errors.theme?.message}</p>
            </div>

            <div className="mt-9 flex justify-end">
              <button className="w-24 rounded mx-6 p-2 bg-errTextColor text-white hover:scale-125 hover:bg-hoverColorFooter hover:cursor-pointer" type="button" onClick={closeModal}>
                Cancelar
              </button>
              <button className="w-24 rounded p-2 bg-backgroundColorFooterPrimary text-white hover:scale-125 hover:bg-hoverColorFooter hover:cursor-pointer" type="submit">
                Salvar
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}