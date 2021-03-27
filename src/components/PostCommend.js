import React, { useState } from "react";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import {
  Form,
  Card,
  Grid,
  Image,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import { POST_COMMEND_DELETE, POST_GET_BY_ID } from "./../graphqls/index";
import { useMutation } from "@apollo/client";

const PostCommend = (props) => {
  const [cookies] = useCookies();
  const {
    id,
    user: { name },
    user_id,
    body,
    created_at,
  } = props.commend;
  const { refetch } = props;

  const [deletePost, { loading }] = useMutation(POST_COMMEND_DELETE, {
    update() {
      refetch();
    },
    onError(err) {
      console.log(err);
    },
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: {
      id: id,
    },
  });

  return (
    <Grid.Row key={id}>
      <Grid.Column width={2} />
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
            {cookies.access_token &&
              jwtDecode(cookies.access_token).id === user_id && (
                <Form className={loading ? "loading" : ""}>
                  <Button
                    color="red"
                    floated="right"
                    onClick={() => deletePost()}
                  >
                    <Icon name="trash" style={{ margin: "0" }} />
                  </Button>
                </Form>
              )}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
};

export default PostCommend;
