import {
  Control,
  UseFormRegister,
  useFieldArray
} from "react-hook-form";
import { AnswerQuestions, IEditActivityInputs } from "./EditActivities";
import { EditAnswers } from "./EditAnswers";

export function EditQuestions ({
  questions,
  control,
  register
}: {
  questions: AnswerQuestions[];
  control: Control<IEditActivityInputs>;
  register: UseFormRegister<IEditActivityInputs>;
}) {
  const {
    fields
  } = useFieldArray({
    control,
    name: "questions"
  });
  
  return (
    <>
      {fields.map((item, index: number) => {
        return (
          <li key={item.id}>
            <div className="mb-3">
              <label>Questão {index + 1}:</label>
              <input type="text" placeholder="Questão*" {...register(`questions.${index}.description`, { required: true })} />

              <EditAnswers 
                question={questions[index]}
                indexQuestion={index}
                {...{ control, register }}
              />
            </div>
          </li>
        );
      })}
    </>
  )
}