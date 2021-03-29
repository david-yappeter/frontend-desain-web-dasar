import React, { useState } from "react";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Form, Card, Grid, Button, Image, Icon } from "semantic-ui-react";
import { POST_COMMEND_DELETE } from "./../graphqls/index";
import { useMutation } from "@apollo/client";

const PostCommend = (props) => {
  const [cookies] = useCookies();
  const {
    id,
    user: { name, avatar },
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
    <Card fluid>
      <Card.Content>
        <Image
          circular
          floated="right"
          size="mini"
          src={avatar ? avatar : process.env.REACT_APP_DEFAULT_IMAGE}
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
        {cookies.access_token &&
          jwtDecode(cookies.access_token).id === user_id && (
            <Form className={loading ? "loading" : ""}>
              <Button color="red" floated="right" onClick={() => deletePost()}>
                <Icon name="trash" style={{ margin: "0" }} />
              </Button>
            </Form>
          )}
      </Card.Content>
    </Card>
  );
};

export default PostCommend;
