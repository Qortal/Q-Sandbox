import React from 'react'
import { DocContainer } from '../../components/Containers'
import { SectionSubTitle, SectionTitle, SingleText } from '../../components/Texts'
import { Spacer } from '../../../components/Spacer'
import { FeatureList } from '../../components/FeatureList';
import { DisplayCode } from '../../../components/DisplayCode';
import devmode from './devmode.png'
const codeblock1 = `npm install -g create-qortal-app`.trim();
const codeblock2 = `npx create-qortal-app`.trim();
const codeblock3 = `
  npx create-qortal-app
? Enter the name of your app: my app
`.trim();
const codeblock4 = `
  npx create-qortal-app
✔ Enter the name of your app: my app

🔍 Fetching available templates...

? Select a template: (Use arrow keys)
❯ react-default-template
`.trim();

  const codeblock5 = `
// AppWrapper.tsx


import { GlobalProvider } from "qapp-core";
import Layout from './styles/Layout';
import { publicSalt } from './qapp-config';

export const AppWrapper = () => {
  return (
    <GlobalProvider
      config={{
        auth: {
          balanceSetting: {
            interval: 180000,
            onlyOnMount: false,
          },
          authenticateOnMount: true,
        },
        publicSalt: publicSalt,
        appName: "My App Test" // ADD YOUR App's name
      }}
    >
      <Layout />
    </GlobalProvider>
  );
};
  `
  const codeblock6 = `npm run dev`.trim();


export const NewProject = () => {
  return (
    <DocContainer>
        <SectionTitle variant='h1'>Starting a new project</SectionTitle>
        <Spacer height="10px"/>
        <SingleText>
            Install <strong>create-qortal-app</strong> and create a new React Qortal project.
        </SingleText>
        <Spacer height="25px" />
        <SectionSubTitle variant='h2'>Installation</SectionSubTitle>
        <Spacer height="10px"/>
        <SingleText>
            From your terminal install create-qortal-app globally
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock1} language="bash" />
        <Spacer height="25px" />
        <SectionSubTitle variant='h2'>Create a new project</SectionSubTitle>
        <Spacer height="10px"/>
        <SingleText>
            From your terminal run the following
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock2} language="bash" />
        <Spacer height="10px"/>
        <SingleText>
           The first thing you will need to do is give your app a name. For this example I'll put the name "my app".
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock3} hideCopy language="bash" />
        <Spacer height="10px"/>
        <SingleText>
           Next, we will choose a template. This tutorial is for the "react-default-template" so we will choose that. Press 'Enter' on your keyword.
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock4} hideCopy language="bash" />
        <Spacer height="10px"/>
        <SingleText>
           After waiting for about a minute, your project will be ready. If you are using vscode, the project's workspace should open up automatically. If not, open your IDE, and open your project's directory.
        </SingleText>
        <Spacer height="20px"/>
        <SingleText>
          There is one last thing to do before working on your project.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
         In the component "AppWrapper.tsx", provide the config with your app's name. Ideally this will be the App's Qortal name.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
         During development you might want to provide a different "appName" so that when your app's in production it isn't filled with test data. In my case, I've added "Test" at the end of my app's name.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
         Once in production, do not change the "appName" or else all previous data meant for your app will not show up.
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock5} hideCopy language="tsx" />
        <Spacer height="10px"/>
        <SingleText>
         And that's it! You are now ready to start coding.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
         To start the app in dev mode, run in the terminal at the root of your project:
        </SingleText>
        <Spacer height="5px" />
        <DisplayCode hideLines codeBlock={codeblock6} language="bash" />
        <Spacer height="10px"/>
        <SingleText>
         In Qortal Hub's dev mode page, click '+ Server', add the host, port and then enter ''. If you have one React project running in dev mode, the port is usually 5173. You will see the port displayed in the terminal after running 'npm run dev'.
        </SingleText>
        <Spacer height="5px" />
        <img src={devmode} style={{
          width: '100%'
        }} />
        <Spacer height="10px"/>
    </DocContainer>
  )
}
