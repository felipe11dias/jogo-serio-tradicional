import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../components/loader/full-screen-loader/FullScreenLoader";
import { Question } from "../../../types/Question";

export type ResultProps = {
  open: boolean
  questions: Question[]
  answers: number[]
}

export default function ModalResult(result: ResultProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(result.open);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<{}>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Atividade deletada com sucesso.');
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<{}> = async () => {
   
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
    navigate("/environment/student/game-select", { replace: true })
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <button onClick={closeModal}>X</button>
          <h2>Resultado do jogo </h2>
          <table>
            <thead>
              <tr>Questão</tr>
              <tr>Resultado</tr>
            </thead>
            <tbody>
              {
                result.questions.map( (question, index) => {
                  return (
                    <>
                      <td>{question.description} ?</td>
                      <td>{question.idAnswerCorrect === result.answers[index] ? "Resposta correta" : "Resposta incorreta"}</td>
                    </>
                  )
                })
              }
            </tbody>
          </table>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <button className="" type="button" onClick={closeModal}>Cancelar</button>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}