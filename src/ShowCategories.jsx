import { Box, ButtonBase, Chip, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { actions, categories } from "./constants";

export const ShowCategories = ({
  selectedCategory,
  setSelectedAction,
  search,
}) => {
  const actionsToShow = useMemo(() => {
    if (selectedCategory === 0) {
      return categories
        ?.map((category) => {
          const matchedActions = Object.keys(actions)
            .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
            .filter((key) => actions[key].category === category)
            .map((key) => ({
              ...actions[key],
              action: key,
            }));

          if (matchedActions.length === 0) return null;

          return {
            category,
            actions: matchedActions,
          };
        })
        .filter(Boolean); // removes any nulls (categories with no actions)
    }
    return [
      {
        category: selectedCategory,
        actions: Object.keys(actions)
          .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
          .filter((action) => {
            const actionCategory = actions[action].category;
            if (actionCategory === selectedCategory) return true;
            return false;
          })
          .map((key) => {
            return {
              ...actions[key],
              action: key,
            };
          }),
      },
    ];

    // if(selectedCategory === 0) return Object.keys(actions).map((key)=> {
    //     return {
    //         ...actions[key],
    //     action: key
    //     }
    // })

    // return Object.keys(actions).filter((action)=> action.category === selectedCategory).map((key)=> {
    //     return {
    //         ...actions[key],
    //     action: key
    //     }
    // })
  }, [selectedCategory, actions, categories, search]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {actionsToShow?.map((category) => {
        return (
          <React.Fragment key={category?.category}>
            <div className="row">{category?.category}</div>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {category?.actions?.map((action) => {
                return (
                  <ButtonBase
                    key={action.action}
                    onClick={() => {
                      setSelectedAction(action);
                    }}
                  >
                    <Chip label={action.action} variant="outlined" />
                  </ButtonBase>
                );
              })}
            </Stack>
          </React.Fragment>
        );
      })}
    </Box>
  );
};
