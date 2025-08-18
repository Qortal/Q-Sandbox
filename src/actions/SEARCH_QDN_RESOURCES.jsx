import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import beautify from "js-beautify";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";
import { CustomInput } from "../components/Common-styles";
import { services } from "../constants";
import { FieldExplanation } from "../components/QRComponents";
import { OptionsManager } from "../components/OptionsManager";

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const SEARCH_QDN_RESOURCES = () => {
  const [requestData, setRequestData] = useState({
    service: "",
    name: "",
    names: [],
    identifier: "",
    default: false,
    includeStatus: false,
    includeMetadata: false,
    followedOnly: false,
    excludeBlocked: false,
    limit: 20,
    offset: 0,
    reverse: true,
    query: "",
    title: "",
    description: "",
    keywords: [],
    prefix: false,
    exactMatchNames: true,
    nameListFilter: null,
    mode: "ALL",
    minLevel: null,
    before: null,
    after: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(formatResponse(``));

  const codeBlock = useMemo(() => {
    const optionalFields = {
      service: requestData?.service,
      name: requestData?.name,
      identifier: requestData?.identifier,
      query: requestData?.query,
      title: requestData?.title,
      description: requestData?.description,
      nameListFilter: requestData?.nameListFilter,
      minLevel: requestData?.minLevel,
      before: requestData?.before,
      after: requestData?.after,
    };

    const dynamicFields = Object.entries(optionalFields)
      .filter(([_, value]) => value) // Include only non-empty fields
      .map(([key, value]) => `  ${key}: "${value}",`) // Properly align with other fields
      .join("\n");

    return `await qortalRequest({
        action: "SEARCH_QDN_RESOURCES",
        ${dynamicFields}${dynamicFields ? "\n" : ""}  default: ${requestData?.default},
        includeStatus: ${requestData?.includeStatus},
        includeMetadata: ${requestData?.includeMetadata},
        followedOnly: ${requestData?.followedOnly},
        excludeBlocked: ${requestData?.excludeBlocked},
        limit: ${requestData?.limit},
        offset: ${requestData?.offset},
        reverse: ${requestData?.reverse}
        names: ${JSON.stringify(requestData?.names)},
        keywords: ${JSON.stringify(requestData?.keywords)}
        exactMatchNames: ${requestData?.exactMatchNames},
        mode: ${requestData?.mode},
        prefix: ${requestData?.prefix},
      });
    `.trim();
  }, [requestData]);

  const tsInterface = useMemo(() => {
    return `
        interface SearchQdnResourcesRequest {
          action: string;
           service?: string;
           name?: string;
           names?: []string;
           identifier?: string;
           default?: boolean;
           includeStatus?: boolean;
           includeMetadata?: boolean;
           followedOnly?: boolean;
           excludeBlocked?: boolean;
           limit: number;
           offset: number;
           reverse?: boolean;
           query?: string;
           title?: string;
           keywords?: string[];
           description?: string;
           prefix: boolean;
           exactMatchNames: boolean;
           nameListFilter?: string;
           mode: string;
           minLevel?: number;
           before?: number;
           after?: number;
        }
        `;
  }, [requestData]);

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "SEARCH_QDN_RESOURCES",
        service: requestData?.service || undefined,
        name: requestData?.name || undefined,
        names: requestData?.names,
        identifier: requestData?.identifier || undefined,
        default: requestData?.default,
        includeStatus: requestData?.includeStatus,
        includeMetadata: requestData?.includeMetadata,
        followedOnly: requestData?.followedOnly,
        excludeBlocked: requestData?.excludeBlocked,
        limit: requestData?.limit,
        offset: requestData?.offset,
        reverse: requestData?.reverse,
        query: requestData?.query || undefined,
        title: requestData?.title || undefined,
        keywords: requestData?.keywords,
        description: requestData?.description || undefined,
        prefix: requestData?.prefix || undefined,
        exactMatchNames: requestData?.exactMatchNames || undefined,
        nameListFilter: requestData?.nameListFilter || undefined,
        mode: requestData?.mode || undefined,
        minLevel: requestData?.minLevel || undefined,
        before: requestData?.before || undefined,
        after: requestData?.after || undefined,
      });
      setResponseData(formatResponse(JSON.stringify(response, null, 2)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="body1">
        Use this component to search QDN resources with various filters.
      </Typography>
      <Spacer height="20px" />

      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">service</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={requestData?.service}
            displayEmpty
            onChange={(e) =>
              setRequestData((prev) => {
                return {
                  ...prev,
                  service: e.target.value,
                };
              })
            }
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={""}>
              <em>No service selected</em>
            </MenuItem>
            {services?.map((service) => {
              return (
                <MenuItem key={service.name} value={service.name}>
                  {`${service.name} - max ${service.sizeLabel}`}
                </MenuItem>
              );
            })}
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">query</Typography>
          <CustomInput
            type="text"
            placeholder="query"
            name="query"
            value={requestData.query}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>
              Searches name, identifier, title and description fields
            </Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">name</Typography>
          <CustomInput
            type="text"
            placeholder="name"
            name="name"
            value={requestData.name}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
        </Box>
        <Box
          sx={{
            padding: "10px",
            outline: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">names</Typography>
          <Spacer height="10px" />
          <OptionsManager
            items={requestData.names}
            setItems={(items) => {
              setRequestData((prev) => {
                return {
                  ...prev,
                  names: items,
                };
              });
            }}
          />

          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>Enter a list of names</Typography>
          <Spacer height="5px" />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">identifier</Typography>
          <CustomInput
            type="text"
            placeholder="identifier"
            name="identifier"
            value={requestData.identifier}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">default</Typography>
          <Select
            size="small"
            name="default"
            value={requestData.default}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>Query the default resource of a service</Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">includeStatus</Typography>
          <Select
            size="small"
            name="includeStatus"
            value={requestData.includeStatus}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            Putting this field as true will return the status of a resource such
            as DOWNLOADED, ect...
          </Typography>
        </Box>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">prefix</Typography>
          <Select
            size="small"
            name="prefix"
            value={requestData.prefix}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            If true, only the beginning of fields are matched
          </Typography>
        </Box>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">exactMatchNames</Typography>
          <Select
            size="small"
            name="exactMatchNames"
            value={requestData.exactMatchNames}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>If true, partial name matches are excluded</Typography>
        </Box>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">includeMetadata</Typography>
          <Select
            size="small"
            name="includeMetadata"
            value={requestData.includeMetadata}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            Putting this field as true will return metadata
          </Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">followedOnly</Typography>
          <Select
            size="small"
            name="followedOnly"
            value={requestData.followedOnly}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            Putting this field as true will return resources from names you
            follow.
          </Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">mode</Typography>
          <Select
            size="small"
            name="mode"
            value={requestData.mode}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={"ALL"}>ALL</MenuItem>
            <MenuItem value={"LATEST"}>LATEST</MenuItem>
          </Select>
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            LATEST only gets results during the within a recent timeframe. Also,
            it'll only return 1 result per name. For the majority of cases use
            ALL.
          </Typography>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">nameListFilter</Typography>
          <CustomInput
            type="text"
            placeholder="nameListFilter"
            name="nameListFilter"
            value={requestData.nameListFilter}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>
              Will only return results if they are from a name included in
              supplied list
            </Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">title</Typography>
          <CustomInput
            type="text"
            placeholder="title"
            name="title"
            value={requestData.title}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Searches the metadata title field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">description</Typography>
          <CustomInput
            type="text"
            placeholder="description"
            name="description"
            value={requestData.description}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Searches the metadata description field</Typography>
          </FieldExplanation>
        </Box>

        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            outline: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">keywords</Typography>
          <Spacer height="10px" />
          <OptionsManager
            items={requestData.keywords}
            setItems={(items) => {
              setRequestData((prev) => {
                return {
                  ...prev,
                  keywords: items,
                };
              });
            }}
          />

          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>Used to query the description field. If any of the keywords exist in description it'll be returned</Typography>
          <Spacer height="5px" />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">description</Typography>
          <CustomInput
            type="text"
            placeholder="description"
            name="description"
            value={requestData.description}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Searches the metadata description field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">before</Typography>
          <CustomInput
            type="text"
            placeholder="before"
            name="before"
            value={requestData.before}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Filters by timestamp ( milliseconds)</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">after</Typography>
          <CustomInput
            type="text"
            placeholder="after"
            name="after"
            value={requestData.after}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
            <Typography>Filters by timestamp ( milliseconds)</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">excludeBlocked</Typography>
          <Select
            size="small"
            name="excludeBlocked"
            value={requestData.excludeBlocked}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>

          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Optional field</Typography>
          </FieldExplanation>
          <Spacer height="5px" />
          <Typography>
            Putting this field as true will return not return results by names
            that are blocked.
          </Typography>
        </Box>

        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">limit</Typography>
          <CustomInput
            type="number"
            placeholder="limit"
            name="limit"
            value={requestData.limit}
            onChange={handleChange}
          />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">offset</Typography>
          <CustomInput
            type="number"
            placeholder="offset"
            name="offset"
            value={requestData.offset}
            onChange={handleChange}
          />
        </Box>
        <Spacer height="10px" />

        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">reverse</Typography>
          <Select
            size="small"
            name="reverse"
            value={requestData.reverse}
            onChange={handleChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
        </Box>
        <Spacer height="10px" />

        <Button
          name="Search"
          bgColor="#309ed1"
          onClick={executeQortalRequest}
        />
      </Card>

      <Spacer height="20px" />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ width: "50%" }}>
          <h3>Request</h3>
          <DisplayCode codeBlock={codeBlock} language="javascript" />
          <h3>TS interface</h3>
          <DisplayCode codeBlock={tsInterface} language="javascript" />
        </Box>
        <Box sx={{ width: "50%" }}>
          <h3>Response</h3>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
