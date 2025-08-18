import React from "react";
import { DocContainer } from "../../components/Containers";
import {
  SectionSubTitle,
  SectionTitle,
  SingleText,
} from "../../components/Texts";
import { Spacer } from "../../../components/Spacer";
import { FeatureList } from "../../components/FeatureList";
import { DisplayCode } from "../../../components/DisplayCode";
const codeblock1 = `
import { ResourceListDisplay }  from "qapp-core";
`.trim();
const codeblock2 = `
import { ResourceListDisplay, QortalSearchParams }  from "qapp-core";

// if your search is constant leave it outside the React component
const search: QortalSearchParams | null = {
      service: "DOCUMENT",
      limit: 20,
      reverse: true,
      identifier: "qtube-",
  };

// inside the React component
  
  const listItem = useCallback((item: ListItem, index: number) => {
    const data = item.data
    const qortalMetadata = item.qortalMetadata
    return (
      <div>
        <p>qtube video title: {data.title}</p>
        <p>resource identifier: {qortalMetadata.identifier}</p>
      </div>
    )
  }, []);

 <ResourceListDisplay
      listName="homepage-videos"
      search={search}
      listItem={listItem}
  />
`.trim();

const codeblock3 = `
  const loaderItem = useCallback((status) => {
    if(status === 'ERROR') return <ErrorComponent />
    return <ListItemSkeleton  />;
  }, []);

 <ResourceListDisplay
      listName="homepage-videos"
      search={search}
      listItem={listItem}
      loaderItem={loaderItem} // NEWLY ADDED
  />
`.trim();

const codeblock4 = `
 <ResourceListDisplay
      listName="homepage-videos"
      search={search}
      listItem={listItem}
      loaderItem={loaderItem} 
      styles={{      // NEWLY ADDED
        gap: 20,
      }}
      direction="VERTICAL"     // NEWLY ADDED
      disableVirtualization    // NEWLY ADDED
  />
`.trim();

const codeblock5 = `
const helperListMethodsRef = useRef(null)
const [hasNewData, setHasNewData] = useState(false)
const onNewData = useCallback((hasNewData: boolean)=> {
    setHasNewData(hasNewData)
  }, [])

  {hasNewData && (
    <button onClick={()=> {
      helperListMethodsRef.current.resetSearch()
    }}>
     Show new videos
    </button>
  )}

 <ResourceListDisplay
      listName="homepage-videos"
      search={search}
      listItem={listItem}
      loaderItem={loaderItem} 
      styles={{      
        gap: 20,
      }}
      direction="VERTICAL"     
      disableVirtualization
      searchNewData={{           // NEWLY ADDED
        interval: 10000,
        intervalSearch: search           
      }}
      onNewData={onNewData}      // NEWLY ADDED
      ref={helperListMethodsRef} // NEWLY ADDED
  />
`.trim();

const codeblock6 = `

 <ResourceListDisplay
      listName="homepage-videos"
      search={search}
      listItem={listItem}
      loaderItem={loaderItem} 
      styles={{      
        gap: 20,
      }}
      direction="VERTICAL"     
      disableVirtualization
      searchNewData={{           
        interval: 10000,
        intervalSearch: search           
      }}
      onNewData={onNewData}      
      ref={helperListMethodsRef} 
      returnType="BASE64"         // NEWLY ADDED
  />
`.trim();

export const DisplayingAList = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Displaying a list</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        Let's learn how to display a list by using an example.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">Import ResourceListDisplay</SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="20px" />
      <SectionSubTitle variant="h2">Add the required props</SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock2} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        At the minimum you need listName, search, and listItem
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>listName</strong> is up to you what to call it. Each list that
        you are displaying should have a unique name. The name controls the
        handling of lists ( adding, updating, removing and displaying). Let's
        call ours "homepage-videos".
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>search</strong> is an object that contains your search
        parameters. For the list to work correctly, make sure the values do not
        change. A change of <strong>search</strong> refreshes the list from the
        beginning. Changing a <strong>search</strong> param is okay if you are
        changing your search and would like to start over.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>listItem</strong> is a callback function that should return a
        React component. The callback function's params will contain your
        resource data once it's been download. You can then use those values to
        do what you want.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">
        Before a resource is downloaded
      </SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock3} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        While the required params are sufficient for{" "}
        <code>{"<ResourceListDisplay/>"}</code> , your list won't be very
        pretty.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>loaderItem</strong> allows you to display your custom loading
        component. It also comes with a status of either 'ERROR' or 'LOADING'.
        ERROR means that the core was unable to download the resource. At this
        point it would be nice to display to your user an error component with a
        message.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">Enabling pagination</SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock4} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        Before adding pagination, let's add some spacing between each list item
        in the list. We've added the gap field in the styles prop.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        Also, we will change the direction of the list by adding
        direction="HORIZONTAL"
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        To enable pagination, we need to add disableVirtualization as a prop.
        That's it! To disable pagination, add the prop disablePagination.
      </SingleText>
      <Spacer height="5px" />
      <SingleText>
        <strong>loaderItem</strong> allows you to display your custom loading
        component. It also comes with a status of either 'ERROR' or 'LOADING'.
        ERROR means that the core was unable to download the resource. At this
        point it would be nice to display to your user an error component with a
        message.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">Fetching new data</SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock5} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        The <strong>searchNewData</strong> prop tells the component to fetch new
        data. The interval field determines the duration until it checks for new
        data. It takes a value in miliseconds. The intervalSearch is the search
        fields that it will be querying. In most cases it will be the same as
        the search object used above.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        The <strong>ref</strong> prop takes in a ref that will give you access
        to methods. In the code block example, you can execute the resetSearch
        method when there is new data to be shown in the list.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">Non-JSON data</SectionSubTitle>

      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock6} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        The <strong>returnType</strong> prop allows you to specify the data
        return type. If you are dealing with non-JSON data, choose the "BASE64"
        as the return type. An example would be data that is encrypted or data
        that is simply text.
      </SingleText>
    </DocContainer>
  );
};
