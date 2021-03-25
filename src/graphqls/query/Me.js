import { gql } from "@apollo/client";

const USER_ME = gql`
  query ME {
    me {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;

export { USER_ME };
