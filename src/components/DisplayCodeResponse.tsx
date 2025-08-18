import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Typography, Box, useTheme } from "@mui/material";
import { CodeWrapper, DisplayCodeResponsePre } from "./Common-styles";

export const DisplayCodeResponse = ({
  codeBlock,
  language = "javascript"
}) => {
  const theme = useTheme();

  const [copyText, setCopyText] = useState("Copy");

  return (
    <CodeWrapper>
      <Highlight
        theme={
         themes.palenight 
        }
        code={codeBlock}
        language="javascript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <DisplayCodeResponsePre
            className={`${className} stripe-code-block`}
            style={{ ...style, margin: 0 }}
          >
            <Box
              sx={{
                padding: "5px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#767ea0" : "#d3d9e1",
                color: theme.palette.text.primary,
                borderTopRightRadius: "7px",
                borderTopLeftRadius: "7px",
                marginBottom: "10px"
              }}
            >
              <Typography>RESPONSE</Typography>
            </Box>

            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                style={{ display: "flex" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    userSelect: "none",
                    opacity: "0.5",
                    marginRight: "8px",
                    fontSize: "16px"
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontSize: "18px" }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </DisplayCodeResponsePre>
        )}
      </Highlight>
    </CodeWrapper>
  );
};
