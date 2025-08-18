import React, { useState } from "react";
import { TextField, Button, Chip, Box, Stack, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export function OptionsManager({ items, setItems, label = "Item" , maxLength}) {
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateItem = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      // Update item
      const updatedItems = [...items];
      updatedItems[editIndex] = inputValue;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      if(maxLength && items.length >= maxLength) return
      // Add new item
      if (!items.includes(inputValue)) {
        setItems([...items, inputValue]);
      }
    }

    setInputValue(""); // Clear the input
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label={editIndex !== null ? `Edit ${label}` : `Add ${label}`}
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddOrUpdateItem}
        >
          {editIndex !== null ? "Update" : "Add"}
        </Button>
      </Stack>

      <Box mt={2}>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleDeleteItem(index)}
            onClick={() => handleEditItem(index)}
            // deleteIcon={
            //   <IconButton onClick={() => handleEditItem(index)} size="small">
            //     <Edit fontSize="small" />
            //   </IconButton>
            // }
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}
