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
import { useGlobal, objectToBase64 }  from "qapp-core";


// inside the React component
const {lists} = useGlobal()
const {addNewResources} = lists
const data = {} // your data
const dataToBase64 =  await objectToBase64(data);

const response = await qortalRequest({
  action: "PUBLISH_QDN_RESOURCE",
  service: "DOCUMENT",
  identifier: 'an identifier',
  base64: dataToBase64
});     

addNewResources("homepage-videos", [
    {
     qortalMetadata: {
     service: "DOCUMENT",
     identifier: response.identifier,
     name: response.name,
     size: response.size,
     created: response.timestamp,
    },
    data: data,
  },
]);
`.trim();

export const AddingToAList = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Adding to a list</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        After the user has performed a publish, add it to the list. Use the addNewResources method.
      </SingleText>
      <Spacer height="25px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        The <strong>addNewResources</strong> requires the list's name and
        resources to be added to the list.
      </SingleText>
      <Spacer height="10px" />
    </DocContainer>
  );
};
