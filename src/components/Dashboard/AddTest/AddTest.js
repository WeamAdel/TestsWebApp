import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { testSchema } from "../../../forms/validation/schemas/test";
import firebase from "../../../configs/firebase";
import Page from "../../Layout/Page";
import QuestionCounter from "./QuestionsCounter";
import AddQuestionBtn from "./AddQuestionBtn";
import Question from "./QuestionInput/Question";
import Button from "../../Shared/Button";
import Input from "../../Shared/Forms/Inputs/Input";
import Toaster from "../../Shared/Toaster";

const getDefaultValues = () => {
  return {
    questions: [
      {
        qid: "q1",
        question: "",
        rightAnswerIndex: "",
        answers: ["", "", "", ""],
      },
    ],
    name: "",
  };
};

function AddTest({ match, app }) {
  const [test, setTest] = useState({
    id: null,
    isLoading: false,
    success: null,
    failed: null,
  });
  const [isEditing, setIsEditing] = useState(null);

  /* 
    This page works as both edit and add test pages, so here
    we are trying to detect that by checking the test :id param.
    If the param exists then it's an edit page and we then try to fetch and 
    populate this tests data, and if not we do nothing.
  */
  useEffect(() => {
    const testId = match.params.id;
    if (testId) {
      setTest({
        ...test,
        id: testId,
      });
      setIsEditing(true);
    } else setIsEditing(false);
  }, []);

  /* 
    When the user clicks add test(in navbar) when already editing one 
    i.e editing already saved test, 
    the form is reset
  */
  useEffect(() => {
    if (!match.params.id) {
      reset(getDefaultValues());
      setIsEditing(false);
      setTest({
        id: null,
        isLoading: false,
        success: null,
        failed: null,
      });
    }
  }, [match.params.id]);

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(testSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(async () => {
    const testId = match.params.id;
    if (isEditing) {
      const data = await getAPITest(testId);
      reset(data);
    }
  }, [isEditing]);

  function getAPITest(testId) {
    return firebase
      .database()
      .ref("tests/" + app.uid + "/" + testId)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        return data;
      })
      .catch((error) => console.log(error));
  }

  console.log(test);

  function onTestSuccess(testId) {
    console.log(testId);
    setTest({
      ...test,
      id: testId ?? test.id,
      success: true,
      isLoading: false,
    });

    setTimeout(() => {
      setTest((prevState) => {
        return {
          ...prevState,
          success: false,
        };
      });
    }, 2000);
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
          onTestSuccess(response.key);
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
          onTestSuccess();
        })
        .catch((error) => {
          onTestFail(error);
        });
    }
  }

  const questionJSX = fields.map((item, index) => {
    const answers = item.answers.map((answer, i) => {
      return {
        name: `questions[${index}].answers[${i}]`,
        defaultValue: answer,
      };
    });
    const questionId = item.qid ?? "q" + (index + 1);

    return (
      <Question
        key={questionId}
        index={index}
        id={questionId}
        question={item.question}
        name={`questions[${index}].question`}
        answers={answers}
        removeQuestion={removeQuestion.bind(this, index)}
        rightAnswer={{
          name: `questions[${index}].rightAnswerIndex`,
          index: +item.rightAnswerIndex,
        }}
        register={register}
        errors={errors?.questions ? errors.questions[index] : null}
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
      rightAnswerIndex: "",
      answers: ["", "", "", ""],
    };
    append(question);
  }

  function removeQuestion(index) {
    remove(index);
  }

  return isEditing != null ? (
    <Page classes="add-test">
      <h1>Add Test</h1>
      <Toaster
        type="success"
        isFixed={true}
        message="Your test was saved successfully"
        show={test.success}
      />
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
              errorMessage={errors?.name ? errors.name.message : null}
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
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
  };
};

export default connect(mapStateToProps)(AddTest);
