import React from "react";
import { Grid, Segment, Card, Placeholder } from "semantic-ui-react";
const SkeletonCard = (props) => {
  return (
    <>
      {Array.apply(null, Array(6)).map(() => (
        <Grid.Column style={{ marginBottom: "20px" }}>
          <Segment raised>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      ))}
    </>
  );
};

export default SkeletonCard;
