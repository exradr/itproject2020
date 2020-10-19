/** @jsx jsx */
import { jsx } from "theme-ui";
import Search from "./Search";
import React from "react";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import camel from "../../svg/camel.svg";
import { Link } from "react-router-dom";

const HomepageHeading = () => (
  <Container fluid text textAlign="center">
    <Grid stackable>
      <Grid.Row>
        <Grid.Column floated="center" width={4}>
          <Image rounded size="small" src={camel} />
        </Grid.Column>
        <Grid.Column textAlign="center" width={12}>
          <Header
            as="h1"
            content="Camel Pages"
            style={{
              fontSize: "5em",
              fontWeight: "normal",
              marginTop: "0.5em",
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Search />
    <br />
    <Button animated primary size="huge" as={Link} to="signup">
      <Button.Content visible>Get Started!</Button.Content>
      <Button.Content hidden>
        <Icon name="arrow right" />
      </Button.Content>
    </Button>
  </Container>
);

const HomepageBody = () => (
  <Container>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Hit the ground running
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Pick a ready-made template without having to worry about complex
              or complicated features while still being able to customise it
              enough to call it your’s.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image rounded size="large" src={camel} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    {/* Add some quotes lmao */}
    {/* <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "Love"
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              That is what they all say about us
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment> */}

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Image rounded size="large" src={camel} />
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              An eye for aesthetics
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Add colour and life to your portfolio by choosing one of our
              favourite colour palettes.
            </p>
            <Button animated secondary size="huge" as={Link} to="themes">
              <Button.Content visible>Check out our themes!</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Container>
);

export default () => {
  return (
    <React.Fragment>
      <HomepageHeading />
      <HomepageBody />
    </React.Fragment>
  );
};
