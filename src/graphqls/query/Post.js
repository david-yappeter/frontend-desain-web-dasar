import { gql } from "@apollo/client";

const QUERY_POSTS_GET_ALL = gql`
  query {
    posts {
      limit
      page
      sort_by
      ascending
      total_data
      nodes {
        id
        body
        created_at
        user_id
        commends {
          id
          body
        }
        likes {
          id
          created_at
        }
        user {
          name
        }
      }
    }
  }
`;
export { QUERY_POSTS_GET_ALL };
