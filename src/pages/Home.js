import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import { QUERY_POSTS_GET_ALL } from "./../graphqls/index";

import PostCard from "./../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS_GET_ALL);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1> Loading Posts</h1>
        ) : (
          data.posts.total_data &&
          data.posts.nodes.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
