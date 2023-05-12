import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { Question } from "../../../../types/Question";

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


export default function ModalViewQuestions({ questions }: { questions: Question[]}) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="" type="button" onClick={openModal}>Ver questões</button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="float-right" onClick={closeModal}>X</button>
          <h1 className="mb-4 w-full text-center">Questões da atividade</h1>
          <table className="border-2 border-solid border-textColorThird mb-4 w-full text-sm text-center text-primary dark:text-textHintColor ">
            <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
              <tr>
                <th scope="col" className="px-6 py-3">Número</th>
                <th scope="col" className="px-6 py-3">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {
                questions.length > 0 ? questions.map((question, index) => (
                  <tr className="text-textColorSecondary" key={question.id}>
                    <td>{index}</td>
                    <td>{question.description}</td>
                  </tr>
                ))
                :
                <p> Nenhuma questão cadastrada. </p>
              }
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}