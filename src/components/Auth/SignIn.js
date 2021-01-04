import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInInputs } from "../../forms/inputsProps";
import { signInSchema } from "../../forms/validation/schemas/auth";
import Inputs from "../Shared/Forms/Inputs/Inputs";
import Button from "../Shared/Button";

export default function SignIn() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <main className="auth sign-in">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          <p>
            Don't have an account yet? <Link to="/sign-up">Sign Up</Link>
          </p>
          <Inputs
            inputProps={signInInputs}
            errors={errors}
            register={register}
          />
          <Button
            title="Sign In"
            classes="btn-primary d-block mr-md-0 mx-auto"
          />
        </form>
      </div>
    </main>
  );
}
