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
import { usePublish, objectToBase64 }  from "qapp-core";

// inside the React component

const {updatePublish} = usePublish();

const data = {} // your data
const dataToBase64 =  await objectToBase64(data);

const service = "DOCUMENT
const identifier = "an identifier"
const base64 = dataToBase64
const response = await qortalRequest({
  action: "PUBLISH_QDN_RESOURCE",
  service,
  identifier,
  base64
});  

updatePublish(
    {
      name,
      service,
      identifier,
    },
    data
);
`.trim();

export const UpdatingData = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">New or Updated data</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        After publishing a resource to QDN, use the <strong>updatePublish</strong> to cache the new data. This is recommended since there is a few min lag between a publish and it showing up. This way the user sees the data after they publish.
      </SingleText>
      <Spacer height="25px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
    </DocContainer>
  );
};
