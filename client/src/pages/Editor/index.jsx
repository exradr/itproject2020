/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import User from "../User";
import { useSelector } from "react-redux";
import { Toast } from "./../../components/index";
import Sidebar from "./Sidebar";

import themes from "../../themes";
import {
  getMedia,
  selectCurrentUserPortfolio,
  selectUsername,
  selectAuthError,
  selectPortfoliosLoading,
} from "../../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { createMedia } from "@artsy/fresnel";
import AccessDenied from "../Main/AccessDenied";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 700,
    computer: 700,
  },
});

export default props => {
  const { selectedPage, editing = true } = props;
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const authError = useSelector(selectAuthError);
  const loading = useSelector(selectPortfoliosLoading);

  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [allowMobileEditing, setAllowMobileEditing] = useState(false);

  const id = useSelector(selectUsername);

  useEffect(() => {
    if (editing) {
      dispatch(getMedia());
      setTimeout(() => setOpen(true), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  useEffect(() => {
    if (authError) {
      history.push("/logout");
      toast.info(
        <Toast
          title="You've been logged out."
          message={authError.data}
          technical={authError.message}
        />
      );
    }
    if (id === undefined) {
      history.push("/login");
      toast.error(<Toast title="You need to login to edit a portfolio." />);
    }
  });

  return (
    <Flex
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
        color: "black",
      }}
    >
      <MediaContextProvider>
        <Media lessThan="tablet">
          <Dimmer
            active={!allowMobileEditing}
            onClickOutside={() => setAllowMobileEditing(true)}
            page
          >
            <AccessDenied />
          </Dimmer>
        </Media>
      </MediaContextProvider>
      <ThemeProvider theme={themes.base}>
        <Flex
          sx={{
            width: "250px",
            overflowY: "auto",
            overflowX: "hidden",
            height: "100vh",
            flexDirection: "column",
            boxShadow: "1px 0 6px 0px #999",
            position: "absolute",
            transition: "0.2s",
            zIndex: "999",
            background: "white",
            fontFamily: "sans-serif",
            transform: `translate(${open && portfolio ? 0 : -250}px, 0px)`,
          }}
        >
          {portfolio ? (
            <Sidebar
              closeEditor={() => {
                setOpen(false);
                setTimeout(() => history.push(`/u/${id}`), 200);
              }}
            />
          ) : null}
        </Flex>
      </ThemeProvider>
      <Dimmer.Dimmable
        as="main"
        dimmed={loading}
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          transition: "0.2s",
          marginLeft: `${open && portfolio ? 250 : 0}px`,
        }}
      >
        <User userId={id} selectedPage={selectedPage} />
        <Dimmer active={portfolio && loading} inverted>
          <Loader inverted />
        </Dimmer>
      </Dimmer.Dimmable>
    </Flex>
  );
};
