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

export const LIST_ATS = () => {
  const [requestData, setRequestData] = useState({
    limit: 100,
    offset: 0,
    reverse: true,
    isExecutable: undefined,
    codeHash58: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codeBlock = useMemo(() => {
    return `await qortalRequest({
        action: "LIST_ATS",
        limit: ${requestData?.limit},
        offset: ${requestData?.offset},
        reverse: ${requestData?.reverse},
        isExecutable: ${requestData?.isExecutable},
        codeHash58: ${requestData?.codeHash58}
      });
    `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    return `
        interface ListGroupsRequest {
           action: string;
           limit: number;
           offset: number;
           reverse?: boolean;
           isExecutable?: boolean;
           codeHash58: string;
        }
        `;
  }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "LIST_ATS",
        limit: requestData?.limit,
        offset: requestData?.offset,
        reverse: requestData?.reverse,
        isExecutable: requestData?.isExecutable,
        codeHash58: requestData?.codeHash58,
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
      <Typography variant="body1">List of ATs</Typography>
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

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">codeHash58</Typography>
          <CustomInput
            type="text"
            placeholder="codeHash58"
            name="codeHash58"
            value={requestData.codeHash58}
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
          <Typography variant="h6">isExecutable</Typography>
          <Select
            size="small"
            name="isExecutable"
            value={requestData.isExecutable}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={undefined}>undefined</MenuItem>
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
        </Box>
        <Spacer height="10px" />

        <Button
          name="List ATs"
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
