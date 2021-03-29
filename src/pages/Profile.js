import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Grid, Card, Image, Divider, Form, Button } from "semantic-ui-react";
import { useToken, useWindowWidth } from "../utils/hooks";
import { CHANGE_PASSWORD_USER, USER_ME } from "./../graphqls/index";

const Profile = () => {
  const data = useToken();
  const windowWidth = useWindowWidth();
  const [cookies] = useCookies();
  const [values, setValues] = useState({
    name: "",
  });

  const [changeName, { loading }] = useMutation(CHANGE_PASSWORD_USER, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: values,
    update(cache, result) {
      const data = cache.readQuery({
        query: USER_ME,
      });
      cache.writeQuery({
        query: USER_ME,
        data: {
          me: {
            ...data.me,
            name: values.name,
          },
        },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeName();
  };

  useEffect(() => {
    data && setValues({ ...values, name: data.me.name });
  }, [data]);

  if (!data) {
    return <h1> Loading.</h1>;
  }

  if (!cookies.access_token) {
    return <Redirect to="/login" />;
  }

  const ProfileImage = () => (
    <Image
      centered
      circular
      centered
      size={windowWidth >= 768 ? "small" : "tiny"}
      src={data.me.avatar ? data.me.avatar : process.env.REACT_APP_DEFAULT_IMAGE}
    />
  );

  return (
    <Card fluid>
      <Card.Content>
        <Grid>
          {windowWidth >= 768 && (
            <Grid.Column width={3}>
              <ProfileImage />
            </Grid.Column>
          )}
          <Grid.Column width={windowWidth >= 768 ? 13 : 16}>
            <Card.Header textAlign="center">
              <h2>Profile</h2>
            </Card.Header>
            <Divider />
            {windowWidth < 768 && (
              <Card.Header textAlign="center">
                <ProfileImage />
              </Card.Header>
            )}
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
              <Form.Input
                label="Name :"
                name="name"
                value={values.name}
                onChange={onChange}
                type="text"
              />
              <Button primary type="submit">
                Change Name
              </Button>
            </Form>
            <h5>Email :</h5>
            <span>davidyap11les@gmail.com</span>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Profile;
