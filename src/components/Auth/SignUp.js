import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpInputs } from "../../forms/inputsProps";
import { signUpSchema } from "../../forms/validation/schemas/auth";
import Inputs from "../Shared/Forms/Inputs/Inputs";
import Button from "../Shared/Button";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <main className="auth sign-up">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <p>
            Already have an account yet? <Link to="/sign-in">Sign In</Link>
          </p>
          <Inputs
            inputProps={signUpInputs}
            errors={errors}
            register={register}
          />
          <Button
            title="Sign Up"
            classes="btn-primary d-block mr-md-0 mx-auto"
          />
        </form>
      </div>
    </main>
  );
}
