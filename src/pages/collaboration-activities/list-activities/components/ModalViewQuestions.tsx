import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { Question } from "../../../../types/Question";

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
          <button onClick={closeModal}>X</button>
          <h2>Questões da atividade</h2>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {
                questions.length > 0 ? questions.map((question, index) => (
                  <tr key={question.id}>
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