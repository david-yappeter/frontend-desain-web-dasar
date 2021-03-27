import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation POST_CREATE($body: String!) {
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
  mutation POST_DELETE($id: ID!) {
    post {
      delete(id: $id)
    }
  }
`;

const POST_LIKE = gql`
  mutation PostLike($postID: ID!) {
    post_like {
      like_or_unlike(post_id: $postID) {
        id
        created_at
        user_id
      }
    }
  }
`;

const POST_COMMEND_CREATE = gql`
  mutation POST_COMMEND_CREATE($body: String!, $postID: ID!) {
    post_commend {
      create(input: { body: $body, post_id: $postID }) {
        id
        body
        created_at
        user_id
        post_id
      }
    }
  }
`;

const POST_COMMEND_DELETE = gql`
  mutation POST_COMMEND_DELETE($id: ID!) {
    post_commend {
      delete(id: $id)
    }
  }
`;

export {
  CREATE_POST,
  DELETE_POST,
  POST_LIKE,
  POST_COMMEND_CREATE,
  POST_COMMEND_DELETE,
};
