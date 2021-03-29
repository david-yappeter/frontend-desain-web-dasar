import { gql } from "@apollo/client";

const USER_EDIT_PROFILE_PICTURE = gql`
  mutation EDIT_PROFILE_PICTURE($avatar: Upload) {
    user {
      edit_avatar(input: { avatar: $avatar })
    }
  }
`;

export { USER_EDIT_PROFILE_PICTURE };
