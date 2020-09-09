import React from "react";
import { Box, Flex } from "theme-ui";
import camel from "../../svg/Profile_example.png";

import { MenuItem, MenuImage, ThemeSelector } from "../../components";

export default props => {
  const { userId: id, theme, setTheme, pages } = props;

  let menuItems = pages.map(name => (
    <MenuItem to={`#${name}`}>{name}</MenuItem>
  ));

  menuItems[0] = <MenuItem to={`#`}>{id}</MenuItem>;

  return (
    <Box p={10}>
      <Flex
        as="nav"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          bg: "muted",
          color: "secondary",
        }}
      >
        <MenuImage src={camel} to="#" />
        {menuItems}
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </Flex>
    </Box>
  );
};