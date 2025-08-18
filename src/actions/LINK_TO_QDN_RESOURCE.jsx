import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Card,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
  styled,
  Button as MuiButton,
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import WarningIcon from "@mui/icons-material/Warning";

import beautify from "js-beautify";
import Button from "../components/Button";
import { useDropzone } from "react-dropzone";
import { services } from "../constants";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import { OptionsManager } from "../components/OptionsManager";

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
export const LINK_TO_QDN_RESOURCE = () => {
  const [resources, setResources] = useState([]);
  const [requestData, setRequestData] = useState({
    service: "APP",
    identifier: "",
    name: "",
    path: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = useMemo(() => {
    
    return `await qortalRequest({
    action: "LINK_TO_QDN_RESOURCE",
    service: "${requestData?.service}",
    identifier: "${requestData?.identifier}", 
    name: "${requestData?.name}", 
    path: "${requestData?.path}"
  });
  `.trim();
  }, [requestData, resources]);

  const tsInterface = useMemo(() => {
    return `
      interface LinkToQdnResourceRequest {
        action: string;
        service: string;
        name: string; 
        identifier?: string; 
        path?: string;
      }
      `;
  }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const dynamicFields = {};
      if (requestData?.path) {
        dynamicFields["path"] = requestData.path;
      }
      let account = await qortalRequest({
        action: "LINK_TO_QDN_RESOURCE",
        service: requestData?.service,
        identifier: requestData?.identifier,
        name: requestData?.name,
        ...dynamicFields,
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
          Use this qortalRequest to navigate to another q-app. This qortalRequest works similar to the "OPEN_NEW_TAB" qortalRequest.
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
            <Typography variant="h6">service</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.service}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    service: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={0}>
                <em>No service selected</em>
              </MenuItem>
              {services?.map((service) => {
                return (
                  <MenuItem key={service.name} value={service.name}>
                    {`${service.name} - max ${service.sizeLabel}`}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">identifier</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="identifier"
              value={requestData.identifier}
              name="identifier"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter an identifier</Typography>
          </Box>

          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">name</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="name"
              value={requestData.name}
              name="name"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field.</Typography>
            </FieldExplanation>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">path</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="path"
              value={requestData.path}
              name="path"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field.</Typography>
            </FieldExplanation>
          </Box>
          <Spacer height="10px" />
          <Button
            name="Go"
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
            </Box>
    </div>
  );
};
