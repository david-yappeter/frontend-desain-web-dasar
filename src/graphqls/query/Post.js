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
          user_id
        }
        likes {
          id
          created_at
          user_id
        }
        user {
          name
        }
      }
    }
  }
`;

const POST_GET_BY_ID = gql`
query POST_GET_BY_ID ($id: ID!){
  post(id: $id){
    id
    body
    created_at
    user_id
    likes{
      id
      user_id
      post_id
    }
    commends{
      id
      body
      created_at
      user{
        name
      }
    }
    user{
      name
    }
  }
}
`

export { QUERY_POSTS_GET_ALL, POST_GET_BY_ID };
