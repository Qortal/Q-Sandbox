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
import devmode from "./devmode.png";
import { PropsTable } from "../../components/PropsTable";
import { Typography } from "@mui/material";

const globalProviderProps = [
  {
    prop: "config.auth.authenticateOnMount",
    type: "boolean",
    description:
      "Whether to trigger authentication logic when the component mounts.",
    default: "false",
  },
  {
    prop: "config.auth.balanceSetting.interval",
    type: "number",
    description: "How often (in ms) to poll for balance updates.",
    default: "180000",
  },
  {
    prop: "config.auth.balanceSetting.onlyOnMount",
    type: "boolean",
    description: "Only fetch balance once on mount.",
    default: "false",
  },
  {
    prop: "config.publicSalt",
    type: "string",
    description: "A unique salt used to identify your app’s public data.",
    default: "-",
  },
  {
    prop: "config.appName",
    type: "string",
    description: "The name of your app used for metadata.",
    default: "-",
  },
];

export const GlobalProvider = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">GlobalProvider config</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        The GlobalProvider is a required component for your app using this template.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
      The GlobalProvider is a context provider component that wraps your entire Qortal-based application and gives your app access to shared configuration, authentication handling, polling behavior (like balance fetching), and environment-specific values such as a public salt and app metadata.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
      It acts as the root-level setup point for any Qortal-integrated app using the qapp-core library (included in the setup).
      </SingleText>
      <Spacer height="25px" />
      <Typography variant="h6" mt={4}>
        <code>{"<GlobalProvider />"}</code> Props
      </Typography>

      <PropsTable rows={globalProviderProps} />
      <Spacer height="10px" />
    </DocContainer>
  );
};
