/** @jsx jsx */
import { jsx } from "theme-ui";
import { MenuItem, Navbar } from "../../components";

export default () => {
  return (
    <Navbar stackable attached="bottom">
      <Navbar.Left>
        <MenuItem to="/">camel_case</MenuItem>
        <div sx={{ p: 2 }}>
          Josh, Lawrence, Liam, Chan Jie and Yung Cheng. 2020
        </div>
      </Navbar.Left>
      <Navbar.Right>
        <MenuItem href="https://github.com/exradr/itproject2020">
          GitHub
        </MenuItem>
        <MenuItem href="mailto:support+camelpages2020@gmail.com">
          Support
        </MenuItem>
      </Navbar.Right>
    </Navbar>
  );
};
