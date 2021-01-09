import * as yup from "yup";

export const testSchema = yup.object().shape({
  name: yup
    .string()
    .required("Test name is required")
    .min(3, "Test name must be at least 3 characters")
    .max(75, "Test name must be at most 75 characters"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup
          .string()
          .required("Question body is required")
          .min(3, "Question body must be at least 3 characters")
          .max(225, "Question body must be at most 225 characters"),
        answers: yup
          .array()
          .of(
            yup
              .string()
              .min(1, "Answer must be at least 1 characters")
              .max(225, "Answer must be at most 225 characters")
              .required("This answer is required")
          )
          .length(4)
          .required(),
        rightAnswerIndex: yup.number().min(0).max(3).required(),
      })
    )
    .required(),
});

export const answerTestSchema = yup.object().shape({
  answers: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required("This answer is required")
          .min(1, "Answer must be at least 1 characters")
          .max(10, "Answer must be at most 10 characters"),
      })
    )
    .required(),
});
