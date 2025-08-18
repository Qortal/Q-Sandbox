import React, { useState } from "react";
import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
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
export const DEPLOY_AT = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    name: "q-fund crowdfund",
    description: "qortal-devfund-q-fund-campaign",
    tags: "q-fund, q-test",
    creationBytes:
      "1Pub6o13xyqfCZj8BMzmXsREVJR6h4xxpS2VPV1R2QwjP78r2ozxsNuvb28GWrT8FoTTQMGnVP7pNii6auUqYr2uunWfcxwhERbDgFdsJqtrJMpQNGB9GerAXYyiFiij35cP6eHw7BmALb3viT6VzqaXX9YB25iztekV5cTreJg7o2hRpFc9Rv8Z9dFXcD1Mm4WCaMaknUgchDi7qDnHA7JX8bn9EFD4WMG5nZHMsrmeqBHirURXr2dMxFprTBo187zztn9bFAmGdDBxgKg2qkPo7ZX3QFNEsUXeynXM7SJzHzdKaECxbefkPfA1nGENnM1Mto6rjWCX4KZk6QtrUtYBLGHo5XWkXGm9VJmywUbRdJviNbAN23VLBq2Q7AFAeGCkFSTYvomqjNUDUDNRjDH",
    amount: 0.2,
    assetId: 0,
    type: "crowdfund",
  });
  const [responseData, setResponseData] = useState(formatResponse(`
    {
  "type": "DEPLOY_AT",
  "timestamp": 1696526612286,
  "reference": "61w5axRcoyUX9dEjQVotiNkrxuLSotHV8iwrfsF5BimLB9vBHuyZMoC59WY2nbcjUPHVw4QFcpEcQcSwxr5tXVXs",
  "fee": "0.01000000",
  "signature": "4R8MQAA1cqwYfDRC4KUV7nQYpooFHtM71XLFUxC9uX6Ni59CnswivvsqYVXJkzs3qY9QhHS5F4nEbX3tbXmgUjGE",
  "txGroupId": 0,
  "approvalStatus": "NOT_REQUIRED",
  "creatorAddress": "QWfYVQfuz2rVskYkpkVvLxL3kUPmBgKhHV",
  "name": "q-fund crowdfund",
  "description": "qortal-devfund-q-fund-campaign",
  "aTType": "crowdfund",
  "tags": "q-fund",
  "creationBytes": "1Pub6o13xyqfCZj8BMzmXsREVJR6h4xxpS2VPV1R2QwjP78r2ozxsNuvb28GWrT8FoTTQMGnVP7pNii6auUqYr2uunWfcxwhERbDgFdsJqtrJMpQNGB9GerAXYyiFiij35cP6eHw7BmALb3viT6VzqaXX9YB25iztekV5cTreJg7o2hRpFc9Rv8Z9dFXcD1Mm4WCaMaknUgchDi7qDnHA7JX8bn9EFD4WMG5nZHMsrmeqBHirURXr2dMxFprTBo187zztn9bFAmGdDBxgKg2qkPo7ZX3QFNEsUXeynXM7SJzHzdKaECxbefkPfA1nGENnM1Mto6rjWCX4KZk6QtrUtYBLGHo5XWkXGm9VJmywUbRdJviNbAN23VLBq2Q7AFAeGCkFSTYvomqjNUDUDNRjDH",
  "amount": "0.20000000",
  "assetId": 0,
  "aTAddress": "AJQRHEdunFaZpufYfCmqjKBoWYnU6j6jfa",
  "creatorPublicKey": "8i9bPX8Mf8wJRKf4GiSAqWzCBsCNkCtWPJ9hxuHMgGRo",
  "blocksToGoal": 37435,
  "goalValue": 25000,
  "userAddress": "QWfYVQfuz2rVskYkpkVvLxL3kUPmBgKhHV"
}
    `));

  const codePollName = `
await qortalRequest({
  action: "DEPLOY_AT",
  name: "${requestData?.name}",
  description: "${requestData?.description}",
  tags: ${JSON.stringify(requestData.tags)},
  creationBytes: "${requestData?.creationBytes}",
  amount: ${requestData?.amount},
  assetId: ${requestData?.assetId},
  type: "${requestData?.type}",
});
`.trim();

  const tsInterface = `
interface DeployAtRequest {
  action: "DEPLOY_AT",
  name: string;
  description: string;
  tags: string;
  creationBytes: string;
  amount: number;
  assetId: number;
  type: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "DEPLOY_AT",
        name: requestData?.name,
        description: requestData?.description,
        tags: requestData.tags,
        creationBytes: requestData?.creationBytes,
        amount: requestData?.amount,
        assetId: requestData?.assetId,
        type: requestData?.type,
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
          Deploys an automated transaction. More detailed information on AT
          deloyment and usage will be soon be available.
        </Typography>
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
            <Typography variant="h6">name</Typography>
            <CustomInput
              type="text"
              placeholder="name"
              value={requestData.name}
              name="name"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>

            <Spacer height="5px" />
            <Typography>Give a name to the AT</Typography>
            <Spacer height="5px" />
            <Typography>Max characters: 200</Typography>
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
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Give users information about the AT by adding a description
            </Typography>
            <Spacer height="5px" />
            <Typography>Max characters: 2000</Typography>
          </Box>
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">tags</Typography>
            <Spacer height="10px" />
            <OptionsManager
              items={requestData.tags?.split(", ")}
              setItems={(items) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    tags: items?.join(', '),
                  };
                });
              }}
            />

            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Max characters: 200</Typography>
            <Spacer height="5px" />
            <Typography>
              Enter a string of tags.
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
            <Typography variant="h6">creationBytes</Typography>

            <CustomInput
              type="text"
              placeholder="creationBytes"
              value={requestData.creationBytes}
              name="creationBytes"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter creation bytes of the AT.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">amount</Typography>

            <CustomInput
              type="text"
              placeholder="amount"
              value={requestData.amount}
              name="amount"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the amount of QORT to fund the AT. It is
              recommended/necessary to fund the AT with some QORT.
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
            <Typography variant="h6">assetId</Typography>

            <CustomInput
              type="text"
              placeholder="assetId"
              value={requestData.assetId}
              name="assetId"
              onChange={handleChange}
              disabled={true}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the asset used for the AT. At the moment QORT is used (
              represented by the value 0).
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
            <Typography variant="h6">type</Typography>

            <CustomInput
              type="text"
              placeholder="type"
              value={requestData.type}
              name="type"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the AT type. This is made up by you. Try to use the same
              type for similar ATs.
            </Typography>
            <Spacer height="5px" />
            <Typography>Max characters: 200</Typography>
          </Box>

          <Spacer height="20px" />
          <Button
            name="Deploy AT"
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
