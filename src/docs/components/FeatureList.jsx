import React from 'react';
import { Box, Typography, Link, List, ListItem, ListItemText } from '@mui/material';

export function FeatureList({ items = [] }) {
  return (
    <Box sx={{ maxWidth: 800, p: 2 }}>
      <List>
        {items.map((item, idx) => (
          <ListItem key={idx} alignItems="flex-start" disableGutters sx={{ display: 'list-item', pl: 2 }}>
            <ListItemText
              primary={
                <Typography component="span" fontWeight="bold">
                  • {item.title}
                </Typography>
              }
              secondary={
                <Typography component="span">
                  {item.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
