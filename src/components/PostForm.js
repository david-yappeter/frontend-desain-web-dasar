import React, { useState } from "react";
import { Form, Button, Card, Icon, Label } from "semantic-ui-react";
import { useForm } from "./../utils/hooks";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { CREATE_POST, QUERY_POSTS_GET_ALL } from "./../graphqls/index";

const PostForm = () => {
  const [cookies] = useCookies();
  const [errors, setErrors] = useState({});
  const initialValue = {
    body: "",
  };
  const { values, onChange, onSubmit } = useForm(
    () => createPost(),
    initialValue
  );
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      setErrors({});
      const data = proxy.readQuery({
        query: QUERY_POSTS_GET_ALL,
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });
      proxy.writeQuery({
        query: QUERY_POSTS_GET_ALL,
        data: {
          posts: {
            total_data: data.posts.total_data + 1,
            nodes: [result.data.post.create, ...data.posts.nodes],
          },
        },
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });
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
    <Card fluid>
      <Card.Content>
        <Card.Header>Create A Post</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Form
          onSubmit={onSubmit}
          novalidation
          className={loading ? "loading" : "'"}
          style={{ width: "inherit" }}
        >
          <Form.Input
            label="Content"
            placeholder="Content..."
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
  );
};

export default PostForm;
