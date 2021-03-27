import { useLazyQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect } from "react";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { POST_GET_BY_ID } from "../graphqls";

const SinglePost = (props) => {
  const postID = props.match.params.postID;
  const [getPost, { loading, data, called, refetch }] = useLazyQuery(
    POST_GET_BY_ID,
    {
      variables: {
        id: postID,
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    getPost();
  }, []);

  const handleCommendClick = () => {
    console.log("commend click");
  };

  if (!called || (called && loading)) {
    return <h2> Loading Post . .</h2>;
  }

  const {
    id,
    body,
    created_at,
    user_id,
    user: { name },
    likes,
    commends,
  } = data.post;

  console.log(commends);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated="right"
            size="small"
            src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
              <Card.Description>
                <div style={{ wordWrap: "break-word", flex: "inherit" }}>
                  {body}
                </div>
              </Card.Description>
              <hr />
            </Card.Content>
            <Card.Content extra>
              <LikeButton post={{ id, likes }} refetch={refetch} />
              <Button
                as="div"
                labelPosition="right"
                onClick={handleCommendClick}>
                <Button color="blue">
                  <Icon name="comments" />
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  {commends.length}
                </Label>
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      {commends.map((commend) => (
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{commend.user.name}</Card.Header>
                <Card.Meta>{moment(commend.created_at).fromNow()}</Card.Meta>
                <Card.Description>{commend.body}</Card.Description>
                <Button color="red" floated="right">
                  <Icon name="trash" style={{ margin: "0" }} />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default SinglePost;
