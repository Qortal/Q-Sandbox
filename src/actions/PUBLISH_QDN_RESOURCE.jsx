import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Card,
  Checkbox,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";

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
export const PUBLISH_QDN_RESOURCE = () => {
  const [requestData, setRequestData] = useState({
    service: "DOCUMENT",
    identifier: "test-identifier",
    base64: "",
    publicKeys: [],
    category: "",
    title: "",
    description: "",
    tags: [],
    isMultiFileZip: false
  });
  const [dataType, setDataType] = useState("file");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const fileSelected = acceptedFiles[0];
      if (fileSelected) {
        setFile(fileSelected);
      }
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "type": "ARBITRARY",
  "timestamp": 1684337616751,
  "reference": "4j2iPN5Xwgocs8Z32JB4UB63G87qS43kPyEwFmQMLvWBXtrSQwAfyx8S9CqQvbregnstXFKqXpkPT2dNdAscriT4",
  "fee": "0.00100000",
  "signature": "5Y6Jdyvo8n6JB44qC8i57x2gA3VXd7aah42GvnzkXL459vCWrRE5gae5TWbGqJxmKnk4p5ESHESv2FJfyB8bdzs9",
  "txGroupId": 0,
  "approvalStatus": "NOT_REQUIRED",
  "creatorAddress": "QMjCNsctvWLoDdPSRpHn6TF2j96iDr9YWm",
  "version": 5,
  "senderPublicKey": "Bjo1iUHJXbCb4LKabmE6KWNL5jSgCK36ypasoDgJG53U",
  "service": 777,
  "nonce": 0,
  "size": 496,
  "name": "Demo",
  "identifier": "myapp-image1234",
  "method": "PUT",
  "secret": "GELP1wMCyMAcwLWTvsAjsFoiR63BcAF7wmrhd1NVhjL",
  "compression": "ZIP",
  "data": "ArzaQASrXM74SDhWp6JhhmUBsocWRoVajZFtYECnAEEy",
  "dataType": "DATA_HASH",
  "metadataHash": "DU1sYzPcRnvAUL6VzerhAmDQUyrn4UceAvV4K6WtZxBi",
  "payments": []
}`)
  );

  //   const codePollName = `
  // await qortalRequest({
  //   action: "PUBLISH_QDN_RESOURCE",
  //   service: "${requestData?.service}",
  //   identifier: "${requestData?.identifier}", // optional
  //   data64: ${requestData?.data64 ? `"${requestData?.data64}"` : "empty"}, // base64 string. Remove this param if you are putting in a FILE object
  //   file: ${file ? 'FILE OBJECT' : "empty"} // File Object. Remove this param if you are putting in a base64 string.
  // });
  // `.trim();

  const codePollName = useMemo(() => {
    const handleAppFee = requestData?.appFee
      ? `appFee: ${requestData.appFee},`
      : "";
    const handleAppFeeRecipient = requestData?.appFeeRecipient
      ? `appFeeRecipient: ${requestData.appFeeRecipient},`
      : "";

        const handlePublicKeys  = !isEncrypted ? '' :  `publicKeys: ${JSON.stringify(requestData.publicKeys)},`
    

    if (dataType === "file") {
      return `
  await qortalRequest({
    action: "PUBLISH_QDN_RESOURCE",
    service: "${requestData?.service}",
    identifier: "${requestData?.identifier}", 
    file: ${file ? "FILE OBJECT" : "empty"}, 
    encrypt: ${isEncrypted},
    title: "${requestData?.title}", 
    description: "${requestData?.description}", 
    category: "${requestData?.category}", 
    tags: ${JSON.stringify(requestData?.tags)}, 
    isMultiFileZip: ${requestData.isMultiFileZip},
    ${handleAppFee}
    ${handleAppFeeRecipient}
    ${handlePublicKeys}
  });
  `.trim();
    } else {
      return `
  await qortalRequest({
    action: "PUBLISH_QDN_RESOURCE",
    service: "${requestData?.service}",
    identifier: "${requestData?.identifier}", 
    base64: ${requestData?.base64 ? `"${requestData?.base64}"` : ""}, 
    encrypt: ${isEncrypted},
    title: "${requestData?.title}", 
    description: "${requestData?.description}", 
    category: "${requestData?.category}", 
    tags: ${JSON.stringify(requestData?.tags)}, 
    ${handleAppFee}
    ${handleAppFeeRecipient}
    ${handlePublicKeys}
  });
  `.trim();
    }
  }, [requestData, file, isEncrypted, dataType]);

  const tsInterface = useMemo(() => {
    const handleAppFee = requestData?.appFee ? `appFee?: number;` : "";
    const handleAppFeeRecipient = requestData?.appFeeRecipient
      ? `appFeeRecipient?: string;`
      : "";
      const handlePublicKeys  = !isEncrypted ? '' :  `publicKeys: string[];`

    if (dataType === "file") {
      return `
 interface PublishQdnResourceRequest {
   action: string;
   service: string;
   identifier: string; 
   file: FILE;
   encrypt?: boolean;
   title?: string;
   description?: string;
   category?: string;
   tags?: string[];
   ${handleAppFee}
   ${handleAppFeeRecipient}
   ${handlePublicKeys}
 }
 `.trim();
    } else {
      return `
 interface PublishQdnResourceRequest {
   action: string;
   service: string;
   identifier: string; 
   base64: string;
   encrypt?: boolean;
   title?: string;
   description?: string;
   category?: string;
   tags?: string[];
   ${handleAppFee}
   ${handleAppFeeRecipient}
   ${handlePublicKeys}
 };
 `.trim();
    }
  }, [requestData, file, isEncrypted, dataType]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const dynamicFields = {};
      if (dataType === "file") {
        dynamicFields["file"] = file;
      }
      if (dataType === "base64") {
        dynamicFields["base64"] = requestData.base64;
      }
      if (requestData?.appFee && requestData?.appFeeRecipient) {
        dynamicFields["appFee"] = requestData.appFee;
        dynamicFields["appFeeRecipient"] = requestData.appFeeRecipient;
      }
      if (isEncrypted) {
        dynamicFields["publicKeys"] = requestData.publicKeys;
      }

      let account = await qortalRequest({
        action: "PUBLISH_QDN_RESOURCE",
        service: requestData?.service,
        identifier: requestData?.identifier,
        encrypt: isEncrypted,
        title: requestData?.title,
        description: requestData?.description,
        category: requestData?.category,
        tags: requestData?.tags,
        isMultiFileZip: requestData?.isMultiFileZip,
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

    const handleChangeCheckbox = (e, val) => {
    setRequestData((prev) => {
      return {
        ...prev,
        [e.target.name]: val,
      };
    });
  };

  const getCategories = React.useCallback(async () => {
    try {
      const url = `/arbitrary/categories`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response?.ok) return;
      const responseData = await response.json();

      setCategories(responseData);
    } catch (error) {
    } finally {
      // dispatch(setIsLoadingGlobal(false))
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
                 Use this qortalRequest if you need to publish a resource.
               </Typography>
                <Typography variant="body1">Needs user approval</Typography>
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
          <Typography>Mode file let's you publish a FILE object.</Typography>
          <Spacer height="5px" />
          <Typography>
            Mode base64 let's you pass in a base64 string to publish.
          </Typography>
        </Box>
      </Card>
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
              <Typography>
                Optional field but only in rare cases will this not be used.
              </Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter an identifier</Typography>
          </Box>
          <Spacer height="10px" />
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
              <Typography>Upload a file to be encrypted</Typography>
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
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">encrypt</Typography>
            <Spacer height="10px" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={(e) => {
                  setIsEncrypted(e.target.checked);
                }}
                checked={isEncrypted}
                edge="start"
                tabIndex={-1}
                disableRipple
              />
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                encrypt
              </Typography>
            </Box>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Mark this if you want your data to be auto-encrypted. Unmark this
              if you are passing in already encrypted data or if you do not want
              the data to be encrypted.
            </Typography>
          </Box>
          <Spacer height="10px" />
          {isEncrypted && (
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
                You've marked this publish as 'encrypt'. Enter a list of public
                keys.
              </Typography>
            </Box>
          )}
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">appFee</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="number"
              placeholder="appFee"
              value={requestData.appFee}
              name="appFee"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>
                Optional field that allows developers to monetize the publishes
                on their apps.
              </Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter an appFee</Typography>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">appFeeRecipient</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="appFeeRecipient"
              value={requestData.appFeeRecipient}
              name="appFeeRecipient"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>
                Required field if you have entered an appFee
              </Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a Qortal address or Qortal name</Typography>
          </Box>

          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">filename</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="filename"
              value={requestData.filename}
              name="filename"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field.</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Providing a filename with the file's extension is recommended. For
              example, picture.png.
            </Typography>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">title</Typography>
            <Spacer height="10px" />
            <CustomInput
              type="text"
              placeholder="title"
              value={requestData.title}
              name="title"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Title metadata. Can be used to search for the publish.
            </Typography>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">description</Typography>
            <Spacer height="10px" />
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
            <Typography>
              Description metadata. Can be used to search for the publish.
            </Typography>
          </Box>
          <Spacer height="10px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">category</Typography>
            <Spacer height="10px" />
            <Select
              displayEmpty
              placeholder="Select Category"
              value={requestData?.category}
              onChange={(event) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    category: event?.target.value,
                  };
                })
              }
            >
              <MenuItem value={""}>
                <em>Select Category</em>
              </MenuItem>
              {categories?.map((category) => {
                return (
                  <MenuItem value={category?.id}>{category?.name}</MenuItem>
                );
              })}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Optional field that allows you to attach a publish to a Qortal
              category.
            </Typography>
          </Box>
          <Spacer height="10px" />
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
              maxLength={5}
              items={requestData.tags}
              setItems={(tags) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    tags: tags,
                  };
                });
              }}
            />

            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Optionally put up to 5 tags.</Typography>
          </Box>
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">isMultiFileZip</Typography>
            <Spacer height="10px" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={handleChangeCheckbox}
                checked={requestData.isMultiFileZip}
                edge="start"
                tabIndex={-1}
                disableRipple
                name="isMultiFileZip"
              />
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                isMultiFileZip
              </Typography>
            </Box>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              This shouldn't be put to true if the resource is to be encrypted. Also use File instead of base64.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Publish"
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
