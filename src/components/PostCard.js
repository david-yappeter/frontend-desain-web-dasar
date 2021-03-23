import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

const PostCard = (props) => {
  const {
    post: {
      id,
      body,
      created_at,
      user: { name },
      likes,
      commends,
    },
  } = props;

  const handleLikePost = () => {
    console.log("like post");
  };

  const handleCommendClick = () => {
    console.log("commend post");
  };

  return (
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
      </Card.Content>
    </Card>
  );
};

export default PostCard;
