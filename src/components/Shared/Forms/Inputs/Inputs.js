import PropTypes from "prop-types";
import Input from "./Input";

export default function Inputs({ inputProps, register, errors }) {
  const inputsJSX = inputProps.map((input) => {
    const id = input.id;
    return (
      <Input
        key={id}
        errorMessage={errors[id] ? errors[id].message : null}
        register={register}
        {...input}
      />
    );
  });

  return <div className="inputs-wrapper">{inputsJSX}</div>;
}

Inputs.propTypes = {
  inputProps: PropTypes.array.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};
