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
import { FunctionDocBlock } from "../../components/FunctionDocBlock";

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

export const FetchingDirectlyAList = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Fetching directly a list</SectionTitle>
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
      <FunctionDocBlock
  name="fetchResources"
  description="Fetches QDN resources using SEARCH_QDN_RESOURCES with support for pagination, cache, and filtering out 32-byte items."
  params={[
    {
      name: "params",
      type: "QortalSearchParams",
      required: true,
      description: "The search parameters passed to the QDN search API.",
    },
    {
      name: "listName",
      type: "string",
      required: true,
      description: "A unique name to group the search cache for reuse.",
    },
    {
      name: "returnType",
      type: '"JSON" | string',
      required: false,
      description: 'Format of the returned data. Default is "JSON".',
    },
    {
      name: "cancelRequests",
      type: "boolean",
      required: false,
      description: "If true, cancels all previous fetch requests before starting a new one.",
    },
  ]}
  returnType={{
    type: "Promise<QortalMetadata[]>",
    description: "A promise that resolves to an array of QortalMetadata objects.",
  }}
/>
    </DocContainer>
  );
};
