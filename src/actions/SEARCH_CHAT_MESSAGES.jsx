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
import { coins } from "../constants";
import WarningIcon from "@mui/icons-material/Warning";
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
export const SEARCH_CHAT_MESSAGES = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("direct");
  const [involving1, setInvolving1] = useState("");
  const [involving2, setInvolving2] = useState("");
const involving = useMemo(()=> {
  let involve = []
  if(involving1) involve.push(involving1);
  if(involving2) involve.push(involving2)
    return involve
}, [involving1, involving2])
  const [requestData, setRequestData] = useState({
    query: "",
    limit: 20,
    offset: 0,
    reverse: false,
    encoding: 'BASE64',
    sender: "",
    before: "",
    after: "",
    haschatreference: false,
    chatreference: "",
    txGroupId: ""
  });
  const [responseData, setResponseData] = useState(formatResponse(``));


   const codePollName = useMemo(() => {
      const optionalFields = {
        sender: requestData?.sender,
        before: requestData?.before,
        after: requestData?.after,
        haschatreference: requestData?.haschatreference,
        chatreference: requestData?.chatreference
      };
  
      const dynamicFields = Object.entries(optionalFields)
        .filter(([_, value]) => value) // Include only non-empty fields
        .map(([key, value]) => `  ${key}: ${typeof value === 'string' ? `"${value}"` : value},`) // Properly align with other fields
        .join("\n");
      if(mode === 'group'){
        return `await qortalRequest({
          action: "SEARCH_CHAT_MESSAGES",
          ${dynamicFields}${dynamicFields ? "\n" : ""}  offset: ${requestData?.offset},
          limit: ${requestData?.limit},
          reverse: ${requestData?.reverse},
          encoding: ${requestData?.encoding},
          txGroupId: ${requestData?.txGroupId},
        });`.trim()
      } else {
        return `await qortalRequest({
          action: "SEARCH_CHAT_MESSAGES",
          ${dynamicFields}${dynamicFields ? "\n" : ""}  offset: ${requestData?.offset},
          limit: ${requestData?.limit},
          reverse: ${requestData?.reverse},
          encoding: ${requestData?.encoding},
          involving: ${JSON.stringify(involving)},
        });`.trim()
      }
      
      ;
    }, [requestData, mode, involving]);


  const tsInterface = `
interface SearchChatMessagesRequest {
  action: string;
  offset: number;
  limit: number;
  reverse: boolean;
  encoding: string;
  haschatreference?: boolean;
  chatreference?: string;
  sender?: string;
  involving: []string;
  txGroupId: number;
  before?: number;
  after?: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "SEARCH_CHAT_MESSAGES",
        offset: requestData?.offset,
        limit: requestData?.limit,
        reverse: requestData?.reverse,
        encoding: requestData?.encoding,
        haschatreference: requestData?.haschatreference,
        chatreference: requestData?.chatreference,
        sender: requestData?.sender,
        txGroupId: mode === 'group' ? requestData?.txGroupId : null,
        involving: mode === 'group' ? null :  involving,
        before: requestData?.before || null,
        after: requestData?.after || null
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
          The SEARCH_CHAT_MESSAGES endpoint allows you to search for chat messages.
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
                <Typography variant="h6">Direct or Group</Typography>
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
                  <MenuItem value={"direct"}>Direct</MenuItem>
      
                  <MenuItem value={"group"}>Group</MenuItem>
                </Select>
                <Spacer height="5px" />
                <Typography>
                  Mode direct searches for chat messages between two users.
                </Typography>
                <Spacer height="5px" />
                <Typography>
                  Mode group searches for chat messages in a group.
                </Typography>
                <Spacer height="10px" />
              </Box>
              <Spacer height="5px" />
            </Card>
            <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <div className="message-row">
          {mode === 'group' && (
            <>
              <Spacer height="20px" />
              <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">txGroupId</Typography>
            <CustomInput
              type="number"
              placeholder="txGroupId"
              value={requestData.txGroupId}
              name="txGroupId"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a Qortal group id</Typography>
            <Spacer height="5px" />
          </Box>
            
            </>
          )}
           {mode === 'direct' && (
            <>
              <Spacer height="20px" />
              <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">user involved 1</Typography>
            <CustomInput
              type="text"
              placeholder="involving 1"
              value={involving1}
              name="involving1"
              onChange={(e)=> setInvolving1(e.target.value)}
            />
            <Spacer height="10px" />
            <Typography variant="h6">user involved 2</Typography>
            <CustomInput
              type="text"
              placeholder="involving 2"
              value={involving2}
              name="involving2"
              onChange={(e)=> setInvolving2(e.target.value)}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required fields</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the address of both users involved.</Typography>
            <Spacer height="5px" />
          </Box>
            
            </>
          )}
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">limit</Typography>
            <CustomInput
              type="number"
              placeholder="limit"
              value={requestData.limit}
              name="limit"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
          </Box>

          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">offset</Typography>
            <CustomInput
              type="number"
              placeholder="offset"
              value={requestData.offset}
              name="offset"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">reverse</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.reverse}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    reverse: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={false}>false</MenuItem>

              <MenuItem value={true}>true</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Reverse true will list the results by latest of creation.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">encoding</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.encoding}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    encoding: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={'BASE64'}>BASE64</MenuItem>

              <MenuItem value={'BASE58'}>BASE58</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              If true, only the beginning of the name is matched
            </Typography>
          </Box>
       
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">haschatreference</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.haschatreference}
              displayEmpty
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    haschatreference: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={false}>false</MenuItem>

              <MenuItem value={true}>true</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              If true, will only return chat messages that are attached to a previous message. This is used to for message edits and reactions.
            </Typography>
          </Box>
          <Spacer height="20px" />
          {requestData?.haschatreference && (
            <>
              <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">chatreference</Typography>
            <CustomInput
              type="text"
              placeholder="chatreference"
              value={requestData.chatreference}
              name="chatreference"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a chat signature</Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
            </>
          )}
        <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">sender</Typography>
            <CustomInput
              type="text"
              placeholder="sender"
              value={requestData.sender}
              name="sender"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a Qortal qortal address here if you only want to see the message from a particular user.</Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">before</Typography>
            <CustomInput
              type="number"
              placeholder="before"
              value={requestData.before}
              name="before"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a timestamp in milliseconds.</Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">after</Typography>
            <CustomInput
              type="number"
              placeholder="after"
              value={requestData.after}
              name="after"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a timestamp in milliseconds.</Typography>
            <Spacer height="5px" />
          </Box>
          <Spacer height="20px" />
          
          <Button
            name="Search messages"
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
