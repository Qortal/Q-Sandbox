import React, { useState } from "react";
import { Box, Card, CircularProgress, MenuItem, Select, styled, Typography } from "@mui/material";
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
import WarningIcon from '@mui/icons-material/Warning';
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
export const GET_USER_WALLET = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    coin: "LTC",

  });
  const [responseData, setResponseData] = useState(
    formatResponse(`
      {
  "address": "LN9CrdJGSzADwUoS6jq9mCtCPvFNZc4wNY",
  "publickey": "xpub661MyMwAqRbcGqnzUgEJ23weSVSd77uggk7YrNQGapsoYymCfr1kCvzR1eddQNdU9pYshKgkBrSUG4AkYpRLsN1ogDkv6LzD4Uyvg94JJyj"
}
  `)
  );

  const codePollName = `
await qortalRequest({
  action: "GET_USER_WALLET",
  coin: "${requestData?.coin}",
});
`.trim();

  const tsInterface = `
interface GetUserWalletRequest {
  action: string;
  coin: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "GET_USER_WALLET",
        coin: requestData?.coin,
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
        Get the address and public key of a user's coin
        </Typography>
        <Typography variant="body1">
        Needs user approval
        </Typography>
        <Spacer height="20px" />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <WarningIcon sx={{
            color: 'gold'
          }} />
          <Typography>The coin ARRR cannot be used through the gateway. When using a local node, for ARRR only the address will be returned.</Typography>
        </Box>
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
            <Typography variant="h6">coin</Typography>
            <Spacer height="10px" />
            <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={requestData?.coin}
            displayEmpty
            onChange={(e) => setRequestData((prev)=> {
              return {
                ...prev,
                coin: e.target.value
              }
            })}
            sx={{
              width: '300px'
            }}
          >
            <MenuItem value={0}>
              <em>No coin selected</em>
            </MenuItem>
            {coins?.map((coin) => {
              return (
                <MenuItem key={coin.name} value={coin.name}>
                  {`${coin.name}`} 
                </MenuItem>
              );
            })}
          </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter one of the supported Qortal coin ID.</Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Get user wallet"
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
