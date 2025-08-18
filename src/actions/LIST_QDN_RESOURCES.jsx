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

export const LIST_QDN_RESOURCES = () => {
  const [requestData, setRequestData] = useState({
    service: "",
    name: "QortalDemo",
    identifier: "qortal_avatar",
    default: false,
    includeStatus: false,
    includeMetadata: false,
    followedOnly: false,
    excludeBlocked: false,
    limit: 100,
    offset: 0,
    reverse: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codeBlock = useMemo(() => {
    const optionalFields = {
      service: requestData?.service,
      name: requestData?.name,
      identifier: requestData?.identifier,
    };

    const dynamicFields = Object.entries(optionalFields)
      .filter(([_, value]) => value) // Include only non-empty fields
      .map(([key, value]) => `  ${key}: "${value}",`) // Properly align with other fields
      .join("\n");

    return `await qortalRequest({
        action: "LIST_QDN_RESOURCES",
        ${dynamicFields}${dynamicFields ? "\n" : ""}  default: ${requestData?.default},
        includeStatus: ${requestData?.includeStatus},
        includeMetadata: ${requestData?.includeMetadata},
        followedOnly: ${requestData?.followedOnly},
        excludeBlocked: ${requestData?.excludeBlocked},
        limit: ${requestData?.limit},
        offset: ${requestData?.offset},
        reverse: ${requestData?.reverse}
      });
    `.trim();
  }, [requestData]);

    const tsInterface = useMemo(() => {
      return `
        interface ListQdnResourcesRequest {
          action: string;
           service?: string;
           name?: string;
           identifier?: string;
           default?: boolean;
           includeStatus?: boolean;
           includeMetadata?: boolean;
           followedOnly?: boolean;
           excludeBlocked?: boolean;
           limit: number;
           offset: number;
           reverse?: boolean;
        }
        `;
    }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "LIST_QDN_RESOURCES",
        service: requestData?.service || undefined,
        name: requestData?.name || undefined,
        identifier: requestData?.identifier || undefined,
        default: requestData?.default,
        includeStatus: requestData?.includeStatus,
        includeMetadata: requestData?.includeMetadata,
        followedOnly: requestData?.followedOnly,
        excludeBlocked: requestData?.excludeBlocked,
        limit: requestData?.limit,
        offset: requestData?.offset,
        reverse: requestData?.reverse,
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
        Use this component to list QDN resources with various filters.
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
            <Typography>Optional field</Typography>
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
            <Typography>Optional field</Typography>
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

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">default</Typography>
          <Select
            size="small"
            name="default"
            value={requestData.default}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>Query the default resource of a service</Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">includeStatus</Typography>
          <Select
            size="small"
            name="includeStatus"
            value={requestData.includeStatus}
            onChange={handleChange}
            sx={{ width: "300px" }}
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
            Putting this field as true will return the status of a resource such
            as DOWNLOADED, ect...
          </Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">includeMetadata</Typography>
          <Select
            size="small"
            name="includeMetadata"
            value={requestData.includeMetadata}
            onChange={handleChange}
            sx={{ width: "300px" }}
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
            Putting this field as true will return metadata
          </Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">followedOnly</Typography>
          <Select
            size="small"
            name="followedOnly"
            value={requestData.followedOnly}
            onChange={handleChange}
            sx={{ width: "300px" }}
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
            Putting this field as true will return resources from names you follow.
          </Typography>
        </Box>

        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">excludeBlocked</Typography>
          <Select
            size="small"
            name="excludeBlocked"
            value={requestData.excludeBlocked}
            onChange={handleChange}
            sx={{ width: "300px" }}
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
            Putting this field as true will return not return results by names that are blocked.
          </Typography>
        </Box>

        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">limit</Typography>
          <CustomInput
            type="number"
            placeholder="limit"
            name="limit"
            value={requestData.limit}
            onChange={handleChange}
          />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">offset</Typography>
          <CustomInput
            type="number"
            placeholder="offset"
            name="offset"
            value={requestData.offset}
            onChange={handleChange}
          />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">reverse</Typography>
          <Select
            size="small"
            name="reverse"
            value={requestData.reverse}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
        </Box>
        <Spacer height="10px" />

        <Button
          name="List Resources"
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
