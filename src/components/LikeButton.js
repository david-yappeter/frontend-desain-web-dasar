import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Form, Card, Icon, Label, Image, Button } from "semantic-ui-react";
import jwtDecode from "jwt-decode";
import { POST_LIKE, QUERY_POSTS_GET_ALL } from "./../graphqls/index";

const LikeButton = (props) => {
  const { refetch } = props;
  const { id, likes } = props.post;
  const [cookies] = useCookies();
  const [postLike, { loading }] = useMutation(POST_LIKE, {
    update(cache, result) {
      refetch && refetch();

      const data = cache.readQuery({
        query: QUERY_POSTS_GET_ALL,
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });

      cache.writeQuery({
        query: QUERY_POSTS_GET_ALL,
        data: result.data.post_like.like_or_unlike
          ? {
              posts: {
                nodes: data?.posts.nodes.map((post) => {
                  return {
                    ...post,
                    likes:
                      post.id === id
                        ? [...post.likes, result.data.post_like.like_or_unlike]
                        : post.likes,
                  };
                }),
              },
            }
          : {
              posts: {
                nodes: data?.posts.nodes.map((post) => {
                  return {
                    ...post,
                    likes:
                      post.id === id
                        ? post.likes.filter(
                            (like) =>
                              like.user_id !==
                              jwtDecode(cookies.access_token).id
                          )
                        : post.likes,
                  };
                }),
              },
            },
        variables: {
          ascending: false,
          sortBy: "created_at",
        },
      });
    },
    variables: {
      postID: id,
    },
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });
  const [buttonLike, setButtonLike] = useState(false);

  useEffect(() => {
    if (
      cookies.access_token &&
      likes.find((like) => like.user_id === jwtDecode(cookies.access_token).id)
    ) {
      setButtonLike(true);
    } else {
      setButtonLike(false);
    }
  }, [buttonLike, likes]);

  const handlePostLike = () => postLike();

  const LikedButton = () =>
    cookies.access_token ? (
      buttonLike ? (
        <Button color="teal" onClick={handlePostLike}>
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
    <Form
      className={loading ? "loading" : ""}
      style={{ display: "inline-flex" }}>
      <Button as="div" labelPosition="right">
        <LikedButton />
        <Label as="a" basic color="red" pointing="left">
          {likes.length}
        </Label>
      </Button>
    </Form>
  );
};

export default LikeButton;
