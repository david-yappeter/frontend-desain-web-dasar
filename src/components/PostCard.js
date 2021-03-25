import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { DELETE_POST, QUERY_POSTS_GET_ALL } from "./../graphqls/index";
import { useMutation } from "@apollo/client";

const PostCard = (props) => {
  const [cookies] = useCookies();
  const {
    post: {
      id,
      body,
      created_at,
      user_id,
      user: { name },
      likes,
      commends,
    },
  } = props;
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    update(cache, result) {
      const data = cache.readQuery({
        query: QUERY_POSTS_GET_ALL,
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });
      console.log(result);
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
  });

  const handleLikePost = () => {
    console.log("like post");
  };

  const handleCommendClick = () => {
    console.log("commend post");
  };

  const handleDeletePost = () => {
    deletePost();
  };

  return (
    <div className={loading ? "loading" : ""}>
      <Card fluid>
        <Card.Content as={Link} to={`/post/${id}`}>
          <Image
            floated="right"
            size="mini"
            src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right" onClick={handleLikePost}>
            <Button color="teal" basic>
              <Icon name="heart" />
            </Button>
            <Label as="a" basic color="red" pointing="left">
              {likes.length}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={handleCommendClick}>
            <Button color="blue">
              <Icon name="comments" />
            </Button>
            <Label as="a" basic color="red" pointing="left">
              {commends.length}
            </Label>
          </Button>
          {cookies.access_token &&
            jwtDecode(cookies.access_token).id === user_id && (
              <Button
                as="div"
                color="red"
                floated="right"
                onClick={handleDeletePost}>
                <Icon name="trash" />
              </Button>
            )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostCard;
