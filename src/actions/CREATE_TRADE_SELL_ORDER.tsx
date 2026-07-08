import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { foreignBlockchains } from "../constants";

interface RequestData {
  foreignBlockchain: string;
  qortAmount: number;
  foreignAmount: number;
}

interface ComponentProps {
  myAddress?: string;
}

export const Label = styled("label")(
  ({ theme }: { theme: any }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `,
);

export const formatResponse = (code: string): string => {
  return beautify.js(code, {
    indent_size: 2, // Number of spaces for indentation
    space_in_empty_paren: true, // Add spaces inside parentheses
  });
};

export const CREATE_TRADE_SELL_ORDER: React.FC<ComponentProps> = ({
  myAddress,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestData, setRequestData] = useState<RequestData>({
    foreignBlockchain: "LITECOIN",
    qortAmount: 0,
    foreignAmount: 0,
  });
  const [responseData, setResponseData] = useState<string>(
    formatResponse(`
  
  `),
  );

  const codePollName: string = `
await qortalRequest({
  action: "CREATE_TRADE_SELL_ORDER",
  foreignBlockchain: "${requestData?.foreignBlockchain}",
  qortAmount: ${requestData.qortAmount},
  foreignAmount: ${requestData.foreignAmount}
});
`.trim();

  const tsInterface: string = `
interface CreateTradeSellOrderRequest {
  action: string;
  foreignBlockchain: string;
  qortAmount: number;
  foreignAmount: number;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "CREATE_TRADE_SELL_ORDER",
        foreignBlockchain: requestData?.foreignBlockchain,
        qortAmount: requestData?.qortAmount,
        foreignAmount: requestData?.foreignAmount,
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        <Typography variant="body1">Creates a sell order.</Typography>
        <Typography variant="body1">Needs user approval</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <WarningIcon
            sx={{
              color: "gold",
            }}
          />
          <Typography>
            This qortalRequest cannot be used through the gateway.
          </Typography>
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
            <Typography variant="h6">foreignAmount</Typography>
            <CustomInput
              type="text"
              placeholder="foreignAmount"
              value={requestData.foreignAmount}
              name="foreignAmount"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the total amount of the foreign coin ( ie LTC ) that you
              want for the qortAmount.
            </Typography>
          </Box>
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
              onChange={(e: SelectChangeEvent<string>) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    foreignBlockchain: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
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
            <Typography variant="h6">qortAmount</Typography>
            <CustomInput
              type="text"
              placeholder="qortAmount"
              value={requestData.qortAmount}
              name="qortAmount"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the total amount of QORT you would like to sell.
            </Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Button
            name="Create Sell Order"
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
