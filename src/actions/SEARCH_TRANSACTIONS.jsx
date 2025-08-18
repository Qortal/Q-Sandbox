import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
  Button as MuiButton
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import beautify from "js-beautify";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import { services, txTypes } from "../constants";
import { FieldExplanation } from "../components/QRComponents";
import { OptionsManager } from "../components/OptionsManager";

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const SEARCH_TRANSACTIONS = () => {
  const [requestData, setRequestData] = useState({
    startBlock: "",
    blockLimit: "",
    txGroupId: "",
    txType: [],
    address: '',
    confirmationStatus: 'BOTH',
    limit: 200,
    offset: 0,
    reverse: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codeBlock = useMemo(() => {
    const optionalFields = {
      startBlock: requestData?.startBlock,
      blockLimit: requestData?.blockLimit,
      txGroupId: requestData?.txGroupId,
      address: requestData?.address,
      confirmationStatus: requestData?.confirmationStatus,
    };

    const dynamicFields = Object.entries(optionalFields)
      .filter(([_, value]) => value) // Include only non-empty fields
      .map(([key, value]) => `  ${key}: "${value}",`) // Properly align with other fields
      .join("\n");

    return `await qortalRequest({
        action: "SEARCH_TRANSACTIONS",
        ${dynamicFields}${dynamicFields ? "\n" : ""}  limit: ${requestData?.limit},
        txType: ${JSON.stringify(requestData?.txType)},
        offset: ${requestData?.offset},
        reverse: ${requestData?.reverse}
      });
    `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    return `
        interface SearchTransactionsRequest {
           action: string;
           startBlock?: number;
           blockLimit?: number;
           txGroupId?:  number;
           txType?: string[];
           address?: string;
           confirmationStatus?: string;
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
        action: "SEARCH_TRANSACTIONS",
        txType: requestData?.txType || null,
        startBlock: requestData?.startBlock || null,
        blockLimit: requestData?.blockLimit || null,
        txGroupId: requestData?.txGroupId || null,
        address: requestData?.address || null,
        confirmationStatus: requestData?.confirmationStatus || null,
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
        Use this qortalRequest to search transactions on Qortal with various filters.
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
          <Typography variant="h6">txType</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={requestData?.txType}
            displayEmpty
            onChange={(e) =>
              setRequestData((prev) => {
                return {
                  ...prev,
                  txType: [...prev?.txType, e.target.value],
                };
              })
            }
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={""}>
              <em>No txType selected</em>
            </MenuItem>
            {txTypes?.map((txType) => {
              return (
                <MenuItem key={txType.name} value={txType.name}>
                  {txType.name}
                </MenuItem>
              );
            })}
          </Select>
          {requestData?.txType?.map((type, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography>{type}</Typography>
                  <MuiButton
                    onClick={() => {
                      setRequestData((prev) => {
                        const copyPrev = [...prev?.txType];
                        copyPrev.splice(index, 1);

                        return {
                          ...prev,
                          txType: copyPrev
                        }
                      });
                    }}
                  >
                    Remove
                  </MuiButton>
                </Box>
              );
            })}
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
          <Typography variant="h6">startBlock</Typography>
          <CustomInput
            type="number"
            placeholder="startBlock"
            name="startBlock"
            value={requestData.startBlock}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>
              Enter the starting block height of your search.
            </Typography>
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
          <Typography variant="h6">blockLimit</Typography>
          <CustomInput
            type="number"
            placeholder="blockLimit"
            name="blockLimit"
            value={requestData.blockLimit}
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
          <Typography variant="h6">txGroupId</Typography>
          <CustomInput
            type="number"
            placeholder="txGroupId"
            name="txGroupId"
            value={requestData.txGroupId}
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
          <Typography variant="h6">confirmationStatus</Typography>
          <Select
            size="small"
            name="confirmationStatus"
            value={requestData.confirmationStatus}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={'CONFIRMED'}>CONFIRMED</MenuItem>
            <MenuItem value={'UNCONFIRMED'}>UNCONFIRMED</MenuItem>
            <MenuItem value={'BOTH'}>BOTH</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
        </Box>
        <Spacer height="10px" />


        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">address</Typography>
          <CustomInput
            type="text"
            placeholder="address"
            name="address"
            value={requestData.address}
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
          <Typography variant="h6">limit</Typography>
          <CustomInput
            type="number"
            placeholder="limit"
            name="limit"
            value={requestData.limit}
            onChange={handleChange}
          />
           <Spacer height="10px" />
          <FieldExplanation>
            <Typography>For limits over 20, you need to provide at least a txType or an address</Typography>
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
          name="Search"
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
