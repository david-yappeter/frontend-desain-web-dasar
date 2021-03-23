import React, { useState } from "react";
// import { Form } from "semantic-ui-react";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = () => {};
  const onSubmit = () => {};

  return (
    <div>
      {/* <Form onSubmite={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="name"
          placeholder="Name.."
          name="name"
          value={values.name}
          onChange={onChange}
        />
      </Form> */}
    </div>
  );
};

export default Register;
