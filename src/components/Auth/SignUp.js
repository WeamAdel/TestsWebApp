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

function SignUp({ doSignUp, app, signUp, history }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    doSignUp({ password: data.password, email: data.email });
  };

  useEffect(() => {
    if (app.apiToken) history.push("/");
  }, [app.apiToken]);

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
            isLoading={signUp.isLoading}
          />
        </form>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.auth.app,
    signUp: state.auth.signUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSignUp: ({ email, password }) => {
      dispatch(doAPISignUp({ email, password }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
