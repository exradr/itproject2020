/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

import { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  Menu,
  Grid,
  Dropdown,
  Input,
} from "semantic-ui-react";

export default function PageList({ pages }) {
  const [activeItem, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const handlePageClick = (e, page) => {
    setActive(activeItem === { page });
  };

  const items = pages.map(page => (
    <Menu.Item
      name={page}
      active={activeItem === { page }}
      onClick={handlePageClick}
    >
      <span>
        <Grid>
          <Grid.Column floated="left" width={5}>
            {page}
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Dropdown right aligned floating inline direction="left">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name="i cursor" fitted /> Rename Page
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="trash" fitted /> Delete Page
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
      </span>
    </Menu.Item>
  ));
  const newPage = (
    <Modal
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: true }}
      open={open}
      size="FullScreen"
      trigger={
        <Menu.Item
          name="Create Page"
          active={activeItem === "Create Page"}
          onClick={handlePageClick}
        >
          <Button primary>
            <Icon.Group fitted sx={{ mr: "0.5em" }}>
              <Icon name="file text" />
              <Icon corner name="add" />
            </Icon.Group>
            Create Page
          </Button>
        </Menu.Item>
      }
    >
      <Modal.Header>
        <Input transparent placeholder="Page Name" />
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description></Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <Flex sx={{ justifyContent: "center" }}>
      <Menu secondary vertical>
        {items}
        {newPage}
      </Menu>
    </Flex>
  );
}
