import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation POST_CREATE ($body: String!) {
    post {
      create(input: { body: $body }) {
        id
        body
        created_at
        user_id
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation POST_DELETE ($id: ID!) {
    post {
      delete(id: $id)
    }
  }
`;

const POST_LIKE = gql`
mutation PostLike($postID: ID!){
  post_like{
    like_or_unlike(post_id: $postID){
      id
      created_at
      user_id
    }
  }
}
`

export { CREATE_POST, DELETE_POST, POST_LIKE };
