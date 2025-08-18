import React, { useState } from "react";
import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import beautify from "js-beautify";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";

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
export const VOTE_ON_POLL = () => {
  const [requestData, setRequestData] = useState({
    pollName: "myPoll",
    optionIndex: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState(
    formatResponse(`{
    "type": "VOTE_ON_POLL",
    "timestamp": 1697286687406,
    "reference": "3jU9WpEPAvu9iL3cMfVd2AUmn9AijJRzkGCxVtXfpuUFZubM8AFDcbk5XA9m5AhPfsbMDFkSDzPJnkjeLA5GA59E",
    "fee": "0.01000000",
    "signature": "3QJ1EUvX3rskVNaP3RWvJwb9DsGgHPvneWqBWS62PCcuCj5N4Ei9Tr4nFj4nQeMqMU2qNkVD3Sb59e7iUWkawH3s",
    "txGroupId": 0,
    "approvalStatus": "NOT_REQUIRED",
    "creatorAddress": "Qhxphh7g5iNtxAyLLpPMZzp4X85yf2tVam",
    "voterPublicKey": "C5spuNU1BAHZDEkxF3wnrAPRDuNrVceaDJ6tDKitenko",
    "pollName": "A test poll 3",
    "optionIndex": 1
  }`)
  );

  const codePollName = `
await qortalRequest({
  action: "VOTE_ON_POLL",
  pollName: "${requestData?.pollName}",
  optionIndex: ${requestData?.optionIndex},
});
`.trim();

  const tsInterface = `
interface VoteOnPollRequest {
  action: string;
  pollName: string;
  optionIndex: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "VOTE_ON_POLL",
        pollName: requestData?.pollName,
        optionIndex: requestData?.optionIndex,
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
          Vote on a previously created poll. If the poll name doesn't exist, it
          will throw an error.
        </Typography>
        <Typography variant="body1">
                        Needs user approval
                        </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />

      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />

        <div className="message-row">
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">pollName</Typography>
            <CustomInput
              type="text"
              placeholder="pollName"
              value={requestData.pollName}
              name="pollName"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the existing name of the poll</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">optionIndex</Typography>
            <CustomInput
              type="number"
              placeholder="optionIndex"
              value={requestData.optionIndex}
              name="optionIndex"
              onChange={handleChange}
            />

            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the index value of the option from the list of options in
              the created poll.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Vote"
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
