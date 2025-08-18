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

// you can import the QortalMetadata interface from "qapp-core"
interface QortalMetadata {
    size: number;
    created: number;
    name: string;
    identifier: string;
    service: Service;
}
    
// inside the React component
const {lists} = useGlobal()
const {deleteResource} = lists

const qortalMetadata: QortalMetadata = the qortalMetadata
  
 await deleteResource([
   qortalMetadata: qortalMetadata
  ])
]);
`.trim();

export const RemovingFromAList = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Remove from list</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        To override(similar to a deletion) and remove it from the list, use the deleteResource method.
      </SingleText>
      <Spacer height="25px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        The <strong>deleteResource</strong> requires the list's name and
        the resource's qortalMetadata.
      </SingleText>
      <Spacer height="10px" />
    </DocContainer>
  );
};
