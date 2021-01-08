import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import firebase from "../../../configs/firebase";
import Page from "../../Layout/Page";
import Button from "../../Shared/Button";
import PageSpinner from "../../Shared/Spinners/PageSpinner";
import Question from "./Question/Question";

function AnswerTest({ match }) {
  const [test, setTest] = useState({
    data: null,
    error: null,
    isLoading: true,
  });

  const { register, handleSubmit, errors, reset, control } = useForm({
    defaultValues: {
      answers: [],
    },
    // resolver: yupResolver(testSchema),
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control,
    name: "answers",
  });

  useEffect(() => {
    const testerId = match.params.testerId;
    const testId = match.params.testId;

    firebase
      .database()
      .ref(`tests/${testerId}/${testId}`)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();

        setTest({
          isLoading: false,
          error: false,
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        setTest({
          ...test,
          isLoading: false,
        });
      });
  }, []);

  useEffect(() => {
    if (test.data) {
      reset({
        answers: Array(test.data.questions.length),
      });
    }
  }, [test.data]);

  function onSubmit(data) {
    console.log(data);
  }

  const questionsJSX = test?.data
    ? test.data.questions.map((question, index) => {
        return (
          <Question
            key={index}
            index={index}
            question={question.question}
            answers={question.answers}
            rightAnswerIndex={question.rightAnswerIndex}
            register={register}
          />
        );
      })
    : null;

  return test.isLoading ? (
    <PageSpinner />
  ) : (
    <Page classes="answer-test">
      <h1>{test.data.name} Test</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className="list-unstyled p-0">{questionsJSX}</ol>
        <Button
          title="Submit Answer"
          classes="btn-primary d-block mx-auto"
          isLoading={test.isLoading}
        />
      </form>
    </Page>
  );
}

export default AnswerTest;
