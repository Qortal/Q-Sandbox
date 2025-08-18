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
const {isLoading, error, resource, hasResource, } = usePublish(
  3,  // max fetch retries
  "JSON"  // returned type ("JSON" | "BASE64")
  {
    identifier,
    name,
    service
  });

  if(isLoading) return <Loader />

  if(hasResource === false) return <p>Resource does not exist</p>

  if(error) return <p>{error}</p>

  return <p>title: {resource?.data?.title}</p>
`.trim();

const codeblock2 = `
import { usePublish }  from "qapp-core";

// inside the React component
const publishOperations = usePublish(3, "BASE64");
const fetchPublish = publishOperations.fetchPublish


const handleFetchPublish = async ()=> {
  
    const {resource, hasResource, error} = await fetchPublish({
          name,
          identifier,
          service,
        });

}

return <button onClick={handleFetchPublish}>fetch data</button>
`.trim();

const codeblock3 = `
import { useResourceStatus }  from "qapp-core";

// inside the React component
const {isReady, status, percentLoaded, resourceUrl } = useResourceStatus(
  {
    identifier,
    name,
    service
  });

  if(isLoading) return <Loader />

  if(status === "FAILED_TO_DOWNLOAD") return <p>unable to load video</>

  if(!isReady) return <Loader percentLoaded={percentLoaded} />


  return <video src={resourceUrl} />
`.trim();

export const FetchingData = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Fetching data</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        In this section we will discuss how to retrive an individual resource's QDN data.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>We will be using the <strong>usePublish</strong> hook to retrive the data.</SingleText>
      <Spacer height="10px" />
      <SingleText>There are two ways to retrive data using <strong>usePublish</strong></SingleText>
      <Spacer height="25px" />
      <SectionSubTitle>Fetch data on mount</SectionSubTitle>
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />

      <Spacer height="25px" />
      <SectionSubTitle>Manually fetch data</SectionSubTitle>
      <DisplayCode hideLines codeBlock={codeblock2} language="jsx" />

      <Spacer height="25px" />
      <SectionSubTitle>Fetching large sized data</SectionSubTitle>
      <Spacer height="10px" />
      <SingleText>When fetching data that is large such as a video, it is recommended to use the <strong>useResourceStatus</strong> hook. This hook returns the status of the resource. Once it indicates that the data is ready to be used, you can use it.</SingleText>
      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock3} language="jsx" />
      <Spacer height="10px" />
      
    
    </DocContainer>
  );
};
