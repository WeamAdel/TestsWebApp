import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { answerTestSchema } from "../../../forms/validation/schemas/test";
import firebase from "../../../configs/firebase";
import Page from "../../Layout/Page";
import Button from "../../Shared/Button";
import PageSpinner from "../../Shared/Spinners/PageSpinner";
import Question from "./Question/Question";
import Result from "./Result";

function AnswerTest({ match, userId }) {
  const [test, setTest] = useState({
    data: null,
    error: null,
    isLoading: true,
    isSubmitting: false,
    isAnswered: null,
  });

  const { register, handleSubmit, errors, reset, control } = useForm({
    defaultValues: {
      answers: [],
    },
    resolver: yupResolver(answerTestSchema),
    mode: "onChange",
  });

  console.log(errors);

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

  /* 
    Here we are creating a copy of all the questions and their answers & right answer,
    (savin the copy of what the user answered in order to prevent teachers from
      manipulating the results later
    ), as well as calculating the total points
  */

  function createAnswerReport(answers) {
    let points = 0;
    const testQuestions = test.data.questions;
    const questions = [];

    for (let i = 0; i < test.data.questions.length; i++) {
      const question = testQuestions[i];
      const tempQuestion = { ...question, userAnswerIndex: +answers[i].value };

      if (+answers[i].value == question.rightAnswerIndex) points += 1;
      questions.push(tempQuestion);
    }

    return {
      uid: userId,
      questions,
      points,
      final: testQuestions.length,
    };
  }

  function onSubmit(data) {
    console.log(data);
    const answerReport = createAnswerReport(data.answers);
    console.log(answerReport);
    setTest({
      ...test,
      isSubmitting: true,
    });

    doAPISubmitAnswer({
      answerReport,
      testId: match.params.testId,
    })
      .then((res) => {
        console.log(res);
        setTest({
          ...test,
          data: {
            name: test.data.name,
            ...answerReport,
          },
          isSubmitting: false,
          isAnswered: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setTest({
          ...test,
          isSubmitting: false,
        });
      });
  }

  const questionsJSX = test?.data
    ? test.data.questions.map((question, index) => {
        return (
          <Question
            key={index}
            index={index}
            {...question}
            register={register}
            isAnswered={test.isAnswered}
            errorMessage={
              errors?.answers && errors.answers[index]
                ? errors.answers[index].value.message
                : null
            }
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
        {!test.isAnswered ? (
          <Button
            title="Submit Answer"
            classes="btn-primary d-block mx-auto"
            isLoading={test.isSubmitting}
          />
        ) : null}
      </form>
      {test.data ? (
        <Result
          points={test.data.points}
          final={test.data.final}
          isAnswered={test.isAnswered}
        />
      ) : null}
    </Page>
  );
}

async function doAPISubmitAnswer({ answerReport, testId }) {
  return firebase
    .database()
    .ref("answers/" + testId)
    .push(answerReport);
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.app.uid,
  };
};

export default connect(mapStateToProps)(AnswerTest);
