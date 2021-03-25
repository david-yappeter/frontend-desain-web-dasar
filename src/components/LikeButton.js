import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Form, Card, Icon, Label, Image, Button } from "semantic-ui-react";
import jwtDecode from "jwt-decode";
import { POST_LIKE } from "./../graphqls/index";

const LikeButton = (props) => {
  const { id, likes } = props.post;
  const [postLike] = useMutation(POST_LIKE, {
    variables: {
      postID: id,
    },
  });
  const [buttonLike, setButtonLike] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    if (
      cookies.access_token &&
      likes.find((like) => like.user_id === jwtDecode(cookies.access_token).id)
    ) {
      setButtonLike(true);
    } else {
      setButtonLike(false);
    }
  }, [buttonLike, cookies.access_token]);

  const handlePostLike = () => postLike();

  const LikedButton = () =>
    cookies.access_token ? (
      buttonLike ? (
        <Button color="teal">
          <Icon name="heart" />
        </Button>
      ) : (
        <Button color="teal" basic onClick={handlePostLike}>
          <Icon name="heart" />
        </Button>
      )
    ) : (
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    );

  return (
    <Button as="div" labelPosition="right">
      <LikedButton />
      <Label as="a" basic color="red" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
};

export default LikeButton;
