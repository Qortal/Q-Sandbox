import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import beautify from "js-beautify";
import React, { useMemo, useState } from "react";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import { FieldExplanation } from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { services } from "../constants";

interface RequestData {
  service: string;
  name: string;
  identifier: string;
  filepath: string;
  encoding: string;
  rebuild: boolean;
}

export const formatResponse = (code: string): string => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const FETCH_QDN_RESOURCE: React.FC = () => {
  const [requestData, setRequestData] = useState<RequestData>({
    service: "THUMBNAIL",
    name: "QortalDemo",
    identifier: "qortal_avatar",
    filepath: "",
    encoding: "base64",
    rebuild: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codeBlock = useMemo(() => {
    const optionalFields = {
      identifier: requestData?.identifier,
      filepath: requestData?.filepath,
      encoding: requestData?.encoding,
    };

    const dynamicFields = Object.entries(optionalFields)
      .filter(([_, value]) => value) // Include only non-empty fields
      .map(([key, value]) => `  ${key}: "${value}",`) // Properly align with other fields
      .join("\n");

    return `await qortalRequest({
        action: "FETCH_QDN_RESOURCE",
        ${dynamicFields}${dynamicFields ? "\n" : ""}
        name: "${requestData?.name}",
        service: "${requestData?.service}",
        rebuild: ${requestData?.rebuild},
      });
    `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    return `
        interface FetchQdnResourceRequest {
           action: string;
           service: string;
           name: string;
           identifier?: string;
           filepath?: string;
           encoding?: string;
           rebuild?: boolean;
        }
        `;
  }, [requestData]);

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "FETCH_QDN_RESOURCE",
        service: requestData?.service,
        name: requestData?.name,
        identifier: requestData?.identifier || undefined,
        filepath: requestData?.filepath || undefined,
        rebuild: requestData?.rebuild,
        encoding: requestData?.encoding,
      });
      setResponseData(formatResponse(JSON.stringify(response, null, 2)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setRequestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="body1">
        Use this qortalRequest to fetch the actual data of the resource
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
          <Typography variant="h6">rebuild</Typography>
          <Select
            size="small"
            name="rebuild"
            value={requestData.rebuild ? "true" : "false"}
            onChange={(e: SelectChangeEvent<string>) =>
              setRequestData((prev) => ({
                ...prev,
                rebuild: e.target.value === "true",
              }))
            }
            sx={{ width: "300px" }}
          >
            <MenuItem value="true">true</MenuItem>
            <MenuItem value="false">false</MenuItem>
          </Select>

          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Required field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            If true, the resource will be re-built if it was already built.
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
          <Typography variant="h6">service</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={requestData?.service}
            displayEmpty
            onChange={(e: SelectChangeEvent<string>) =>
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
          <Typography variant="h6">encoding</Typography>
          <CustomInput
            type="text"
            placeholder="encoding"
            name="encoding"
            value={requestData.encoding}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>If omitted, data is returned in raw form</Typography>
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
          <Typography variant="h6">filepath</Typography>
          <CustomInput
            type="text"
            placeholder="filepath"
            name="filepath"
            value={requestData.filepath}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Path to specific file within multi-file resource</Typography>
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

        <Button name="Fetch" bgColor="#309ed1" onClick={executeQortalRequest} />
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
