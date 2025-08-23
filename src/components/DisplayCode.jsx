import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import copy from "copy-to-clipboard";
import { Tooltip } from "@mui/material";
import { CodeWrapper, CopyCodeIcon, DisplayCodePre } from "./Common-styles";

export const DisplayCode = ({ codeBlock, language = "javascript", hideLines, hideCopy }) => {

  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
    try {
      copy(codeBlock);
      setCopyText("Copied!");
      setTimeout(() => {
        setCopyText("Copy!");
      }, 3000);
    } catch (error) {}
  };

  return (
    <CodeWrapper>
      {!hideCopy && (
          <Tooltip title={copyText} arrow placement="top">
          <CopyCodeIcon onClick={handleCopy} />
        </Tooltip>
      )}
      <Highlight
        theme={
          themes.palenight 
        }
        code={codeBlock}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <DisplayCodePre
            className={`${className} stripe-code-block`}
            style={{ ...style, margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                style={{ display: "flex" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "2em",
                    userSelect: "none",
                    opacity: "0.5",
                    marginRight: "8px",
                    fontSize: "14px",
                    visibility: hideLines ? 'hidden' : 'visible'
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
          </DisplayCodePre>
        )}
      </Highlight>
    </CodeWrapper>
  );
};
