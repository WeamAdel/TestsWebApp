import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import firebase from "../../../configs/firebase";
import Page from "../../Layout/Page";
import QuestionCounter from "./QuestionsCounter";
import AddQuestionBtn from "./AddQuestionBtn";
import Question from "../../Shared/Forms/Inputs/QuestionInput/Question";
import Button from "../../Shared/Button";
import Input from "../../Shared/Forms/Inputs/Input";

function AddTest({ history, app }) {
  const [test, setTest] = useState({
    id: null,
    isLoading: false,
    success: null,
    failed: null,
  });

  const { register, handleSubmit, errors, control } = useForm({
    // resolver: yupResolver(signInSchema),
    defaultValues: {
      shouldUnregister: false,
      questions: [
        {
          qid: "q1",
          question: "",
          rightAnswerIndex: "",
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

  function onTestScucess(testId) {
    if (testId) history.push("/dashboard");
    setTest({
      ...test,
      id: testId ?? test.id,
      isLoading: false,
    });
  }

  function onTestFail(error) {
    console.log("Error saving your test:", error);
  }

  function doAPISubmitTest(testData) {
    setTest({
      ...test,
      isLoading: true,
    });

    //If the test already exists update it
    //If it doesn't the create a new one and retrieve its id i.e(response.key)
    if (!test.id) {
      firebase
        .database()
        .ref(`tests/${app.uid}/`)
        .push(testData)
        .then((response) => {
          onTestScucess(response.key);
        })
        .catch((error) => {
          onTestFail(error);
        });
    } else {
      firebase
        .database()
        .ref(`tests/${app.uid}/${test.id}`)
        .update(testData)
        .then(() => {
          onTestScucess();
        })
        .catch((error) => {
          onTestFail(error);
        });
    }
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
          name: `questions[${index}].rightAnswerIndex`,
          index: item.rightAnswerIndex,
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
      rightAnswerIndex: "",
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
            <Input
              register={register}
              label="Test Name"
              isRequired={true}
              errorMessage={errors.name ? errors.name.message : null}
              placeholder="Enter your test name"
              id="name"
              type="text"
            />
            <hr className="my-5" />
            {questionJSX}
            <hr />
            <Button
              title="Add Test"
              classes="btn-primary d-block mx-auto"
              isLoading={test.isLoading}
            />
          </form>
        </div>
        <QuestionCounter counter={fields.length} />
      </div>
      <AddQuestionBtn clicked={addNewQuestion} />
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
  };
};

export default connect(mapStateToProps)(AddTest);
