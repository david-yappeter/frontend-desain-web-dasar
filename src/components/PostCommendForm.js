import React, { useState } from "react";
import { Form, Button, Card, Grid } from "semantic-ui-react";
import { useForm } from "./../utils/hooks";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { POST_COMMEND_CREATE, POST_GET_BY_ID } from "./../graphqls/index";

const PostCommendForm = (props) => {
  const [cookies] = useCookies();
  const [errors, setErrors] = useState({});
  const { postID, refetch } = props;
  const initialValue = {
    body: "",
  };
  const { values, onChange, onSubmit } = useForm(
    () => createComment(),
    initialValue
  );
  const [createComment, { loading }] = useMutation(POST_COMMEND_CREATE, {
    variables: {
      body: values.body,
      postID: postID,
    },
    update(proxy, result) {
      setErrors({});
      refetch();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]);
    },
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });

  return (
    <Grid.Row>
      <Grid.Column width={2} />
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>New Comment</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Form
              onSubmit={onSubmit}
              novalidation
              className={loading ? "loading" : "'"}
              style={{ width: "inherit" }}
            >
              <Form.Input
                label="Comment"
                placeholder="Comment..."
                name="body"
                value={values.body}
                onChange={onChange}
                onSubmit={onSubmit}
                type="text"
                fluid
              />
              <Button type="submit" primary>
                Submit
              </Button>
            </Form>
            {errors?.message && (
              <div className="ui error message">
                <ul className="list">
                  <li>{errors.message}</li>
                </ul>
              </div>
            )}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );
};

export default PostCommendForm;
