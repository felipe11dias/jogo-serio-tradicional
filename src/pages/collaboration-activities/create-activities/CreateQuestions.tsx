import { Form } from "react-bootstrap";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray
} from "react-hook-form";
import { IFormInputs } from "./CreateActivities";
import { CreateAnswers } from "./CreateAnswers";

export function CreateQuestions ({
  control,
  register,
  getValues,
  setValue
}: {
  control: Control<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
  getValues: UseFormGetValues<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "answerQuestions"
  });
  
  return (
    <>
      <button
        type="button"
        onClick={() => append({ id: 0, question: "Description question", answers: [{id: 0, description: ""}, {id: 1, description: ""}], answerCorrect: 0 })}
      >
        append
      </button>

      {fields.map((item, index: number) => {
        return (
          <li key={item.id}>
            <Form.Group className="mb-3" controlId={"formBasicQuestion" + index}>
              <Form.Label>Question {index + 1}: {item.question}</Form.Label>
              <Form.Control type="text" placeholder="Question" {...register(`answerQuestions.${index}.question`, { required: true })} />

              <CreateAnswers 
                indexQuestion={index}
                {...{ control, register }}
              />
            </Form.Group>
            
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        );
      })}
    </>
  )
}