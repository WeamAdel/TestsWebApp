import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInInputs } from "../../forms/inputsProps";
import { signInSchema } from "../../forms/validation/schemas/auth";
import { doAPISignIn } from "../../redux/auth/ActionCreators";
import { connect } from "react-redux";
import Inputs from "../Shared/Forms/Inputs/Inputs";
import Button from "../Shared/Button";

function SignIn({ doSignIn, app, signIn, history, isLogged }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    doSignIn({ password: data.password, email: data.email });
  };

  //Redirect user if signed in
  useEffect(() => {
    if (isLogged == true) history.push("/dashboard");
  }, [isLogged]);

  return isLogged == false ? (
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
            isLoading={signIn.isLoading}
          />
        </form>
      </div>
    </main>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
    isLogged: state.auth.user.isLogged,
    signIn: state.auth.signIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSignIn: ({ email, password }) => {
      dispatch(doAPISignIn({ email, password }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
