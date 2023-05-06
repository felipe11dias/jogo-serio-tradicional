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
  width: 400,
  bgcolor: 'rgb(18, 18, 18)',
  border: '2px solid rgb(0, 0, 0)',
  boxShadow: 24,
  p: 4,
  color: '#fff'
};


export default function ModalDelete({ id }: { id: number}) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<{}>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Atividade deletada com sucesso!');
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
    await deleteDisciplines(id)
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
      <button className="" type="button" onClick={openModal}>Deletar</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={closeModal}>X</button>
          <h2>Deletar atividade </h2>
          <p>Você tem certeza que deseja deletar essa atividade?</p>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button className="" type="button" onClick={closeModal}>Cancelar</button>
            <button className="" type="submit">Deletar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}