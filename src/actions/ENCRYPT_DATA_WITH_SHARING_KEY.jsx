import React, { useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
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
import { useDropzone } from "react-dropzone";

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
export const ENCRYPT_DATA_WITH_SHARING_KEY = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false);

  const [requestData, setRequestData] = useState({
    file: null,
    base64: "",
    publicKeys: [],
  });
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const fileSelected = acceptedFiles[0];
      if (fileSelected) {
        setFile(fileSelected);
      }
    },
  });
  const [dataType, setDataType] = useState("file");
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = useMemo(() => {
    if (dataType === "file") {
      return `
        await qortalRequest({
          action: "ENCRYPT_DATA_WITH_SHARING_KEY",
          file: ${file ? "FILE OBJECT" : "empty"},
          publicKeys: ${JSON.stringify(requestData.publicKeys)}
        });
        `.trim();
    } else {
      return `
          await qortalRequest({
            action: "ENCRYPT_DATA_WITH_SHARING_KEY",
            base64: ${requestData?.base64},
            publicKeys: ${JSON.stringify(requestData.publicKeys)}
          });
          `.trim();
    }
  }, [requestData, dataType]);

  const tsInterface = useMemo(() => {
    if (dataType === "file") {
      return `
interface EncryptDataRequest {
  action: string;
  file: File;
  publicKeys?: string[];
}
`.trim();
    } else {
      return `
        interface EncryptDataWithSharingKeyRequest {
          action: string;
          base64: string;
          publicKeys?: string[];
        }
        `.trim();
    }
  }, [requestData, dataType]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const dynamicFields = {};
      if (dataType === "file") {
        dynamicFields["file"] = file;
      } else {
        dynamicFields["base64"] = requestData?.base64;
      }
      let account = await qortalRequest({
        action: "ENCRYPT_DATA_WITH_SHARING_KEY",
        publicKeys: requestData?.publicKeys,
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
          Encrypts data provided by the user which can later be decrypted by anyone who has the sharing key. The user that encrypted the data with this qortalRequest will be able to use the "DECRYPT_DATA" qortalRequest to retrieve the key. The recipient of the key will be able to also decrypt the data using "DECRYPT_DATA_WITH_SHARING_KEY" The publicKeys is optional in this case. Add other publicKeys if you want other users that you trust to also be able to share the sharing key.
        </Typography>
        <Typography variant="body1">
          If you plan on publishing the returned encrypted data, it needs to be published to a SERVICE with _PRIVATE
         </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Modes</Typography>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            outline: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">Data type</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={dataType}
            displayEmpty
            onChange={(e) => setDataType(e.target.value)}
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={"file"}>file</MenuItem>

            <MenuItem value={"base64"}>base64</MenuItem>
          </Select>
          <Spacer height="5px" />
          <Typography>
            Mode file let's you pass in a FILE object to encrypt.
          </Typography>
          <Spacer height="5px" />
          <Typography>
            Mode base64 let's you pass in a base64 string to encrypt.
          </Typography>
        </Box>
      </Card>
      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <div className="message-row">
          {dataType === "file" && (
            <Box
              sx={{
                padding: "10px",
                outline: "1px solid var(--color3)",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">file</Typography>
              <Spacer height="10px" />
              <button
                {...getRootProps()}
                style={{
                  width: "150px",
                }}
              >
                <input {...getInputProps()} />
                Select file
              </button>
              {file && (
                <ButtonBase
                  sx={{
                    width: "150px",
                  }}
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  Remove file
                </ButtonBase>
              )}
              <Spacer height="5px" />
              <Typography>
                {file ? `Selected file: ${file?.name}` : ""}
              </Typography>
              <Spacer height="10px" />
              <FieldExplanation>
                <Typography>Required field</Typography>
              </FieldExplanation>
              <Spacer height="5px" />
              <Typography>
                Upload a file to be encrypted
              </Typography>
              <Spacer height="5px" />
            </Box>
          )}
          {dataType === "base64" && (
            <Box
              sx={{
                padding: "10px",
                outline: "1px solid var(--color3)",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">base64</Typography>
              <CustomInput
                type="text"
                placeholder="base64"
                value={requestData.base64}
                name="base64"
                onChange={handleChange}
              />
              <Spacer height="10px" />
              <FieldExplanation>
                <Typography>Required field</Typography>
              </FieldExplanation>
              <Spacer height="5px" />
              <Typography>Enter base64 data to be encrypted.</Typography>
            </Box>
          )}
          <Spacer height="5px" />

          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">publicKeys</Typography>
            <Spacer height="10px" />
            <OptionsManager
              items={requestData.publicKeys}
              setItems={(items) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    publicKeys: items,
                  };
                });
              }}
            />

            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter a list of public keys.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Encrypt data"
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
