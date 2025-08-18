import React, { useMemo, useState } from "react";
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
import WarningIcon from "@mui/icons-material/Warning";

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

const actionsRequiringValue = [
  "addpeer",
  "removepeer",
  "forcesync",
  "addmintingaccount",
  "removemintingaccount",
];

const actionTypes = [
  {
    name: "stop",
  },
  {
    name: "restart",
  },
  {
    name: "bootstrap",
  },
  {
    name: "addmintingaccount",
  },
  {
    name: "removemintingaccount",
  },
  {
    name: "forcesync",
  },
  {
    name: "addpeer",
  },
  {
    name: "removepeer",
  },
];

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
export const ADMIN_ACTION = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    type: undefined,
  });
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = useMemo(() => {
    if (requestData?.value) {
      return `
await qortalRequest({
  action: "ADMIN_ACTION",
  type: "${requestData?.type}",
  value: "${requestData?.value}",
});
`.trim();
    } else {
      return `
await qortalRequest({
  action: "ADMIN_ACTION",
  type: "${requestData?.type}",
});
`.trim();
    }
  }, [requestData]);

  const tsInterface = useMemo(() => {
    if (requestData?.value) {
      return `
interface AdminActionRequest {
  action: string;
  type: string;
  value: string;
}
`.trim();
    } else {
      return `
interface AdminActionRequest {
  action: string;
  type: string;
}
`.trim();
    }
  }, [requestData?.type]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "ADMIN_ACTION",
        type: requestData?.type,
        value: requestData?.value,
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
          This qortalRequest allows for some interaction with the user's node.
          Choose a type first.
        </Typography>
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
            <Typography variant="h6">type</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.type}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    type: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={undefined}>
                <em>No type selected</em>
              </MenuItem>
              {actionTypes?.map((type) => {
                return (
                  <MenuItem key={type.name} value={type.name}>
                    {`${type.name}`}
                  </MenuItem>
                );
              })}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            {requestData?.type === undefined && (
              <Typography>Choose an admin type.</Typography>
            )}
            {requestData?.type === "stop" && (
              <Typography>
                The stop type will shut down the user's node.
              </Typography>
            )}
            {requestData?.type === "restart" && (
              <Typography>
                The restart type will restart a user's node.
              </Typography>
            )}
            {requestData?.type === "bootstrap" && (
              <Typography>
                The bootstrap type will shut down a user's node, download a
                bootstrap of the db and restart the node.
              </Typography>
            )}
            {requestData?.type === "addmintingaccount" && (
              <Typography>
                The addmintingaccount type will add the user provided minting
                key to the user's node.
              </Typography>
            )}
            {requestData?.type === "removemintingaccount" && (
              <Typography>
                The removemintingaccount type will remove the selected user's
                minting key from their node.
              </Typography>
            )}
            {requestData?.type === "addpeer" && (
              <Typography>
                The addpeer type will add the user provided peer to their node.
              </Typography>
            )}
            {requestData?.type === "removepeer" && (
              <Typography>
                The removepeer type will remove the selected peer from their
                node.
              </Typography>
            )}
            {requestData?.type === "forcesync" && (
              <Typography>Forcibly synchronize to given peer.</Typography>
            )}
          </Box>
          <Spacer height="5px" />
          {actionsRequiringValue?.includes(requestData?.type) && (
            <>
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">value</Typography>
                <CustomInput
                  type="text"
                  placeholder="value"
                  value={requestData.value}
                  name="value"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <FieldExplanation>
                  <Typography>Required field</Typography>
                </FieldExplanation>
                <Spacer height="5px" />
                {requestData?.type === "addmintingaccount" && (
                  <Typography>Provide the rewardShare Private Key</Typography>
                )}
                {requestData?.type === "removemintingaccount" && (
                  <Typography>Provide the account's public key</Typography>
                )}
                {requestData?.type === "addpeer" && (
                  <Typography>
                    Specify a peer using hostname, IPv4 address, IPv6 address
                    and optional port number preceeded with colon.
                  </Typography>
                )}
                {requestData?.type === "removepeer" && (
                  <Typography>
                    Specify a peer using hostname, IPv4 address, IPv6 address
                    and optional port number preceeded with colon.
                  </Typography>
                )}
                {requestData?.type === "forcesync" && (
                  <Typography>
                    Specify a peer using hostname, IPv4 address, IPv6 address
                    and optional port number preceeded with colon.
                  </Typography>
                )}
              </Box>
            </>
          )}

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
