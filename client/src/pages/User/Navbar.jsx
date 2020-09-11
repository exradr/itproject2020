import React from "react";
import { Box, Flex } from "theme-ui";


import { MenuItem, Profile, ThemeSelector } from "../../components";
export default props => {
  const { userId: id, theme, setTheme, pages } = props;
    
  const navBarStyle = {
    display:"flex",
    flex:2, 
    justifyContent:"center", 
    alignItems:"center"
  };

  let menuItems = pages.map(name => (
    <MenuItem to={`#${name}`}>{name}</MenuItem>
  ));

  menuItems[0] = <MenuItem to={`#`}>{id}</MenuItem>;

  return (
    <Box p={10}>
      <Flex as="nav">

        <Box sx={{ flex: 1 }}>
          <Profile userId={id} to="#" />
        </Box>
        <Box sx={navBarStyle}>
          {menuItems}
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </Box> 
        <Box sx={{ flex: 1 }} />
      </Flex>
    </Box>
  );
};
