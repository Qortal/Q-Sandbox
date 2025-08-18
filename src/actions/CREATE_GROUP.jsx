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
export const CREATE_GROUP = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    groupName: "",
    description: "",
    type: 1,
    approvalThreshold: 40,
    minBlock: 5,
    maxBlock: 21600,
  });
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = `
await qortalRequest({
  action: "CREATE_GROUP",
  groupName: "${requestData?.groupName}",
  description: "${requestData?.description}",
  type: ${requestData.type},
  approvalThreshold: ${requestData.approvalThreshold},
  minBlock: ${requestData.minBlock},
  maxBlock: ${requestData.type},
});
`.trim();

  const tsInterface = `
interface CreateGroupRequest {
  action: string;
  groupName: string;
  description?: string;
  type: number;
  approvalThreshold: number;
  minBlock: number;
  maxBlock: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "CREATE_GROUP",
        groupName: requestData?.groupName,
        description: requestData?.description,
        type: +requestData.type,
        approvalThreshold: +requestData?.approvalThreshold,
        minBlock: +requestData?.minBlock,
        maxBlock: +requestData.maxBlock,
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
        <Typography variant="body1">Create a Qortal Group</Typography>
        <Typography variant="body1">Needs user approval</Typography>
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
            <Typography variant="h6">groupName</Typography>
            <CustomInput
              type="text"
              placeholder="groupName"
              value={requestData.groupName}
              name="groupName"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the name of the group.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">description</Typography>
            <CustomInput
              type="text"
              placeholder="description"
              value={requestData.description}
              name="description"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a description for the group.</Typography>
          </Box>
          <Spacer height="5px" />
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
                    type: +e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={1}>Open (public)</MenuItem>
              <MenuItem value={0}>
                Closed (private) - users need permission to join
              </MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the group type.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">approvalThreshold</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.approvalThreshold}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    approvalThreshold: +e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
               <MenuItem value={0}>NONE</MenuItem>
                    <MenuItem value={1}>ONE </MenuItem>

                    <MenuItem value={20}>20% </MenuItem>
                    <MenuItem value={40}>40% </MenuItem>
                    <MenuItem value={60}>60% </MenuItem>
                    <MenuItem value={80}>80% </MenuItem>
                    <MenuItem value={100}>100% </MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography> Group Approval Threshold (number / percentage of Admins that
              must approve a transaction)</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">minBlock</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.minBlock}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    minBlock: +e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
               <MenuItem value={5}>5 minutes</MenuItem>
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={180}>3 hours</MenuItem>
                    <MenuItem value={300}>5 hours</MenuItem>
                    <MenuItem value={420}>7 hours</MenuItem>
                    <MenuItem value={720}>12 hours</MenuItem>
                    <MenuItem value={1440}>1 day</MenuItem>
                    <MenuItem value={4320}>3 days</MenuItem>
                    <MenuItem value={7200}>5 days</MenuItem>
                    <MenuItem value={10080}>7 days</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Minimum Block delay for Group Transaction Approvals</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">maxBlock</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.maxBlock}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    maxBlock: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={180}>3 hours</MenuItem>
                    <MenuItem value={300}>5 hours</MenuItem>
                    <MenuItem value={420}>7 hours</MenuItem>
                    <MenuItem value={720}>12 hours</MenuItem>
                    <MenuItem value={1440}>1 day</MenuItem>
                    <MenuItem value={4320}>3 days</MenuItem>
                    <MenuItem value={7200}>5 days</MenuItem>
                    <MenuItem value={10080}>7 days</MenuItem>
                    <MenuItem value={14400}>10 days</MenuItem>
                    <MenuItem value={21600}>15 days</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Maximum Block delay for Group Transaction Approvals</Typography>
          </Box>
          <Spacer height="5px" />

          <Spacer height="20px" />
          <Button
            name="Create group"
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
