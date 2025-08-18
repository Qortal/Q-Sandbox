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
import { useGlobal }  from "qapp-core";

// inside the React component

const {identifierOperations} = useGlobal()
const {buildSearchPrefix} = identifierOperations;


const getPosts = async ()=> {
  const service = "DOCUMENT
  const entityType = "post" 

  const parentId = null  // Since there is no parent to posts in our example, we will give it a value of null.

  const identifier = await buildSearchPrefix(entityType, parentId) // Will return a unique identifier

 const response = await qortalRequest({
        action: "SEARCH_QDN_RESOURCES",
        limit: 20,
        offset: 0,
        reverse: true
        service,
        mode: ALL,
        prefix: true,
        identifier
      }); 
}

return (
  <button onClick={getPosts}>get posts</button>
)
`.trim();

const codeblock2 = `
import { ResourceListDisplay, QortalSearchParams }  from "qapp-core";

// if using the entityProp, the identifier in search needs to be an empty string
const search: QortalSearchParams | null = {
      service: "DOCUMENT",
      limit: 20,
      reverse: true,
      identifier: "",
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
      entityParams={{           // By adding the entityParam, the identifier prefix will be constructed for you.
        entityType: 'post',
        parentId: 'null
      }}
  />
`.trim();

export const SearchingByIdentifier = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Searching by identifier</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        The <strong>buildSearchPrefix</strong> is used to construct an
        identifier prefix to search your resources.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">buildSearchPrefix</SectionSubTitle>
      <Spacer height="10px" />
      <SingleText>
        Keeping with the same example, let's construct the identifier prefix
        used to bring back posts. Remember that entityType "post" does not have
        a parent.
      </SingleText>
      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        The <strong>entityType</strong> we put "post" and for the parentId null
        since there is no parent for posts.
      </SingleText>
      <Spacer height="20px" />
      <SingleText>Now let's get a post's comments.</SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>parentId: </strong> The parentId will be the identifier of the
        comments' parent- the post Identifier. The entityType will be "comment"
      </SingleText>
      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock2} language="jsx" />
      <Spacer height="20px" />
      <SectionSubTitle variant="h2">Using <code>{'<ResourceListDisplay />'}</code> with identifier builder</SectionSubTitle>
      <Spacer height="20px" />
      <SingleText>
        **See the LISTS section for more information on ResourceListDisplay**
      </SingleText>
      <Spacer height="10px" />
      <SingleText>In the search prop of <strong>ResourceLisDisplay</strong>, instead of putting the identifier directly, we can use the <strong>entityParams</strong> prop to query by our built identifiers</SingleText>
      <Spacer height="20px" />
      <DisplayCode hideLines codeBlock={codeblock2} language="jsx" />
    </DocContainer>
  );
};
