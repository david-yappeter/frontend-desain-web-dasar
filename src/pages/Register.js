import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = () => {
    setValues({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <Form onSubmite={onSubmit} noValidate>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Form.Input
          label="Name"
          placeholder="Name.."
          name="name"
          value={values.name}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
        />
      </Form>
    </div>
  );
};

export default Register;
