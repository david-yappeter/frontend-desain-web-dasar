import React, { Fragment, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import { QUERY_POSTS_GET_ALL } from "./../graphqls/index";
import { useCookies } from "react-cookie";

import { PostCard, PostForm } from "./../components/index";

const Home = () => {
  const [cookies] = useCookies();
  const [postGetAll, { loading, data }] = useLazyQuery(QUERY_POSTS_GET_ALL, {
    variables: {
      sortBy: "created_at",
      ascending: false,
    },
  });

  useEffect(() => {
    postGetAll();
  }, []);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <span>Recent Posts</span>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1> Loading Posts</h1>
        ) : (
          <Transition.Group>
            {cookies.access_token && (
              <Grid.Column style={{ marginBottom: "20px" }}>
                <PostForm />
              </Grid.Column>
            )}
            {data?.posts.nodes.length > 0 &&
              data.posts.nodes.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
