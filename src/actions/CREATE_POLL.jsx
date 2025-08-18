import React, { useState } from "react";
import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";

import beautify from "js-beautify";
import Button from "../components/Button";
import { OptionsManager } from "../components/OptionsManager";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { Code, CustomInput } from "../components/Common-styles";

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
export const CREATE_POLL = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    pollName: "A test poll 3",
    pollDescription: "Test description",
    pollOptions: ["option1", "option2", "option3"],
    pollOwnerAddress: myAddress,
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
      "type": "CREATE_POLL",
      "timestamp": 1697285826221,
      "reference": "3Svgda6JMSoKW8xQreHRWwXfzWUqCG7NXae5bJDcezbGgK2km8VVbRGZXdEA3Q6LSDvG6hfk1xjXBawpBgxSAa2B",
      "fee": "0.01000000",
      "signature": "3jU9WpEPAvu9iL3cMfVd2AUmn9AijJRzkGCxVtXfpuUFZubM8AFDcbk5XA9m5AhPfsbMDFkSDzPJnkjeLA5GA59E",
      "txGroupId": 0,
      "approvalStatus": "NOT_REQUIRED",
      "creatorAddress": "Qhxphh7g5iNtxAyLLpPMZzp4X85yf2tVam",
      "owner": "QbpZL12Lh7K2y6xPZure4pix5jH6ViVrF2",
      "pollName": "A test poll 3",
      "description": "test description",
      "pollOptions": [
          {
              "optionName": "option1"
          },
          {
              "optionName": "option2"
          },
          {
              "optionName": "option3"
          }
      ]
    }`)
  );

  const codePollName = `
await qortalRequest({
  action: "CREATE_POLL",
  pollName: "${requestData?.pollName}",
  pollDescription: "${requestData?.pollDescription}",
  pollOptions: ${JSON.stringify(requestData.pollOptions)},
  pollOwnerAddress: "${requestData?.pollOwnerAddress}"
});
`.trim();

  const tsInterface = `
interface CreatePollRequest {
  action: string;
  pollName: string;
  pollDescription: string;
  pollOptions: string[];
  pollOwnerAddress: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "CREATE_POLL",
        pollName: requestData?.pollName,
        pollDescription: requestData?.pollDescription,
        pollOptions: requestData.pollOptions,
        pollOwnerAddress: requestData?.pollOwnerAddress,
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
        Create a poll inside your Q-App. To get results of this poll, you would subsequently make a fetch call to <Code>{"/polls​/votes​/${pollName}"}</Code> to get the voting results. The poll name must be unique or else it will throw an error.
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
            <Typography>Enter the name of the poll. Names are unique, therefore an existing pollName on the Qortal blockchain cannot be used.</Typography>
            <Spacer height="5px" />
            <Typography>Max characters: 400</Typography>
            <Typography>min characters: 3</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">pollDescription</Typography>
            <CustomInput
              type="text"
              placeholder="pollDescription"
              value={requestData.pollDescription}
              name="pollDescription"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
             
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Give users information about the poll by adding a description</Typography>
            <Spacer height="5px" />
            <Typography>Max characters: 4000</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">pollOwnerAddress</Typography>

            <CustomInput
              type="text"
              placeholder="pollOwnerAddress"
              value={requestData.pollOwnerAddress}
              name="pollOwnerAddress"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the Qortal address of the user that is creating the poll.</Typography>
          </Box>
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">pollOptions</Typography>
            <Spacer height="10px" />
            <OptionsManager
              items={requestData.pollOptions}
              setItems={(items) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    pollOptions: items,
                  };
                });
              }}
            />

            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a list of options. This field should be a list of strings when using the qortalRequest.</Typography>
            <Spacer height="5px" />
            <Typography>Max number of options: 100</Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Create poll"
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
