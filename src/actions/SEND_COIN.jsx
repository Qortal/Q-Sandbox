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
export const SEND_COIN = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    coin: "QORT",
    recipient: "",
    amount: 1,
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
       amount: '1.00000000'
  approvalStatus: 'NOT_REQUIRED'
  creatorAddress: 'QMjCNsctvWLoDdPSRpHn6TF2j96iDr9YWm'
  fee: '0.00100000'
  recipient: 'Qi3x7zVhN17mcYm9JTrEYaFihmETSZTzPD'
  reference: '26xJXTxcdXhFUYFkyZ7qKkj94RtaLBevcyQgCwK3W5xt7JkGPrCbvNgdC46CmJA65cjTCXMykwiyYJfVsPdsU1fS'
  senderPublicKey: 'Bjo1iUHJXbCb4LKabmE6KWNL5jSgCK36ypasoDgJG53U'
  signature: '4j2iPN5Xwgocs8Z32JB4UB63G87qS43kPyEwFmQMLvWBXtrSQwAfyx8S9CqQvbregnstXFKqXpkPT2dNdAscriT4'
  timestamp: 1684321310522
  txGroupId: 0
  type: 'PAYMENT'
    }`)
  );

  const codePollName = `
await qortalRequest({
  action: "SEND_COIN",
  coin: "${requestData?.coin}",
  recipient: "${requestData?.recipient}",
  amount: ${JSON.stringify(requestData.amount)},
});
`.trim();

  const tsInterface = `
interface SendCoinRequest {
  action: string;
  coin: string;
  recipient: string;
  amount: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "SEND_COIN",
        coin: requestData?.coin,
        recipient: requestData?.recipient,
        amount: requestData.amount,
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
        Send QORT to address
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
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">recipient</Typography>
            <CustomInput
              type="text"
              placeholder="recipient"
              value={requestData.recipient}
              name="recipient"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the wallet address of the recipient.</Typography>
            <Typography>For QORT, you can enter the Qortal Name instead of the address.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">amount</Typography>

            <CustomInput
              type="number"
              placeholder="amount"
              value={requestData.amount}
              name="amount"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the amount.</Typography>
          </Box>
         
          <Spacer height="20px" />
          <Button
            name="Send coin"
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
