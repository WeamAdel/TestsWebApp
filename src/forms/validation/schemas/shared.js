import * as yup from "yup";

export const emailSchema = yup.string().required().min(5).email().max(225);
export const passwordSchema = yup.string().required().min(10).max(225);
