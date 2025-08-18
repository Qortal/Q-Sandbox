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
import { coins, foreignBlockchains } from "../constants";
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
export const CREATE_TRADE_BUY_ORDER = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    foreignBlockchain: "LITECOIN",
    crosschainAtInfo: []

  });
  const [responseData, setResponseData] = useState(
    formatResponse(`
  
  `)
  );

  const codePollName = `
await qortalRequest({
  action: "CREATE_TRADE_BUY_ORDER",
  foreignBlockchain: "${requestData?.foreignBlockchain}",
  crosschainAtInfo: ${JSON.stringify(requestData.crosschainAtInfo)}
});
`.trim();

  const tsInterface = `
interface CrosschainAtInfo {
  qortalAtAddress: string;
}
interface CreateTradeBuyOrderRequest {
  action: string;
  foreignBlockchain: string;
  crosschainAtInfo: CrosschainAtInfo[];
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "CREATE_TRADE_BUY_ORDER",
        foreignBlockchain: requestData?.foreignBlockchain,
        crosschainAtInfo: requestData?.crosschainAtInfo
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
          Creates a buy order.
        </Typography>
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
            <Typography variant="h6">foreignBlockchain</Typography>
            <Spacer height="10px" />
            <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={requestData?.foreignBlockchain}
            displayEmpty
            onChange={(e) => setRequestData((prev)=> {
              return {
                ...prev,
                foreignBlockchain: e.target.value
              }
            })}
            sx={{
              width: '300px'
            }}
          >
            <MenuItem value={0}>
              <em>No coin selected</em>
            </MenuItem>
            {foreignBlockchains?.map((coin) => {
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
            <Typography>Select a supported foreign blockchain.</Typography>
          </Box>
              <Box
                      sx={{
                        padding: "10px",
                        outline: "1px solid var(--color3)",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography variant="h6">crosschainAtInfo</Typography>
                      <Spacer height="10px" />
                      <OptionsManager
                        items={requestData.crosschainAtInfo?.map((item)=> item?.qortalAtAddress)}
                        setItems={(items) => {
                          setRequestData((prev) => {
                            return {
                              ...prev,
                              crosschainAtInfo: items?.map((item)=> {
                                return {
                                  qortalAtAddress: item
                                }
                              }),
                            };
                          });
                        }}
                      />
          
                      <Spacer height="10px" />
                      <FieldExplanation>
                        <Typography>Required field</Typography>
                      </FieldExplanation>
                      <Spacer height="5px" />
                      <Typography>
                        Enter a list of crosschain ATs. All the ATs need to be of the same foreignBlockchain as the value selected in the field "foreignBlockchain"
                      </Typography>
                    </Box>
          <Spacer height="20px" />
          <Button
            name="Create buy order"
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
