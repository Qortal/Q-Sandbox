import React from 'react'
import { DocContainer } from '../../components/Containers'
import { SectionSubTitle, SectionTitle, SingleText } from '../../components/Texts'
import { Spacer } from '../../../components/Spacer'
import { FeatureList } from '../../components/FeatureList';

const features = [
    {
      title: 'Quicker startup: ',
      description: <>
        Starting a new project can be burdensome. The <strong>create-qortal-app</strong> framework helps developers jump-start their app logic in under a minute with just a few simple steps. Building apps that work seamlessly with Qortal's UI has some unique requirements — this framework takes care of those complexities for you.
      </>,
    },
    {
      title: 'Simplified QDN integration: ',
      description: <>
        QDN (Qortal Data Network) is the backbone of app functionality on Qortal. Displaying content like JSON, videos, and images efficiently requires specific logic. This framework handles most of that for you, so you can focus on building features, not infrastructure.
      </>,
    },
    {
      title: 'Reusable logic: ',
      description: <>
        Many Qortal apps share similar logic. This framework centralizes that functionality, reducing code duplication and helping you stay DRY (Don’t Repeat Yourself) across your projects.
      </>,
    },
    {
      title: 'Built for collaboration: ',
      description: <>
        Frameworks like this one are designed to be extended and improved by the community. Other developers can contribute or create new frameworks, accelerating the app development process for everyone. The more we collaborate, the more amazing apps we’ll see on Qortal.
      </>,
    },
  ];

  const requirements = [
    {
      title: 'Node.js: ',
      description: <>We recommend using Node.js version 22 or higher.</>,
    },
    {
      title: 'Qortal Hub: ',
      description: <>Download the Qortal Hub UI and enable Developer Mode.</>,
    },
    {
      title: 'IDE / Code Editor: ',
      description: <>VS Code is recommended, but other IDEs like IntelliJ will work as well.</>,
    },
    {
      title: 'React & TypeScript knowledge: ',
      description: <>A moderate understanding of React and TypeScript is helpful.</>,
    },
  ];
  
  

export const Introduction = () => {
  return (
    <DocContainer>
        <SectionTitle variant='h1'>Introduction</SectionTitle>
        <Spacer height="10px"/>
        <SingleText>
            Welcome to the <strong>create-qortal-app</strong> framework.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
            This documentation will help you on your journey using the <strong>default template</strong> of create-qortal-app.
        </SingleText>
        <Spacer height="10px"/>
        <SingleText>
            The default template is a React-Mui typescript framework that will simplify the process of creating Qortal applications.
        </SingleText>
        <Spacer height="25px" />
        <SectionSubTitle variant='h2'>Why a framework?</SectionSubTitle>
        <FeatureList items={features} />
        <SectionSubTitle variant='h2'>Requirements?</SectionSubTitle>
        <FeatureList items={requirements} />
    </DocContainer>
  )
}
