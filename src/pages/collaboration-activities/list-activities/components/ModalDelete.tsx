import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../../components/loader/full-screen-loader/FullScreenLoader";
import { deleteDisciplines } from "../../../../service/rest/apis/disciplineRestApi";

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


export default function ModalDelete({ id, findAllActivities }: { id: number, findAllActivities: Function }) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<{}>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Você deletou a atividade com sucesso!');
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
    await deleteDisciplines(id).finally( () => {
      findAllActivities()
      closeModal()
    })
  };

  if (isSubmitting) {
    return (
      <>
        <FullScreenLoader />
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
    <>
      <button className="w-16 mx-2 my-auto rounded p-2 bg-errTextColor text-white hover:scale-125 hover:cursor-pointer" type="button" onClick={openModal}>Deletar</button>
      <div>
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <button className="float-right" onClick={closeModal}>X</button>
            <h1 className="mb-4 w-full text-center">Deletar atividade </h1>
            <p className="text-center">Você tem certeza que deseja deletar essa atividade?</p>
            <form className="mt-5 flex justify-end" onSubmit={handleSubmit(onSubmitHandler)}>
              <button className="w-24 rounded mx-6 p-2 bg-errTextColor text-white hover:scale-125 hover:cursor-pointer" type="button" onClick={closeModal}>Cancelar</button>
              <button className="w-24 rounded p-2 bg-backgroundColorFooterPrimary text-white hover:scale-125 hover:cursor-pointer" type="submit">Deletar</button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}