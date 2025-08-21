import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import Button from "../components/Button";
import { Button as MUIbutton } from "@mui/material";
import { OptionsManager } from "../components/OptionsManager";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { formatResponse } from "./SIGN_TRANSACTION.jsx";
import { useDropzone } from "react-dropzone";
import { showError } from "qapp-core";

export const AddLogoIcon = styled(AddPhotoAlternateIcon)(({ theme }) => ({
  color: "#fff",
  height: "25px",
  width: "auto",
}));

export const SHOW_PDF_READER = () => {
  // response is success boolean
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState(undefined);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codePollName = `
await qortalRequest({
  action: "SHOW_PDF_READER",
  
});
`.trim();

  const tsInterface = `
interface ShowPdfReader {
  action: string;
  blob: Blob | File
}
`.trim();

  const handleChange = (e) => {
    setRequestData((prev) => {
      return e.target.value;
    });
  };

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let isSuccess = await qortalRequest({
        action: "SHOW_PDF_READER",
        blob: requestData,
      });

      setResponseData(formatResponse(JSON.stringify(isSuccess)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 419430400, // 400 MB in bytes
    onDrop: (acceptedFiles, rejectedFiles) => {
      const formatArray = acceptedFiles.map((item) => {
        return {
          file: item,
          title: "",
          description: "",
          coverImage: "",
        };
      });

      setRequestData(formatArray[0]?.file);

      let errorString = null;
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            errorString = "File must be under 400 MB";
          }
          console.log(`Error with file ${file.name}: ${error.message}`);
        });
      });
      if (errorString) {
        const notificationObj = {
          msg: errorString,
          alertType: "error",
        };

        showError(notificationObj.msg);
      }
    },
  });

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
          Use this qortalRequest when you want display the contents of a PDF
          File to the user and give them the option to download it.
        </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <div className="message-row">
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">blob</Typography>

            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              <MUIbutton
                variant={"contained"}
                sx={{
                  height: "40px",
                  ":hover": { backgroundColor: "primary.dark" },
                }}
              >
                Upload or Drag PDF File
              </MUIbutton>
            </Box>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter a PDF as a Blob or File</Typography>
          </Box>

          <Spacer height="20px" />
          <Button
            name="Execute"
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
