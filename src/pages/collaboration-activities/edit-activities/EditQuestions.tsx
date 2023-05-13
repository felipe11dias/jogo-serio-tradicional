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
          <li className="list-none" key={item.id}>
            <div className='flex flex-col text-textHintColor py-2'>
              <h3>Questão {index + 1}:</h3>
              <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Questão*" {...register(`questions.${index}.description`, { required: true })} />

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