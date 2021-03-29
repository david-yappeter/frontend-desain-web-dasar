import React from "react";
import {
  Form,
  Card,
  Icon,
  Label,
  Image,
  Button,
  Popup,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { DELETE_POST, QUERY_POSTS_GET_ALL } from "./../graphqls/index";
import { useMutation } from "@apollo/client";
import LikeButton from "./LikeButton";

const PostCard = (props) => {
  const [cookies] = useCookies();
  const {
    post: {
      id,
      body,
      created_at,
      user_id,
      user: { name, avatar },
      likes,
      commends,
    },
  } = props;
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    update(cache) {
      const data = cache.readQuery({
        query: QUERY_POSTS_GET_ALL,
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });
      cache.writeQuery({
        query: QUERY_POSTS_GET_ALL,
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
        data: {
          posts: {
            total_data: data.posts.total_data - 1,
            nodes: data.posts.nodes.filter((val) => val.id !== id),
          },
        },
      });
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      id: id,
    },
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  const CommendButton = () => (
    <Popup
      content="Comment This Post"
      inverted
      trigger={
        <Button as={Link} to={`post/${id}`} labelPosition="right">
          <Button color="blue">
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {commends.length}
          </Label>
        </Button>
      }
    />
  );

  return (
    <Form className={loading ? "loading" : ""}>
      <Card fluid>
        <Card.Content as={Link} to={`/post/${id}`}>
          <Image
            circular
            floated="right"
            size="mini"
            src={avatar ? avatar : process.env.REACT_APP_DEFAULT_IMAGE}
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
          <Card.Description>
            <div style={{ wordWrap: "break-word", flex: "inherit" }}>
              {body}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton post={{ id, likes }} />
          <CommendButton />
          {cookies.access_token &&
            jwtDecode(cookies.access_token).id === user_id && (
              <Button
                as="div"
                color="red"
                floated="right"
                onClick={handleDeletePost}>
                <Icon name="trash" style={{ margin: "0" }} />
              </Button>
            )}
        </Card.Content>
      </Card>
    </Form>
  );
};

export default PostCard;
