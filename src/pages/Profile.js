import React from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Grid, Card, Image, Divider, Form, Button } from "semantic-ui-react";
import { useForm, useWindowWidth } from "../utils/hooks";

const Profile = () => {
  const windowWidth = useWindowWidth();
  const [cookies] = useCookies();
  const initialValue = {
    name: "David Yap",
  };
  const { values, onChange, onSubmit } = useForm(() => {}, initialValue);

  if (!cookies.access_token) {
    return <Redirect to="/login" />;
  }

  const ProfileImage = () => (
    <Image
      centered
      circular
      centered
      size={windowWidth >= 768 ? "small" : "tiny"}
      src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
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
            <Form onSubmit={onSubmit}>
              <Form.Input
                label="Name :"
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
