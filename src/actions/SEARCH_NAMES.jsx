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
export const SEARCH_NAMES = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    query: "",
    limit: 20,
    offset: 0,
    reverse: false,
    prefix: false
  });
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = `
await qortalRequest({
  action: "SEARCH_NAMES",
  query: "${requestData?.query}",
  limit: ${requestData?.limit},
  offset: ${requestData?.offset},
  reverse: ${requestData?.reverse},
  prefix: ${requestData?.prefix}
});
`.trim();

  const tsInterface = `
interface SearchNamesRequest {
  action: string;
  query: string;
  offset: number;
  limit: number;
  reverse: boolean;
  prefix: boolean;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "SEARCH_NAMES",
        query: requestData?.query,
        offset: requestData?.offset,
        limit: requestData?.limit,
        reverse: requestData?.reverse,
        prefix: requestData?.prefix
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
          The SEARCH_NAMES endpoint allows you to search for registered Qortal names.
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
            <Typography variant="h6">query</Typography>
            <CustomInput
              type="text"
              placeholder="query"
              value={requestData.query}
              name="query"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a query</Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">limit</Typography>
            <CustomInput
              type="number"
              placeholder="limit"
              value={requestData.limit}
              name="limit"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
          </Box>

          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">offset</Typography>
            <CustomInput
              type="number"
              placeholder="offset"
              value={requestData.offset}
              name="offset"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">reverse</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.reverse}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    reverse: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={false}>false</MenuItem>

              <MenuItem value={true}>true</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Reverse true will list the results by latest of creation.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">prefix</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.prefix}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    prefix: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={false}>false</MenuItem>

              <MenuItem value={true}>true</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              If true, only the beginning of the name is matched
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Search names"
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
