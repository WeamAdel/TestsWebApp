import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpInputs } from "../../forms/inputsProps";
import { signUpSchema } from "../../forms/validation/schemas/auth";
import { doAPISignUp } from "../../redux/auth/ActionCreators";
import { connect } from "react-redux";

import Inputs from "../Shared/Forms/Inputs/Inputs";
import Button from "../Shared/Button";
import Toaster from "../Shared/Toaster";

function SignUp({ doSignUp, signUp, history, isLogged }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    doSignUp({
      password: data.password,
      email: data.email,
      username: data.username,
    });
  };

  //Redirect user if signed in
  useEffect(() => {
    if (isLogged == true) history.push("/dashboard");
  }, [isLogged]);

  return isLogged == false ? (
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
          {signUp?.errors ? (
            <Toaster show={true} type="danger" message={signUp.errors} />
          ) : null}
          <Button
            title="Sign Up"
            classes="btn-primary d-block mr-md-0 mx-auto"
            isLoading={signUp.isLoading}
          />
        </form>
      </div>
    </main>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.user.isLogged,
    signUp: state.auth.signUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSignUp: (data) => {
      dispatch(doAPISignUp(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
