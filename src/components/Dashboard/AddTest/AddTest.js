import { useForm, useFieldArray } from "react-hook-form";
import axios from "../../../configs/axios";
import Page from "../../Layout/Page";
import QuestionCounter from "./QuestionsCounter";
import AddQuestionBtn from "./AddQuestionBtn";
import Question from "../../Shared/Forms/Inputs/QuestionInput/Question";
import Button from "../../Shared/Button";

export default function AddTest() {
  const { register, handleSubmit, errors, control } = useForm({
    // resolver: yupResolver(signInSchema),
    defaultValues: {
      shouldUnregister: false,
      questions: [
        {
          qid: "q1",
          question: "",
          rightAnswerId: "",
          answers: [],
        },
      ],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function doAPISubmitTest(testData) {
    axios
      .post("/tests.json", testData)
      .then((res) => {
        if (res.status == 200) {
          console.log("Success");
        } else {
          console.log("Failed");
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const questionJSX = fields.map((item, index) => {
    const answers = [];
    for (let i = 1; i <= 4; i++) {
      answers.push({
        name: `questions[${index}].answers[${i}]`,
        id: item.id + (i + 1),
      });
    }

    return (
      <Question
        key={item.qid}
        index={index}
        id={item.qid}
        name={`questions[${index}].question`}
        answers={answers}
        removeQuestion={removeQuestion.bind(this, index)}
        rightAnswer={{
          name: `questions[${index}].rightAnswerId`,
          id: item.rightAnswerId,
        }}
        register={register}
        errors={errors}
      />
    );
  });

  const onSubmit = (data) => {
    doAPISubmitTest(data);
  };

  function addNewQuestion() {
    const quesId = "q" + (fields.length + 1);
    const question = {
      qid: quesId,
      question: "",
      answers: [],
      rightAnswerId: "",
    };
    append(question);
  }

  function removeQuestion(index) {
    remove(index);
  }

  return (
    <Page classes="add-test">
      <h1>Add Test</h1>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {questionJSX}
            <hr />
            <Button
              title="Add Test"
              classes="btn-primary d-block mx-auto"
              // isLoading={signIn.isLoading}
            />
          </form>
        </div>
        <QuestionCounter counter={fields.length} />
      </div>
      <AddQuestionBtn clicked={addNewQuestion} />
    </Page>
  );
}
