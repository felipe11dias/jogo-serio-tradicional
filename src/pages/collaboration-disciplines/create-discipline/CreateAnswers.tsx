import { Form } from "react-bootstrap";
import {
  Control,
  useFieldArray,
  UseFormRegister
} from "react-hook-form";
import { IFormInputs } from "./CreateDiscipline";

export function CreateAnswers ({
  indexQuestion,
  control,
  register
}: {
  indexQuestion: number,
  control: Control<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `answerQuestions.${indexQuestion}.answers` 
  });

  return (
    <>
      {fields.map((item: any, index: number) => {
        return (
          <>
            <Form.Group style={{ marginLeft: 'auto', width: "80%" }} className="mb-3" controlId={"formBasicAnswer" + index} key={item.id}>
              <Form.Label>Answer {index + 1}:</Form.Label>
              <Form.Control type="text" placeholder="Answer" {...register(`answerQuestions.${indexQuestion}.answers.${index}.description`)} />
            </Form.Group>
          </>
        )
      })}
    </>
  )     
}