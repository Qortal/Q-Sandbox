import React, { useEffect, useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export function SearchInput({ value, onChange, placeholder = 'Search...', ...props }) {
  const [inputValue, setInputValue] = useState('');

//    // Debounce logic
   useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const showClear = Boolean(inputValue);


  return (
    <TextField
      size="small"
      fullWidth
      variant="outlined"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      sx={{
        maxWidth: '250px'
      }}
      placeholder={placeholder}
      slots={{
        endAdornment: () =>
          showClear ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setInputValue('')}
                edge="end"
                aria-label="clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      {...props}
    />
  );
}
