import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { QortalSVG } from "./QortalSVG";
import ContentPasteTwoToneIcon from "@mui/icons-material/ContentPasteTwoTone";
import {LightModeSVG} from '../assets/images/LightModeSVG'
import {DarkModeSVG} from '../assets/images/DarkModeSVG'

export const MainBox = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100px",
  width: "100%",
  padding: "20px 35px",
  [theme.breakpoints.down("sm")]: {
    padding: 0
  }
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "50px"
}));

export const ParagraphContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column"
}));

export const SectionTitleText = styled(Typography)(({ theme }) => ({
  fontFamily: "Oxygen",
  fontWeight: "400",
  letterSpacing: "0.3px",
  fontSize: "32px",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    lineHeight: "40px",
    marginTop: "10px",
    overflowWrap: "anywhere"
  }
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Oxygen",
  fontWeight: "400",
  letterSpacing: "0.3px",
  fontSize: "24px",
  marginTop: "10px",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    lineHeight: "40px",
    marginTop: "10px",
    overflowWrap: "anywhere"
  }
}));

export const SectionParagraph = styled(Typography)(({ theme }) => ({
  marginTop: "20px",
  fontFamily: "Inter",
  fontSize: "19.5px",
  lineHeight: "33px",
  letterSpacing: "0.2px",
  fontWeight: theme.palette.mode === "dark" ? "300" : "400",
  textIndent: "20px",
  width: "fit-content",
  color: theme.palette.text.primary,
  "& a": {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(1.2)"
    }
  }
}));

export const Code = styled("code")(({ theme }) => ({
  padding: "0.2em 0.4em",
  margin: 0,
  fontSize: "16.5px",
  backgroundColor: "#c7f3ff",
  borderRadius: "3px",
  fontFamily: "'Courier New', monospace",
  color: "#333"
}));

export const CodeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative"
}));

export const CopyCodeIcon = styled(ContentPasteTwoToneIcon)(({ theme }) => ({
  position: "absolute",
  right: "20px",
  top: "25px",
  fontSize: "20px",
  color: "white",
  cursor: "pointer"
}));

export const RowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center"
}));

export const ColumnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  padding: "10px 0"
}));

export const InformationParagraph = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "28px",
  fontFamily: "Roboto",
  color: theme.palette.mode === "light" ? "#425061" : "#bfc0c2",
  [theme.breakpoints.down("sm")]: {
    overflowWrap: "anywhere"
  }
}));

export const CustomUnorderedList = styled("ul")(({ theme }) => ({
  listStyleType: "none",
  margin: "10px 0 0 0"
}));

export const CustomListItem = styled("li")(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: "18px",
  lineHeight: "33px",
  letterSpacing: "0.2px",
  fontWeight: "400",
  margin: "5px 0"
}));

export const QortalIcon = styled(QortalSVG)(({ theme }) => ({
  transform: "translateY(3px)",
  marginRight: "15px"
}));

export const ServiceItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  fontFamily: "Inter",
  fontSize: "19.5px",
  lineHeight: "33px",
  letterSpacing: "0.2px",
  fontWeight: "400",
  color: theme.palette.text.primary
}));

export const DisplayCodePre = styled("pre")(({ theme }) => ({
  padding: "30px 10px 20px 10px",
  overflowX: "auto",
  borderRadius: "7px",
  width: "100%",
  maxHeight: "800px",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  textAlign: "left",
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.mode === "light" ? "#282c34" : "#011627"
  },
  "&::-webkit-scrollbar-track:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#282c34" : "#011627"
  },
  "&::-webkit-scrollbar": {
    width: "16px",
    height: "10px",
    backgroundColor: theme.palette.mode === "light" ? "#282c34" : "#011627"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "light" ? "#545a64" : "#072f50",
    borderRadius: "8px",
    backgroundClip: "content-box",
    border: "4px solid transparent"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#4b5058" : "#06233b"
  }
}));

export const DisplayCodeResponsePre = styled("pre")(({ theme }) => ({
  padding: "10px",
  overflowX: "auto",
  borderRadius: "7px",
  maxHeight: "800px",
  width: "100%",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  textAlign: "left",
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.mode === "light" ? "#f6f8fa" : "#292d3e"
  },
  "&::-webkit-scrollbar-track:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#f6f8fa" : "#292d3e"
  },
  "&::-webkit-scrollbar": {
    width: "16px",
    height: "10px",
    backgroundColor: theme.palette.mode === "light" ? "#f6f8fa" : "#292d3e"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "light" ? "#d3d9e1" : "#414763",
    borderRadius: "8px",
    backgroundClip: "content-box",
    border: "4px solid transparent"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#b7bcc4" : "#40455f"
  }
}));

export const ThemeSelectRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexBasis: 0,
  height: '100%',
});

export const LightModeIcon = styled(LightModeSVG)(({ theme }) => ({
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    cursor: 'pointer',
    filter:
      theme.palette.mode === 'dark'
        ? 'drop-shadow(0px 4px 6px rgba(255, 255, 255, 0.6))'
        : 'drop-shadow(0px 4px 6px rgba(99, 88, 88, 0.1))',
  },
}));

export const DarkModeIcon = styled(DarkModeSVG)(({ theme }) => ({
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    cursor: 'pointer',
    filter:
      theme.palette.mode === 'dark'
        ? 'drop-shadow(0px 4px 6px rgba(255, 255, 255, 0.6))'
        : 'drop-shadow(0px 4px 6px rgba(99, 88, 88, 0.1))',
  },
}));

export const LogoContainer = styled('img')({
  width: '12%',
  minWidth: '52px',
  height: 'auto',
  padding: '2px 0',
  userSelect: 'none',
  objectFit: 'contain',
  cursor: 'pointer',
});

export const StyledIcon = styled("svg")(({ theme }) => ({
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    filter: theme.palette.mode === "dark" ? "drop-shadow(0px 4px 6px rgba(255, 255, 255, 0.6))" : "drop-shadow(0px 4px 6px rgba(99, 88, 88, 0.1))"
  }
}));

export const CustomInput = styled("input")(({ theme }) => {
  return `
  width: 320px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #5a71b1;
  padding: 10px;
  color: ${theme.palette.mode === "dark" ? 'white !important' : 'black' };
  background-color: ${theme.palette.mode === "dark" ? 'unset' : 'white' };
  font-family: Raleway, sans-serif;
  font-weight: 300;
  letter-spacing: 0.3px;
  font-size: 16px;
  color: black;
  border-radius: 3px;
  
  `
})

