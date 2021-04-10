import { useLazyQuery } from "@apollo/client";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import {
  Card,
  Transition,
  Grid,
  Image,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import PostCommend from "./../components/PostCommend";
import { POST_GET_BY_ID } from "../graphqls";
import PostCommendForm from "../components/PostCommendForm";
import { useCookies } from "react-cookie";
import { useWindowWidth } from "../utils/hooks";

const SinglePost = (props) => {
  const windowWidth = useWindowWidth();
  const [cookies] = useCookies();
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
    user: { name, avatar },
    likes,
    commends,
  } = data.post;

  const GridResponsive = ({ image, component }) => (
    <Grid>
      <Grid.Row>
        {windowWidth >= 768 && <Grid.Column width={2}>{image}</Grid.Column>}
        <Grid.Column
          width={windowWidth >= 768 ? 10 : windowWidth >= 480 ? 13 : 16}
          style={windowWidth < 768 ? { margin: "auto" } : {}}>
          {component}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return (
    <Fragment>
      <GridResponsive
        image={
          <Image
            circular
            size="small"
            src={avatar ? avatar : process.env.REACT_APP_DEFAULT_IMAGE}
          />
        }
        component={
          <Card fluid>
            <Card.Content>
              {windowWidth < 768 && (
                <Image
                  circular
                  floated="right"
                  size="mini"
                  src={avatar ? avatar : process.env.REACT_APP_DEFAULT_IMAGE}
                />
              )}
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{moment(created_at).fromNow()}</Card.Meta>
              <Card.Description>
                <div style={{ wordWrap: "break-word", flex: "inherit" }}>
                  {body}
                </div>
              </Card.Description>
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
        }
      />
      <Transition.Group>
        {commends.map((commend) => (
          <GridResponsive
            component={
              <PostCommend
                key={commend.id}
                refetch={refetch}
                commend={{ ...commend }}
              />
            }
          />
        ))}
        {cookies.access_token && (
          <GridResponsive
            component={<PostCommendForm postID={postID} refetch={refetch} />}
          />
        )}
      </Transition.Group>
    </Fragment>
  );
};

export default SinglePost;
