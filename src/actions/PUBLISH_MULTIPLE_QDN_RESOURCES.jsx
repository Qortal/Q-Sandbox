import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Card,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
  styled,
  Button as MuiButton,
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
export const PUBLISH_MULTIPLE_QDN_RESOURCES = () => {
  const [resources, setResources] = useState([]);
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
  const [isOpenAddResource, setIsOpenAddResource] = useState(false);
  const [categories, setCategories] = useState([]);
  const [responseData, setResponseData] = useState(formatResponse(``));

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
    const handlePublicKeys = !isEncrypted
      ? ""
      : `publicKeys: ${JSON.stringify(requestData.publicKeys)},`;

    return `await qortalRequest({
    action: "PUBLISH_MULTIPLE_QDN_RESOURCES",
    resources: ${JSON.stringify(
      resources?.map((item) => {
        const hasFile = !!item.file;
        if (!hasFile) return item;
        return {
          ...item,
          file: "FILE OBJECT",
        };
      })
    )},
    encrypt: ${isEncrypted},
    ${handlePublicKeys}
  });
  `.trim();
  }, [requestData, file, isEncrypted, dataType, resources]);

  const tsInterface = useMemo(() => {
    const handleAppFee = requestData?.appFee ? `appFee?: number;` : "";
    const handleAppFeeRecipient = requestData?.appFeeRecipient
      ? `appFeeRecipient?: string;`
      : "";

    const handlePublicKeys = !isEncrypted ? "" : `publicKeys: string[];`;

    return `
      interface PublishMultipleQdnResourcesRequest {
        action: string;
        resources: any[];
        encrypt?: boolean;
        ${handleAppFee}
        ${handleAppFeeRecipient}
        ${handlePublicKeys}
      }
      `;
  }, [requestData, file, isEncrypted, dataType]);

  const addtoResources = async () => {
    try {
      const dynamicFields = {};
      if (dataType === "file") {
        dynamicFields["file"] = file;
      }
      if (dataType === "base64") {
        dynamicFields["base64"] = requestData.base64;
      }

      let resource = {
        service: requestData?.service,
        identifier: requestData?.identifier,
        title: requestData?.title,
        description: requestData?.description,
        category: requestData?.category,
        tags: requestData?.tags,
        disableEncrypt: requestData?.disableEncrypt,
        filename: requestData?.filename || "",
        isMultiFileZip: requestData?.isMultiFileZip,
        ...dynamicFields,
      };

      setResources((prev) => [...prev, resource]);
      setRequestData({
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
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const dynamicFields = {};

      if (requestData?.appFee && requestData?.appFeeRecipient) {
        dynamicFields["appFee"] = requestData.appFee;
        dynamicFields["appFeeRecipient"] = requestData.appFeeRecipient;
      }

      if (isEncrypted) {
        dynamicFields["publicKeys"] = requestData.publicKeys;
      }

      let account = await qortalRequest({
        action: "PUBLISH_MULTIPLE_QDN_RESOURCES",
        resources: resources,
        encrypt: isEncrypted,
        ...dynamicFields,
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      console.log("error", error);
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
          Use this qortalRequest if you need to publish more than one resource
          at a time.
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
            <Typography variant="h6">resources</Typography>
            <Spacer height="10px" />
            {resources?.map((resource, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography>{resource?.identifier}</Typography>
                  <MuiButton
                    onClick={() => {
                      setResources((prev) => {
                        const copyPrev = [...prev];
                        copyPrev.splice(index, 1);
                        return copyPrev;
                      });
                    }}
                  >
                    Remove resource from list
                  </MuiButton>
                </Box>
              );
            })}
            <Spacer height="10px" />
            <MuiButton
              onClick={() => {
                setIsOpenAddResource(true);
              }}
              variant="contained"
            >
              Add resource
            </MuiButton>
            <Spacer height="5px" />
            <Typography>
              resources field takes in a list of publishes.
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
      <Dialog
        open={isOpenAddResource}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add a resource</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                  Mode file let's you publish a FILE object.
                </Typography>
                <Spacer height="5px" />
                <Typography>
                  Mode base64 let's you pass in a base64 string to publish.
                </Typography>
              </Box>
            </Card>
            <Spacer height="20px" />

            <Card>
              <Typography variant="h5">Fields</Typography>
              <Button
                onClick={() => {
                  setIsOpenAddResource(true);
                }}
              >
                Add resource
              </Button>
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
                      Optional field but only in rare cases will this not be
                      used.
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
                {isEncrypted && (
                  <>
                    <Spacer height="10px" />
                    <Box
                      sx={{
                        padding: "10px",
                        outline: "1px solid var(--color3)",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography variant="h6">disableEncrypt</Typography>
                      <Spacer height="10px" />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          onChange={(e) => {
                            setRequestData((prev) => {
                              return {
                                ...prev,
                                disableEncrypt: e.target.checked,
                              };
                            });
                          }}
                          checked={requestData?.disableEncrypt}
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          disableEncrypt
                        </Typography>
                      </Box>
                      <Spacer height="10px" />
                      <FieldExplanation>
                        <Typography>Optional field</Typography>
                      </FieldExplanation>
                      <Spacer height="5px" />
                      <Typography>
                        You've marked this qortalRequest to use encrypt=true. By
                        default all the resources in the resources list will be
                        encrypted. Check this field if you want this resource to
                        skip the default encryption.
                      </Typography>
                    </Box>
                  </>
                )}

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
                    Providing a filename with the file's extension is
                    recommended. For example, picture.png.
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
                        <MenuItem value={category?.id}>
                          {category?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Spacer height="10px" />
                  <FieldExplanation>
                    <Typography>Optional field</Typography>
                  </FieldExplanation>
                  <Spacer height="5px" />
                  <Typography>
                    Optional field that allows you to attach a publish to a
                    Qortal category.
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
                    This shouldn't be put to true if the resource is to be
                    encrypted. Also use File instead of base64.
                  </Typography>
                </Box>
              </div>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <MuiButton
            variant="contained"
            onClick={() => {
              setIsOpenAddResource(false);
            }}
          >
            {" "}
            Close
          </MuiButton>

          <MuiButton
            variant="contained"
            onClick={() => {
              addtoResources();
            }}
          >
            Add to resources list
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
