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
import { services } from "../constants";

export const Label = styled("label")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `,
);

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const SAVE_FILE = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    filename: "example.txt",
    location: {
      name: "QortalUser",
      identifier: "default",
      service: "DOCUMENT",
    },
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "success": true
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "SAVE_FILE",
  filename: "${requestData?.filename}",
  location: {
    name: "${requestData?.location?.name}",
    identifier: "${requestData?.location?.identifier}",
    service: "${requestData?.location?.service}"
  }
});
`.trim();

  const tsInterface = `
interface SaveFileRequest {
  action: string;
  filename: string;
  location: {
    name: string;
    identifier: string;
    service: string;
  };
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "SAVE_FILE",
        filename: requestData?.filename,
        location: requestData?.location,
      } as any);

      setResponseData(formatResponse(JSON.stringify(result)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setRequestData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setRequestData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
          Save a file to the user's local filesystem with the specified content
          and filename. This action handles file saving through the browser's
          download mechanism or native file system access. The file data must be
          provided in base64 format.
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
            <Typography variant="h6">filename</Typography>
            <CustomInput
              type="text"
              placeholder="filename"
              value={requestData.filename}
              name="filename"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the filename with extension (e.g., "example.txt").
            </Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">location.identifier</Typography>
            <CustomInput
              type="text"
              placeholder="location.identifier"
              value={requestData.location?.identifier || ""}
              name="location.identifier"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the identifier for the QDN resource location.
            </Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">location.name</Typography>
            <CustomInput
              type="text"
              placeholder="location.name"
              value={requestData.location?.name || ""}
              name="location.name"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the registered name for the QDN resource location.
            </Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">location.service</Typography>
            <Select
              size="small"
              labelId="label-select-service"
              id="id-select-service"
              value={requestData.location?.service || ""}
              displayEmpty
              onChange={(e: SelectChangeEvent<string>) =>
                setRequestData((prev) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    service: e.target.value,
                  },
                }))
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value="">
                <em>No service selected</em>
              </MenuItem>
              {services?.map((service) => (
                <MenuItem key={service.name} value={service.name}>
                  {`${service.name} - max ${service.sizeLabel}`}
                </MenuItem>
              ))}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Select the service type for the QDN resource location.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Save File"
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
