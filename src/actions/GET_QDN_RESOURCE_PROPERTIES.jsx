import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import beautify from "js-beautify";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import { services } from "../constants";
import { FieldExplanation } from "../components/QRComponents";

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const GET_QDN_RESOURCE_PROPERTIES = () => {
  const [requestData, setRequestData] = useState({
    service: "THUMBNAIL",
    name: "QortalDemo",
    identifier: "qortal_avatar",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codeBlock = useMemo(() => {
    const optionalFields = {
      identifier: requestData?.identifier,
    };

    const dynamicFields = Object.entries(optionalFields)
      .filter(([_, value]) => value) // Include only non-empty fields
      .map(([key, value]) => `  ${key}: "${value}",`) // Properly align with other fields
      .join("\n");

    return `await qortalRequest({
        action: "GET_QDN_RESOURCE_PROPERTIES",
        ${dynamicFields}${dynamicFields ? "\n" : ""}
        name: "${requestData?.name}",
        service: "${requestData?.service}",
      });
    `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    return `
        interface GetQdnResourcePropertiesRequest {
           action: string;
           service: string;
           name: string;
           identifier?: string;
        }
        `;
  }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "GET_QDN_RESOURCE_PROPERTIES",
        service: requestData?.service,
        name: requestData?.name,
        identifier: requestData?.identifier || undefined,
      });
      setResponseData(formatResponse(JSON.stringify(response, null, 2)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="body1">
        Use this qortalRequest to get the certain properties of a resource such as mimeType, filename, size.
      </Typography>
      <Spacer height="20px" />

      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
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
            <MenuItem value={""}>
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
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Required field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">name</Typography>
          <CustomInput
            type="text"
            placeholder="name"
            name="name"
            value={requestData.name}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Required field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">identifier</Typography>
          <CustomInput
            type="text"
            placeholder="identifier"
            name="identifier"
            value={requestData.identifier}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
        </Box>

        <Spacer height="10px" />

        <Button
          name="Get properties"
          bgColor="#309ed1"
          onClick={executeQortalRequest}
        />
      </Card>

      <Spacer height="20px" />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ width: "50%" }}>
          <h3>Request</h3>
          <DisplayCode codeBlock={codeBlock} language="javascript" />
          <h3>TS interface</h3>
          <DisplayCode codeBlock={tsInterface} language="javascript" />
        </Box>
        <Box sx={{ width: "50%" }}>
          <h3>Response</h3>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
