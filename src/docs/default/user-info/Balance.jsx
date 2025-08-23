import { DocContainer } from "../../components/Containers";
import {
  SectionSubTitle,
  SectionTitle,
  SingleText,
} from "../../components/Texts";
import { Spacer } from "../../../components/Spacer";
import { DisplayCode } from "../../../components/DisplayCode";
import { Box, Card, Typography } from "@mui/material";
import { CodePropsTable } from "../../components/CodePropsTable";

const codeblock1 = `
import { useQortBalance } from "qapp-core";

const balanceInfo = useQortBalance();
const balance = balanceInfo?.value;
console.log(balance);
`.trim();


const authProps = [
  {
    prop: "balanceInfo.value",
    description: (
      <>
        The user’s QORT balance <strong>value</strong>
      </>
    ),
  },
  {
    prop: "balanceInfo.isLoading",
    description: (
      <>
        Informs you if the balance is still in the process of fetching
      </>
    ),
  },
  {
    prop: "balanceInfo.getBalance",
    description: (
      <>
        Returns the user's balance if you wish to fetch it on the fly.
      </>
    ),
  },
];

export const Balance = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Balance</SectionTitle>
      <Spacer height="30px" />
      <Box>
        <Typography variant="h4" gutterBottom>
          Balance  — <code>{'const balanceInfo = useQortBalance()'}</code>
        </Typography>

        <Card>
          <Typography variant="body1" gutterBottom>
            This hook contains everything related to the user's balance ( if they've authenticated)
          </Typography>

          <Typography component="code" sx={{ fontSize: "1rem" }}>
          <code>{'const balanceInfo = useQortBalance()'}</code>
          </Typography>
        </Card>
        <Spacer height="20px" />
        <Typography variant="h6" gutterBottom>
          Properties
        </Typography>

        <CodePropsTable rows={authProps} />
        <Spacer height="20px" />
        <SectionSubTitle variant="h1">Example</SectionSubTitle>
        <Spacer height="10px" />
        <SingleText>
          Let's say you want to to access the user's QORT balance. You can do the following.
        </SingleText>
        <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
        <Spacer height="20px" />
        <SingleText>
          You can configure the GlobalProvider, so that the balance gets fetch on an interval.
        </SingleText>
      </Box>
    </DocContainer>
  );
};
