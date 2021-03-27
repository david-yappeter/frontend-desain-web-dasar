import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "./../graphqls/index";
import { useForm } from "./../utils/hooks";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [cookies] = useCookies();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { values, onChange, onSubmit } = useForm(
    () => registUser(),
    initialState
  );
  const [registUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]);
    },
  });
  const [errors, setErrors] = useState({});

  if (cookies.access_token) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Form.Input
          label="Name"
          placeholder="Name.."
          name="name"
          value={values.name}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
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
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {errors?.message && (
        <div className="ui error message">
          <ul className="list">
            <li key={errors.message}>{errors.message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Register;
