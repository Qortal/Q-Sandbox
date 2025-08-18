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

const codeblock1 = `
import { useAuth } from "qapp-core";

const auth = useAuth();
const publicKey = auth?.publicKey
console.log(publicKey)
`.trim();


const authProps = [
  {
    prop: "auth.address",
    description: (
      <>
        The user’s Qortal <strong>address</strong> after authentication.
      </>
    ),
  },
  {
    prop: "auth.publicKey",
    description: (
      <>
        The user’s <strong>public key</strong>.
      </>
    ),
  },
  {
    prop: "auth.name",
    description: (
      <>
        The registered <strong>Qortal name</strong>, if the user has one.
      </>
    ),
  },
  {
    prop: "auth.isLoadingUser",
    description: <>Whether the user is currently being authenticated.</>,
  },
  {
    prop: "auth.errorMessageLoadingUser",
    description: (
      <>Holds an error message if something goes wrong during authentication.</>
    ),
  },
  {
    prop: "auth.authenticateUser()",
    description: <>Triggers authentication manually.</>,
  }
];

export const Authentication = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Authentication</SectionTitle>
      <Spacer height="30px" />
      <Box>
        <Typography variant="h4" gutterBottom>
          Authentication (auth) — <code>{'const auth = useAuth()'}</code>
        </Typography>

        <Card>
          <Typography variant="body1" gutterBottom>
            This hook contains everything related to the currently
            authenticated Qortal user. It is accessible globally via:
          </Typography>

          <Typography component="code" sx={{ fontSize: "1rem" }}>
          <code>{'const auth = useAuth()'}</code>
          </Typography>
        </Card>
        <Spacer height="20px" />
        <Typography variant="h6" gutterBottom>
          Properties
        </Typography>

        <CodePropsTable rows={authProps} />
        <Spacer height="20px" />
        <SectionSubTitle variant="h1">Example</SectionSubTitle>
        <Spacer height="10px" />
        <SingleText>
          Let's say you want to to access the user's public key. You can do the following.
        </SingleText>
        <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
        <Spacer height="20px" />
        <SectionSubTitle variant="h1">authenticateUser</SectionSubTitle>
        <Spacer height="10px" />
        <SingleText>
          Even if you have the authenticated process on mount using the
          GlobalProvider, the user might decline it. This method allows you to
          manually trigger the authentication modal again.
        </SingleText>
      </Box>
    </DocContainer>
  );
};
