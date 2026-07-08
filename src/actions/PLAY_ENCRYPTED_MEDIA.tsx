import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { services } from "../constants";

export const Label = styled("label")(
  ({ theme }: { theme: any }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `,
);

export const formatResponse = (code: string): string => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

interface RequestData {
  mediaId: string;
  key: string;
  iv: string;
  service: string;
}

interface ComponentProps {
  myAddress?: string;
}

export const PLAY_ENCRYPTED_MEDIA: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestData, setRequestData] = useState<RequestData>({
    mediaId: "",
    key: "",
    iv: "",
    service: "VIDEO",
  });
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = `
await qortalRequest({
  action: "PLAY_ENCRYPTED_MEDIA",
  mediaId: "${requestData?.mediaId}",
  key: "${requestData?.key}",
  iv: "${requestData?.iv}",
  service: "${requestData?.service}"
});
`.trim();

  const tsInterface: string = `
interface PlayEncryptedMediaRequest {
  action: string;
  mediaId: string;
  key: string;
  iv: string;
  service: string;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "PLAY_ENCRYPTED_MEDIA",
        mediaId: requestData?.mediaId,
        key: requestData?.key,
        iv: requestData?.iv,
        service: requestData?.service,
      } as any);

      setResponseData(formatResponse(JSON.stringify(result)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
          Play encrypted media files (audio, video) that were encrypted for the
          current user. This action decrypts and plays the media using the
          provided encryption key and initialization vector.
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
            <Typography variant="h6">iv</Typography>
            <CustomInput
              type="text"
              placeholder="iv"
              value={requestData.iv}
              name="iv"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the initialization vector (IV) used for encryption.
            </Typography>
            <Spacer height="20px" />
            <Typography variant="h6">key</Typography>
            <CustomInput
              type="text"
              placeholder="key"
              value={requestData.key}
              name="key"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the decryption key for the encrypted media.
            </Typography>
            <Spacer height="20px" />
            <Typography variant="h6">mediaId</Typography>
            <CustomInput
              type="text"
              placeholder="mediaId"
              value={requestData.mediaId}
              name="mediaId"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the QDN resource identifier for the encrypted media.
            </Typography>
            <Spacer height="20px" />
            <Typography variant="h6">service</Typography>
            <Select
              size="small"
              labelId="label-select-service"
              id="id-select-service"
              value={requestData.service}
              displayEmpty
              onChange={(e: SelectChangeEvent<string>) =>
                setRequestData((prev) => ({
                  ...prev,
                  service: e.target.value,
                }))
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value="">
                <em>No service selected</em>
              </MenuItem>
              {services?.map((service) => (
                <MenuItem key={service.name} value={service.name}>
                  {`${service.name} - max ${service.sizeLabel}`}
                </MenuItem>
              ))}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Select the QDN service type for the encrypted media.
            </Typography>
            <Spacer height="20px" />
            <Button
              name="Play Encrypted Media"
              bgColor="#309ed1"
              onClick={executeQortalRequest}
            />
          </Box>
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
