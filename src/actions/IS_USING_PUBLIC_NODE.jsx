import React, { useState } from "react";
import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";

import beautify from "js-beautify";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import { FieldExplanation, GeneralExplanation } from "../components/QRComponents";

export const Label = styled("label")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `
);

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2, // Number of spaces for indentation
    space_in_empty_paren: true, // Add spaces inside parentheses
  });
};
export const IS_USING_PUBLIC_NODE = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState(
    formatResponse(`false`)
  );

  const codePollName = `
await qortalRequest({
  action: "IS_USING_PUBLIC_NODE",
});
`.trim();

  const tsInterface = `
interface IsUsingGatewayRequest {
  action: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "IS_USING_PUBLIC_NODE",
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setRequestData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
        Use this qortalRequest if you need to know if the user is using the gateway. Returns a boolean.
        </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />

      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <Typography variant="h6">Apart from the action type, no other field is required.</Typography>
        <div className="message-row">
            <Spacer height="20px" />
          <Button
            name="Execute"
            bgColor="#309ed1"
            onClick={executeQortalRequest}
          />
        </div>
      </Card>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <h3>Request</h3>
          <DisplayCode codeBlock={codePollName} language="javascript" />
          <Spacer height="10px" />
          <h3>TS interface</h3>
          <DisplayCode codeBlock={tsInterface} language="javascript" />
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <h3>Response</h3>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DisplayCodeResponse
              codeBlock={responseData}
              language="javascript"
            />
          )}
        </Box>
      </Box>
    </div>
  );
};
