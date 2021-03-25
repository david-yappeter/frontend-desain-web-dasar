import { gql } from "@apollo/client";

const QUERY_POSTS_GET_ALL = gql`
  query POST_GET_ALL($sortBy: String, $ascending: Boolean) {
    posts(sort_by: $sortBy, ascending: $ascending) {
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
