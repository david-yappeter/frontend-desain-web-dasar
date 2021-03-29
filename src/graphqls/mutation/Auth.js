import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation USER_REGISTER(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    auth {
      register(
        input: {
          name: $name
          email: $email
          password: $password
          confirm_password: $confirmPassword
        }
      ) {
        type
        token
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation USER_LOGIN($email: String!, $password: String!) {
    auth {
      login(email: $email, password: $password) {
        type
        token
      }
    }
  }
`;

const CHANGE_PASSWORD_USER = gql`
  mutation CHANGE_PASSWORD($name: String!) {
    user {
      edit_name(input: { name: $name })
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, CHANGE_PASSWORD_USER };
