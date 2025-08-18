import React from "react";
import { DocContainer } from "../../components/Containers";
import {
  SectionSubTitle,
  SectionTitle,
  SingleText,
} from "../../components/Texts";
import { Spacer } from "../../../components/Spacer";
import { FeatureList } from "../../components/FeatureList";
import { DisplayCode } from "../../../components/DisplayCode";

const codeblock1 = `
import { usePublish }  from "qapp-core";

// inside the React component

const {deletePublish} = usePublish();

 await deletePublish({
  name,
  service,
  identifier
 })
]);
`.trim();

export const DeletingData = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Deleting data</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        To override(similar to a deletion) the resource, use the deletePublish method.
      </SingleText>
      <Spacer height="25px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
    </DocContainer>
  );
};
