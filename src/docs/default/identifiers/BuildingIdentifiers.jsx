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

const buildIdentifier = useGlobal().identifierOperations.buildIdentifier;


const createPost = async ()=> {
  const data = {} // your data
  const dataToBase64 =  await objectToBase64(data);

  const service = "DOCUMENT
  const entityType = "post" // Give a name to the type of data this is in your app. All posts will need to have the same entity type. do not give for example "comments" the entity type "post"

  const parentId = null  // Since there is no parent to posts in our example, we will give it a value of null.

  const identifier = await buildIdentifier(entityType, parentId) // Will return a unique identifier

  const base64 = dataToBase64

  const response = await qortalRequest({
    action: "PUBLISH_QDN_RESOURCE",
    service,
    identifier,
    base64
  });  
  

}

return (
  <button onClick={createPost}>create post</button>
)
`.trim();

const codeblock2 = `
import { useGlobal }  from "qapp-core";

// inside the React component

const {identifierOperations} = useGlobal();
const {buildIdentifier} = identifierOperations;

const postId = "e03rJRCU5vxGvF-6fD4hr-MIupmf8DodRIEh-yhbiBoqQSy5tabt"

const createComment = async ()=> {
  const data = {} // your data
  const dataToBase64 =  await objectToBase64(data);

  const service = "DOCUMENT
  const entityType = "comment" 

  const parentId = postId  

  const identifier = await buildIdentifier(entityType, parentId) // Will return a unique identifier

  const base64 = dataToBase64

  const response = await qortalRequest({
    action: "PUBLISH_QDN_RESOURCE",
    service,
    identifier,
    base64
  });  
  

}

return (
  <button onClick={createComment}>create comment</button>
)
`.trim();

export const BuildingIdentifiers = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Building Identifiers</SectionTitle>
      <Spacer height="10px" />
      <SingleText>
        A resource's location on QDN is based on the resource's publisher
        (name), serivice type, and identifier
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        Carefully crafting the identifier allows an app to query the qdn data
        that it needs. It also can act as a way to reference parent-children
        relationships.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        The <strong>buildIdentifier</strong> method gives an easy way to build
        those relationships. It is used in combination with the lists feature
        and the <strong>buildSearchPrefix</strong> method which is used to
        construct the appropriate identifier query.
      </SingleText>
      <Spacer height="25px" />
      <SectionSubTitle variant="h2">buildIdentifier</SectionSubTitle>
      <Spacer height="10px" />
      <SingleText>
        To demonstrate this feature, let's picture the following scenario using
        the Friends app.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        In the friends app, a user can publish a post. The post is at the top of
        the hierchacy so it has no children.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        Each post has coments. The parent here is the post.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        And let's say each comment has a list of replies. The parent here is the
        comment.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        So we now have three lists to display to the user, a list of posts, a
        list of comments for each post and then a list of replies for each
        comment.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>Let's create a post</SingleText>
      <DisplayCode hideLines codeBlock={codeblock1} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        To create an identifier for a post, we will need to pass{" "}
        <strong>buildSearchPrefix</strong> two params.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>entityType: </strong> a string that represents the kind of
        resource we will publish for this app. In this example, all posts will
        need to have the same entity type. Do not give for example "comments"
        the entity type "post"
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        <strong>parentId: </strong> The parentId will be the identifier of the
        child's parent. For a post we've determined that it will not have any
        parent so in this example we put null.
      </SingleText>
      <Spacer height="20px" />
      <SingleText>
        <strong>Creating a comment identifier</strong>
      </SingleText>
      <Spacer height="10px" />
      <DisplayCode hideLines codeBlock={codeblock2} language="jsx" />
      <Spacer height="10px" />
      <SingleText>
        We put the <strong>entityType</strong> as "comment" and the post's
        identifier as the <strong>parentId</strong>.
      </SingleText>
      <Spacer height="10px" />
      <SingleText>
        For the replies, it's the same deal. We put the{" "}
        <strong>entityType</strong> as "replies" and the comment's identifier as
        the <strong>parentId</strong>.
      </SingleText>
    </DocContainer>
  );
};
