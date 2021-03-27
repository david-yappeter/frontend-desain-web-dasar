import React, { Fragment, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid, Transition, Button, Icon } from "semantic-ui-react";
import { QUERY_POSTS_GET_ALL } from "./../graphqls/index";
import { useCookies } from "react-cookie";

import { useWindowWidth } from "./../utils/hooks";
import { PostCard, PostForm } from "./../components/index";

const Home = () => {
  const windowWidth = useWindowWidth();
  const divider = windowWidth >= 1100 ? 3 : windowWidth > 700 ? 2 : 1;
  const [cookies] = useCookies();
  const [postGetAll, { loading, data, refetch }] = useLazyQuery(
    QUERY_POSTS_GET_ALL,
    {
      variables: {
        sortBy: "created_at",
        ascending: false,
      },
    }
  );

  useEffect(() => {
    postGetAll();
  }, []);

  return (
    <Grid columns={divider} divided={divider !== 1}>
      <Grid.Row className="page-title">
        <Button
          style={{ marginLeft: "15px" }}
          floated="left"
          primary
          onClick={() =>
            refetch({
              sortBy: "created_at",
              ascending: false,
            })
          }>
          <Icon name="sync" style={{ margin: "0" }} />
        </Button>
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
            {!loading &&
              data?.posts.nodes.length > 0 &&
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
