import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./../graphqls/index";
import { useForm } from "./../utils/hooks";
import {  useCookies } from "react-cookie";
import {Redirect} from "react-router-dom";

const Login = () => {
  const [cookies, setCookies] = useCookies();
  const initialState = {
    email: "",
    password: "",
  };
  const { values, onChange, onSubmit } = useForm(
    () => loginUser(),
    initialState
  );
  const [errors, setErrors] = useState({});
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      const {
        data: {
          auth: { login: data },
        },
      } = result;
      setErrors({});
      setCookies("access_token", data.token);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]);
    },
    variables: values,
  });

  if(cookies.access_token){
    return <Redirect to="/" />
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
          onSubmit={onSubmit}
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {errors.message && (
        <div className="ui error message">
          <ul className="list">
            <li key={errors.message}>{errors.message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
