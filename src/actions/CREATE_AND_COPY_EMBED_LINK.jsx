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
import { services } from "../constants";

export const Label = styled("label")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `
);

const types = [
  {
    name: "POLL",
  },
  {
    name: "IMAGE",
  },
  {
    name: "ATTACHMENT",
  },
];

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2, // Number of spaces for indentation
    space_in_empty_paren: true, // Add spaces inside parentheses
  });
};
export const CREATE_AND_COPY_EMBED_LINK = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false);

  const [requestData, setRequestData] = useState({
    type: "IMAGE",
    encryptionType: 'public',
    name: "",
    identifier: "",
    service: "DOCUMENT",
    key: ""
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
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = useMemo(() => {
    if(requestData?.type === 'IMAGE' || requestData?.type === 'IMAGE'){
      if(requestData?.encryptionType === 'private'){
        return `
        await qortalRequestWithTimeout({
          action: "CREATE_AND_COPY_EMBED_LINK",
          type: "${requestData.type}",
          identifier:  "${requestData.identifier}",
          service: "${requestData.service}",
          encryptionType: "${requestData.encryptionType}",
          name: "${requestData.name}",
          key: "${requestData.key}"
        }, 120000);
        `.trim();
      }
      return `
      await qortalRequestWithTimeout({
        action: "CREATE_AND_COPY_EMBED_LINK",
        type: "${requestData.type}",
        identifier:  "${requestData.identifier}",
        service: "${requestData.service}",
        encryptionType: "${requestData.encryptionType}",
        name: "${requestData.name}"
      }, 120000);
      `.trim();
    }
    return `
        await qortalRequestWithTimeout({
          action: "CREATE_AND_COPY_EMBED_LINK",
          type: "${requestData.type}",
          name: "${requestData.name}",
        }, 120000);
        `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    if(requestData?.type === 'IMAGE' || requestData?.type === 'IMAGE'){
      if(requestData?.encryptionType === 'private'){
        return `
        interface CreateAndCopyEmbedLinkRequest {
          action: string;
          type: string;
          name: string;
          identifier: string;
          service: string;
          encryptionType: string;
          key: string;
        }
        `.trim();
       
      }
      return `
      interface CreateAndCopyEmbedLinkRequest {
        action: string;
        type: string;
        name: string;
        identifier: string;
        service: string;
        encryptionType: string;
      }
      `.trim();
    
    }
    return `
    interface CreateAndCopyEmbedLinkRequest {
      action: string;
      type: string;
      name: string;
    }
    `.trim();
  
  }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const dynamicFields = {};
      if(requestData?.type === 'IMAGE' || requestData?.type === 'IMAGE'){
        dynamicFields["identifier"] = requestData?.identifier;
        dynamicFields["service"] = requestData?.service;
        dynamicFields["encryptionType"] = requestData?.encryptionType;

        if(requestData?.encryptionType === 'private'){
          dynamicFields["key"] = requestData?.key;
        }
      }

      let account = await qortalRequestWithTimeout(
        {
          action: "CREATE_AND_COPY_EMBED_LINK",
          name: requestData?.name,
          type: requestData?.type,
          ...dynamicFields,
        },
        120000
      );

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
          Creates a UI link that can be shared in chats and threads. For the
          IMAGE type, it will show the image in the chat. For the ATTACHMENT
          type, it will give the user the opportunity to download the
          attachment. For the POLL type, it will present the poll.
        </Typography>
               <Typography variant="body1">
                        This call may take some time if the user has never downloaded the group keys before. In this example we have used the qortalRequestWithTimeout in order to put a custom timeout in miliseconds. The default timeout provided by the regular qortalRequest may not be enough. 
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
                    type: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={undefined}>
                <em>No type selected</em>
              </MenuItem>
              {types?.map((type) => {
                return (
                  <MenuItem key={type.name} value={type.name}>
                    {`${type.name}`}
                  </MenuItem>
                );
              })}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
          </Box>
          {(requestData?.type === "IMAGE" ||
            requestData?.type === "ATTACHMENT") && (
            <>
              <Spacer height="10px" />
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
                <Spacer height="5px" />
                <Typography>Enter a Qortal name</Typography>
              </Box>
              <Spacer height="10px" />
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">encryptionType</Typography>
                <Spacer height="10px" />
                <Select
                  size="small"
                  labelId="label-select-category"
                  id="id-select-category"
                  value={requestData?.encryptionType}
                  displayEmpty
                  onChange={(e) =>
                    setRequestData((prev) => {
                      return {
                        ...prev,
                        encryptionType: e.target.value,
                      };
                    })
                  }
                  sx={{
                    width: "300px",
                  }}
                >
                  <MenuItem value={0}>
                    <em>No encryptionType selected</em>
                  </MenuItem>
              
                      <MenuItem value='public'>
                        public
                      </MenuItem>
                      <MenuItem value='private'>
                        private
                      </MenuItem>
                      <MenuItem value='group'>
                        group
                      </MenuItem>
                </Select>
              </Box>
              <Spacer height="10px" />
              {requestData?.encryptionType === 'private' && (
                <>
                    <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">key</Typography>
                <Spacer height="10px" />
                <CustomInput
                  type="text"
                  placeholder="key"
                  value={requestData.key}
                  name="key"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <Spacer height="5px" />
                <Typography>Enter the shared key</Typography>
              </Box>
                </>
              )}
          
            </>
          )}

          {requestData?.type === "POLL" && (
            <>
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
                <Spacer height="5px" />
                <Typography>Enter a POLL name</Typography>
              </Box>
            </>
          )}

          <Spacer height="20px" />
          <Button
            name="Retrieve link"
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
