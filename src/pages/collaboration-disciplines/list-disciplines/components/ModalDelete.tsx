import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../../components/loader/full-screen-loader/FullScreenLoader";
import { deleteDisciplines } from "../../../../service/rest/apis/disciplineRestApi";


export default function ModalDelete({ id }: { id: number}) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<{}>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('You successfully delete discipline');
      navigate('/environment/teacher/collaboration-disciplines/list', { replace: true })
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
      <button className="" type="button" onClick={openModal}>Delete</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <button onClick={closeModal}>X</button>
          <h2>Delete Discipline</h2>
          <p>Are you sure you want to delete?</p>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button className="" type="button" onClick={closeModal}>Cancel</button>
            <button className="" type="submit">Delete</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}