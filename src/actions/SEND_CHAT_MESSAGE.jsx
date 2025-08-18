import React, { useMemo, useState } from "react";
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
export const SEND_CHAT_MESSAGE = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("recipient");
  const [type, setType] = useState("simple");

  const [requestData, setRequestData] = useState({
    message: "hello",
    fullContent: {
      messageText: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "hello",
              },
            ],
          },
        ],
      },
      version: 3,
    },
    recipient: "QP9Jj4S3jpCgvPnaABMx8VWzND3qpji6rP",
    groupId: 735,
    chatReference: "",
  });
  const [responseData, setResponseData] = useState(formatResponse(`true`));
  const fullContentValue = useMemo(() => {
    let value = requestData?.fullContent;
    try {
      if (typeof value === "string") return value;
      value = JSON.stringify(value);
    } catch (error) {}
    return value;
  }, [requestData?.fullContent]);

  const codePollName = useMemo(() => {
    if (mode === "recipient") {
      if (type === "simple") {
        let handleDynamic = "";
        if (requestData?.chatReference) {
          handleDynamic = `chatReference: "${requestData.chatReference}"`;
        }
        return `
          await qortalRequest({
            action: "SEND_CHAT_MESSAGE",
            recipient: "${requestData?.recipient}",
            message: "${requestData?.message}",
            ${handleDynamic}
          });
          `.trim();
      } else {
        let handleDynamic = "";
        if (requestData?.chatReference) {
          handleDynamic = `chatReference: "${requestData.chatReference}"`;
        }
        return `
          await qortalRequest({
            action: "SEND_CHAT_MESSAGE",
            recipient: "${requestData?.recipient}",
            fullContent: ${fullContentValue},
            ${handleDynamic}
          });
          `.trim();
      }
    } else {
      if (type === "simple") {
        let handleDynamic = "";
        if (requestData?.chatReference) {
          handleDynamic = `chatReference: "${requestData.chatReference}"`;
        }
        return `
          await qortalRequest({
            action: "SEND_CHAT_MESSAGE",
            groupId: ${requestData?.groupId},
            message: "${requestData?.message}",
            ${handleDynamic}
          });
          `.trim();
      } else {
        let handleDynamic = "";
        if (requestData?.chatReference) {
          handleDynamic = `chatReference: "${requestData.chatReference}"`;
        }
        return `
          await qortalRequest({
            action: "SEND_CHAT_MESSAGE",
            groupId: ${requestData?.groupId},
            fullContent: ${fullContentValue},
            ${handleDynamic}
          });
          `.trim();
      }
    }
  }, [requestData, mode, type, fullContentValue]);

  const tsInterface = useMemo(() => {
    if (mode === "recipient") {
      if (type === "simple") {
        return `interface SendChatMessageRequest {
  action: string;
  recipient: string;
  message: string;
  chatReference?: string;
}
`.trim();
      } else {
        return `interface SendChatMessageRequest {
        action: string;
        recipient: string;
        fullContent: string | object;
        chatReference?: string;
      }
      `.trim();
      }
    } else {
      if (type === "simple") {
        return `interface SendChatMessageRequest {
        action: string;
        groupId: number;
        message: string;
        chatReference?: string;
      }
      `.trim();
      } else {
        return `interface SendChatMessageRequest {
        action: string;
        groupId: number;
        fullContent: string | object;
        chatReference?: string;
      }
      `.trim();
      }
    }
  }, [requestData, mode, type]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let dynamicFields = {};
      if (mode === "group") {
        dynamicFields["groupId"] = requestData.groupId;
      }
      if (mode === "recipient") {
        dynamicFields["recipient"] = requestData.recipient;
      }
      if (requestData?.chatReference) {
        dynamicFields["chatReference"] = requestData.chatReference;
      }
      if (type === "simple") {
        dynamicFields["message"] = requestData.message;
      }
      if (type === "full") {
        dynamicFields["fullContent"] = requestData.fullContent;
      }
      let account = await qortalRequest({
        action: "SEND_CHAT_MESSAGE",
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
    let value = e.target.value;
    if (e.target.name === "fullContent") {
      try {
        value = JSON.parse(e.target.value);
      } catch (error) {}
    }
    setRequestData((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "fullContent" ? value : e.target.value,
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
          Use this qortalRequest to send a message to either a recipient or a
          group. Messages directly to a recipient are encrypted automatically.
        </Typography>
        <Typography variant="body1">
          More information about the format of messages that are compatible with
          UIs will come at a later date.
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
          <Typography variant="h6">Recipient or Group</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={mode}
            displayEmpty
            onChange={(e) => setMode(e.target.value)}
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={"recipient"}>Recipient</MenuItem>

            <MenuItem value={"group"}>Group</MenuItem>
          </Select>
          <Spacer height="5px" />
          <Typography>
            Mode recipient is a 1v1 direct message. These are encrypted
            automatically. Sending a message to a recipient that has no chain
            history will throw an error since their public key needs to be
            available to encrypt.
          </Typography>
          <Spacer height="5px" />
          <Typography>
            Mode group is a chat message sent to a Qortal group. By default
            these messages are not encrypted. But before sending the message
            with this qortalRequest you can encrypt it.
          </Typography>
          <Spacer height="10px" />
        </Box>
        <Spacer height="5px" />
        <Box
          sx={{
            padding: "10px",
            outline: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">Simple text or full content</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={type}
            displayEmpty
            onChange={(e) => setType(e.target.value)}
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={"simple"}>Simple message</MenuItem>

            <MenuItem value={"full"}>Full content</MenuItem>
          </Select>
          <Spacer height="5px" />
          <Typography>
            A simple message is simply a string of text, for example, "hello"
          </Typography>
          <Spacer height="5px" />
          <Typography>
            Full content is more flexible in that you can send an object with
            the format of your choosing. This can include an encrypted message
            for groups in base64 format.
          </Typography>
          <Spacer height="10px" />
        </Box>
        <Spacer height="5px" />
      </Card>
      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="10px" />
        <div className="message-row">
          {mode === "recipient" && (
            <>
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">recipient</Typography>
                <CustomInput
                  type="text"
                  placeholder="recipient"
                  value={requestData.recipient}
                  name="recipient"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <FieldExplanation>
                  <Typography>Required field</Typography>
                </FieldExplanation>
                <Spacer height="5px" />
                <Typography>
                  Enter the Qortal address of the recipient.
                </Typography>
              </Box>
            </>
          )}
          {mode === "group" && (
            <>
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">groupId</Typography>
                <CustomInput
                  type="number"
                  placeholder="groupId"
                  value={requestData.groupId}
                  name="groupId"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <FieldExplanation>
                  <Typography>Required field</Typography>
                </FieldExplanation>
                <Spacer height="5px" />
                <Typography>Enter the Qortal group identifier.</Typography>
              </Box>
            </>
          )}
          {type === "simple" && (
            <>
              <Spacer height="10px" />
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">message</Typography>
                <CustomInput
                  type="text"
                  placeholder="message"
                  value={requestData.message}
                  name="message"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <FieldExplanation>
                  <Typography>Required field</Typography>
                </FieldExplanation>
                <Spacer height="5px" />
                <Typography>Enter a string of text.</Typography>
              </Box>
            </>
          )}
          {type === "full" && (
            <>
              <Spacer height="10px" />
              <Box
                sx={{
                  padding: "10px",
                  outline: "1px solid var(--color3)",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6">fullContent</Typography>
                <CustomInput
                  type="text"
                  placeholder="fullContent"
                  value={fullContentValue}
                  name="fullContent"
                  onChange={handleChange}
                />
                <Spacer height="10px" />
                <FieldExplanation>
                  <Typography>Required field</Typography>
                </FieldExplanation>
                <Spacer height="5px" />
                <Typography>Enter a string, object or base64.</Typography>
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
            <Typography variant="h6">chatReference</Typography>
            <CustomInput
              type="text"
              placeholder="chatReference"
              value={requestData.chatReference}
              name="chatReference"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter a previously sent message's signature. Use this if you want
              to attach this new message with an older message (refernced). We
              use this for message edits and reactions.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Send message"
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
