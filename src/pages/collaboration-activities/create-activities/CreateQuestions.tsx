import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray
} from "react-hook-form";
import { IRegisterActivityInputs } from "./CreateActivities";
import { CreateAnswers } from "./CreateAnswers";

export function CreateQuestions ({
  control,
  register,
  getValues,
  setValue
}: {
  control: Control<IRegisterActivityInputs>;
  register: UseFormRegister<IRegisterActivityInputs>;
  getValues: UseFormGetValues<IRegisterActivityInputs>;
  setValue: UseFormSetValue<IRegisterActivityInputs>;
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions"
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
            <div className="mb-3">
              <label>Question {index + 1}: {item.question}</label>
              <input type="text" placeholder="Question" {...register(`questions.${index}.question`, { required: true })} />

              <CreateAnswers 
                indexQuestion={index}
                {...{ control, register }}
              />
            </div>
            
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        );
      })}
    </>
  )
}