import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation USER_REGISTER($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    auth {
      register(input: { name: $name, email: $email, password: $password, confirm_password: $confirmPassword}) {
        type
        token
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation USER_LOGIN($email: String!, $password: String!) {
    auth {
      login(
        email: $email
        password: $password
      ) {
        type
        token
      }
    }
  }
`;

export { REGISTER_USER, LOGIN_USER };
