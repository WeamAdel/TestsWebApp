import * as yup from "yup";
import { emailSchema, passwordSchema } from "./shared";

export const signInSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = yup.object().shape({
  username: yup.string().required().max(75),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
