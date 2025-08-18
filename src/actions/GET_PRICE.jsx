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
import { coins, foreignBlockchains } from "../constants";
import WarningIcon from "@mui/icons-material/Warning";
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
export const GET_PRICE = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    blockchain: "LITECOIN",
    inverse: true,
    maxtrades: 10,
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`
`)
  );

  const codePollName = `
await qortalRequest({
  action: "GET_PRICE",
  blockchain: "${requestData?.blockchain}",
  inverse: ${requestData?.inverse},
  maxtrades: ${requestData?.maxtrades}
});
`.trim();

  const tsInterface = `
interface GetPriceRequest {
  action: string;
  blockchain: string;
  inverse: boolean;
  maxtrades: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "GET_PRICE",
        blockchain: requestData?.blockchain,
        inverse: requestData?.inverse,
        maxtrades: requestData?.maxtrades,
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
          Returns price based on most recent completed trades.
        </Typography>
        <Typography>
          The value of each Qortal unit is expressed in terms of 1 Qort
          multiplied by 1e8. Hence, if you receive a response value of 303366,
          you simply divide it by 1e8 to find its equivalent in Qort. This
          conversion will yield a result of 0.0030366 Qort.
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
            <Typography variant="h6">blockchain</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.blockchain}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    blockchain: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={0}>
                <em>No blockchain selected</em>
              </MenuItem>
              {foreignBlockchains?.map((blockchain) => {
                return (
                  <MenuItem key={blockchain.name} value={blockchain.name}>
                    {`${blockchain.name}`}
                  </MenuItem>
                );
              })}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter one of the supported foreign blockchains.
            </Typography>
          </Box>
          <Spacer height="10px" />

          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">inverse</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.inverse}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    inverse: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={true}>true</MenuItem>
              <MenuItem value={false}>false</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              If true, display price in terms of foreign currency per unit QORT.
            </Typography>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">maxtrades</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="number"
              placeholder="maxtrades"
              value={requestData.maxtrades}
              name="maxtrades"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Maximum number of trades to include in price calculation
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Get price"
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
