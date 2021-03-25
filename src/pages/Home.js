import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import { QUERY_POSTS_GET_ALL } from "./../graphqls/index";
import { useCookies } from "react-cookie";

import { PostCard, PostForm } from "./../components/index";

const Home = () => {
  const [cookies] = useCookies();
  const { loading, data } = useQuery(QUERY_POSTS_GET_ALL, {
    variables: {
      sortBy: "created_at",
      ascending: false,
    },
  });

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1> Loading Posts</h1>
        ) : (
          <Fragment>
            {cookies.access_token && (
              <Grid.Column style={{ marginBottom: "20px" }}>
                <PostForm />
              </Grid.Column>
            )}
            {data.posts.nodes.length > 0 &&
              data.posts.nodes.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Fragment>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
