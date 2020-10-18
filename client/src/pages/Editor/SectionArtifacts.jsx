/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button } from "semantic-ui-react";
import Section from "./Section";
import { Media } from "../../components/Media";

const SectionArtifacts = () => {
  return (
    <Section name="Manage Media" icon="file image">
      <Media />
    </Section>
  );
};
export default SectionArtifacts;
