import { useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../../Layout/Page";
import QuestionCounter from "./QuestionsCounter";
import AddQuestionBtn from "./AddQuestionBtn";
import Question from "../../Shared/Forms/Inputs/QuestionInput/Question";
import Button from "../../Shared/Button";

export default function AddTest() {
  const [quesCounter, updateQuesCounter] = useState(1);
  const { register, handleSubmit, errors } = useForm({
    // resolver: yupResolver(signInSchema),
    // mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  function addNewQuestion() {
    console.log("Added");
  }

  return (
    <Page classes="add-test">
      <h1>Add Test</h1>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Question index={quesCounter} register={register} errors={errors} />
            <Button
              title="Add Test"
              classes="btn-primary d-block mr-md-0 mx-auto"
              // isLoading={signIn.isLoading}
            />
          </form>
        </div>
        <QuestionCounter counter={quesCounter} />
      </div>
      <AddQuestionBtn clicked={addNewQuestion} />
    </Page>
  );
}
