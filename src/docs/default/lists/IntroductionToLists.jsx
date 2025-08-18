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
import { PropsTable } from "../../components/PropsTable";
import { Box, Card, Typography } from "@mui/material";
import { CodePropsTable } from "../../components/CodePropsTable";

const listComponentProps = [
  {
    prop: "search",
    required: "true",
    type: "QortalSearchParams",
    description: "An object with your search params",
    default: "-",
  },
  {
    prop: "listItem",
    required: "true",
    type: "ReactNode",
    description:
      "A callback function that returns a React component. The React component is what will be shown as the items in your list.",
    default: "-",
  },
  {
    prop: "styles",
    type: "ResourceListStyles",
    description: "Custom styles applied to the component. gap will be in px",
    default: "{ gap: 1 }",
  },
  {
    prop: "defaultLoaderParams",
    type: "DefaultLoaderParams",
    description: "Loading texts if using the default list loader..",
    default: "-",
  },
  {
    prop: "loaderItem",
    type: "ReactNode",
    description:
      "A callback function that returns a React component. Function that renders a loader for individual list items.",
    default: "-",
  },
  {
    prop: "loaderList",
    type: "ReactNode",
    description: "Function that renders a loader for the full list.",
    default: "-",
  },
  {
    prop: "disableVirtualization",
    type: "boolean",
    description:
      "If true, renders all items without virtualization. There is no pagination when using virtualization.",
    default: "false",
  },
  {
    prop: "direction",
    type: '"VERTICAL" | "HORIZONTAL"',
    description: "The direction in which the list should render.",
    default: '"VERTICAL"',
  },
  {
    prop: "onSeenLastItem",
    type: "function",
    description:
      "Callback when the last item in the list is seen (for infinite scroll).",
    default: "-",
  },
  {
    prop: "listName",
    required: "true",
    type: "string",
    description: "Unique name used for caching/search state.",
    default: "-",
  },
  {
    prop: "searchCacheDuration",
    type: "number",
    description: "Time (in ms) to cache search results.",
    default: "300000 (5 mins)",
  },
  {
    prop: "resourceCacheDuration",
    type: "number",
    description: "Time (in ms) to cache resources like QDN responses.",
    default: "1800000 (30 mins)",
  },
  {
    prop: "disablePagination",
    type: "boolean",
    description: "If true, disables pagination.",
    default: "false",
  },
  {
    prop: "disableScrollTracker",
    type: "boolean",
    description: "If true, disables scroll tracking.",
    default: "false",
  },
  {
    prop: "entityParams",
    type: "EntityParams",
    description:
      "When using the build-in identifier builder, you can pass in the entity and parentId to create the identifier. Requires that the identifier in the search param be empty",
    default: "-",
  },
  {
    prop: "returnType",
    type: '"JSON" | "BASE64"',
    description:
      "Expected return format of the QDN resource. Either in JSON or base64",
    default: '"JSON"',
  },
  {
    prop: "onResults",
    type: "function",
    description:
      "Callback that fires when results are successfully fetched and rendered. Returns the list of results in data form.",
    default: "-",
  },
  {
    prop: "searchNewData",
    type: `
    {
      interval: number
      intervalSearch: QortalSearchParams
    }
    `,
    description:
      "An optional param. If populated, it will check for new data based on your search params.",
    default: "-",
  },
  {
    prop: "onNewData",
    type: "function",
    description:
      "Callback triggered when new data is fetched. Returns true if there is new data.",
    default: "-",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description:
      "Ref forwarded to the component. Contains helper functions. Includes the resetSearch method. Use this when you have new data and will like to restart the search to show the new data.",
    default: "-",
  },
];

const features = [
  {
    title: "Fetching: ",
    description: <>Fetches qdn resouces based on the search properties.</>,
  },
  {
    title: "Downloading: ",
    description: (
      <>
        Automatically downloads the resource and let's you know if it failed to
        download.
      </>
    ),
  },
  {
    title: "Display: ",
    description: (
      <>Returns the downloaded resource's raw data so it can be displayed</>
    ),
  },
  {
    title: "Pagination: ",
    description: <>Automatically handles pagination.</>,
  },
  {
    title: "Cache: ",
    description: (
      <>
        Caches the results for a few minutes. No need to worry about the lag
        time after a user publishes and for the result to show up.
      </>
    ),
  },
  {
    title: "Mutation: ",
    description: <>Ability to update, add and remove items from a list</>,
  },
];

export const IntroductionToLists = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Introduction to lists</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        This is an guide on how to use the{" "}
        <code>{"<ResourceListDisplay />"}</code> component
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        Use this component to display a list of content retrieved from QDN.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        Example of a use case is on Q-Tube's homepage, where a list of video
        templates is shown.
      </SingleText>
      <Spacer height="20px" />
      <SectionSubTitle variant="h1">Features</SectionSubTitle>
      <FeatureList items={features} />

      <Typography variant="h6" mt={4}>
        <code>{"<ResourceListDisplay />"}</code> Props
      </Typography>

      <PropsTable requiredColumn rows={listComponentProps} />
    </DocContainer>
  );
};
