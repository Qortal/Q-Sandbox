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
export const GET_LIST_ITEMS = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    list_name: "blockedNames",

  });
  const [responseData, setResponseData] = useState(
    formatResponse(`
 [ 'john', 'steve']
  `)
  );

  const codePollName = `
const response = await qortalRequest({
  action: "GET_LIST_ITEMS",
  list_name: "${requestData?.list_name}"
});
`.trim();

  const tsInterface = `
interface GetListItemsRequest {
  action: string;
  list_name: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "GET_LIST_ITEMS",
        list_name: requestData?.list_name,
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
        The GET_LIST_ITEMS endpoint retrieves the named list that is stored on the user's node.
        </Typography>
        <Typography variant="body1">
        Any list that begins with "blocked" will block the data hosting of a Qortal name that is listed in it.
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
          <Typography>This qortalRequest will not work on the gateway.</Typography>
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
                      <Typography variant="h6">list_name</Typography>
                      <CustomInput
                        type="text"
                        placeholder="list_name"
                        value={requestData.list_name}
                        name="list_name"
                        onChange={handleChange}
                      />
                      <Spacer height="10px" />
                      <FieldExplanation>
                        <Typography>Required field</Typography>
                      </FieldExplanation>
                      <Spacer height="5px" />
                      <Typography>Enter the name of the list</Typography>
                    </Box>
          <Spacer height="20px" />
          <Button
            name="Get list"
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
