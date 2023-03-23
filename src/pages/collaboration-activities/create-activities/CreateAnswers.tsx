import {
  Control,
  useFieldArray,
  UseFormRegister
} from "react-hook-form";
import { IFormInputs } from "./CreateActivities";

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
            <div style={{ marginLeft: 'auto', width: "80%" }} className="mb-3" key={item.id}>
              <label>Answer {index + 1}:</label>
              <input type="text" placeholder="Answer" {...register(`answerQuestions.${indexQuestion}.answers.${index}.description`)} />
            </div>
          </>
        )
      })}
    </>
  )     
}