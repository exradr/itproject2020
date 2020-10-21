/** @jsx jsx */
import { jsx, Flex, Box, Styled } from "theme-ui";

import {
  selectArtifactsByPageId,
  selectPageById,
  selectPortfolioIsEditing,
  selectPortfolioPages,
  selectPortfolioProfile,
  selectPortfolioBio,
  changePortfolioBio,
  selectSocialIcons,
} from "../../store";
import { Section, Artifact } from "../../components";
import {
  Button,
  Form,
  Icon,
  TextArea,
  Segment,
  Header,
  Modal,
} from "semantic-ui-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtifactForm } from "../../components/ArtifactForm";
import { NewPageModal } from "../Editor/SectionPages";
import { EditableUserProfile } from "../../components/ProfileIcon";
import {
  createArtifactStarted,
  editArtifactFinished,
  editArtifactStarted,
  selectArtifactCurrentlyEditing,
} from "../../store/slices/ui";
import { useEffect } from "react";
import { SocialIcon } from "react-social-icons";

const EditBioModal = ({ bio }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ bio });
  const dispatch = useDispatch();
  const handleChange = (e, { name, value }) =>
    setState({ ...state, [name]: value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePortfolioBio(state.bio));
    setOpen(false);
  };

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: true }}
      open={open}
      trigger={
        <Button icon labelPosition="left">
          <Icon inline name="pencil" />
          Edit bio
        </Button>
      }
    >
      <Modal.Header>Biography</Modal.Header>
      <Modal.Content>
        <TextArea
          transparent
          fluid
          iconPosition="left"
          icon="file"
          placeholder="a short thing about yourself..."
          name="bio"
          onChange={handleChange}
          defaultValue={bio}
          required
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const SocialIcons = id => {
  const socials = useSelector(state => selectSocialIcons(state, id));

  return (
    <Box>
      {/* {socials.map(social => (
        <SocialIcon key={social} url={social} />
      ))} */}
    </Box>
  );
};

const MainHeader = ({ username, bio, editing }) => {
  return (
    <Box mb={5}>
      <EditableUserProfile editing={editing} username={username} />
      {/* TODO: put first name + last name here instead! */}
      <Styled.h1> {username} </Styled.h1>
      <Styled.p> {bio} </Styled.p>
      {editing ? <EditBioModal bio={bio} /> : null}
      <SocialIcons />
    </Box>
  );
};

const Page = ({ pageId: id, name, userId }) => {
  const page = useSelector(state => selectPageById(state, id));
  const content = useSelector(state => selectArtifactsByPageId(state, id));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  const dispatch = useDispatch();
  // TODO: display a toast saying unable to fetch page.
  if (page === undefined) return null;
  const { type, loading } = page;
  const artifacts = content.map(artifact => (
    // TODO: add loader
    <Artifact
      {...artifact}
      editing={editing}
      openEditor={() =>
        editing ? dispatch(editArtifactStarted(artifact)) : null
      }
      // temporarily, while we wait for a backend fix...
      type={type}
    />
  ));

  const newbtn = (
    <Button
      icon
      labelPosition="left"
      onClick={() => dispatch(createArtifactStarted({ type, pageId: id }))}
    >
      <Icon name="add" />
      Add {type}
    </Button>
  );

  const pageProps = {
    id,
    name,
    loading,
    content: artifacts,
    editing,
    type,
    newbtn,
  };

  return <Section {...pageProps} />;
};

const NewPlaceholder = ({ children, tagline }) => (
  <Box sx={{ margin: "2em" }}>
    <Segment placeholder fluid>
      <Header icon>
        <Icon name="file outline" />
        {tagline}
      </Header>
      {children}
    </Segment>
  </Box>
);

const SinglePagePortfolio = props => {
  const { userId } = props;
  const bio = useSelector(state => selectPortfolioBio(state, userId));
  const pages = useSelector(state => selectPortfolioPages(state, userId));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));
  const profile = useSelector(state => selectPortfolioProfile(state, userId));
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();
  const artifactEditing = useSelector(state =>
    selectArtifactCurrentlyEditing(state)
  );
  // userId will be given with the pages selector, so no need to pass it to children (...page)
  const pageContainers = pages.map(page => (
    <Page {...page} key={page.pageId.toString()} userId={userId} />
  ));

  useEffect(() => {
    if (artifactEditing) {
      setEditOpen(true);
    }
  }, [artifactEditing]);

  const styling = {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Flex as="main" sx={styling}>
      <MainHeader
        username={userId}
        bio={bio}
        editing={editing}
        profile={profile}
      />
      <ArtifactForm
        open={editOpen}
        closeModal={() => {
          setEditOpen(false);
          dispatch(editArtifactFinished);
        }}
        currentlyEditing={artifactEditing}
      />
      {editing && pages.length === 0 ? (
        <NewPlaceholder tagline="No pages yet!  Would you like to create a new one?">
          <NewPageModal />
        </NewPlaceholder>
      ) : null}
      {pageContainers}
      {editing && pages.length !== 0 ? (
        <NewPlaceholder tagline="We're at the end here, want to create a new page?">
          <NewPageModal />
        </NewPlaceholder>
      ) : null}
    </Flex>
  );
};

// TODO: implement Multi Page Portfolio

export default SinglePagePortfolio;
