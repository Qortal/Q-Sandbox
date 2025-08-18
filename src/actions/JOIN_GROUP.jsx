import React, { useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
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
import { coins } from "../constants";

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
export const JOIN_GROUP = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    groupId: 691,
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "type": "JOIN_GROUP",
  "timestamp": 1736541260542,
  "reference": "2gAWiC5Z1FrNAQb3nwC1tSYaEmawWgJZW9svMLhhJYH3PkPgESETvhEkxJjPbx2hGVC8L8iokDJCEo9wWGLLHdAT",
  "fee": "0.01000000",
  "signature": "2NtnfEh3JYChR4b6QkC66cDuPUgYmkCwAsQY54qHeomE9GVbg9QpEkDzApeVKWH1m5jHCebuzCugRHt1AT3tyoW",
  "txGroupId": 0,
  "approvalStatus": "NOT_REQUIRED",
  "creatorAddress": "QP9Jj4S3jpCgvPnaABMx8VWzND3qpji6rP",
  "joinerPublicKey": "FHHvnLQWx7ri5fph5hT9DUnSexZfHCnGc1zFA6na2j2C",
  "groupId": 691
}`)
  );

  const codePollName = `
await qortalRequest({
  action: "JOIN_GROUP",
  groupId: ${requestData?.groupId}
});
`.trim();

  const tsInterface = `
interface JoinGroupRequest {
  action: string;
  groupId: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "JOIN_GROUP",
        groupId: requestData?.groupId,
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
        <Typography variant="body1">qortalRequest to join a group</Typography>
        <Typography variant="body1">Needs user approval</Typography>
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
            <Typography variant="h6">groupId</Typography>
            <CustomInput
              type="text"
              placeholder="groupId"
              value={requestData.groupId}
              name="groupId"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the group identifier.</Typography>
          </Box>

          <Spacer height="20px" />
          <Button
            name="Join group"
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
