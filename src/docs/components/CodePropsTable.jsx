import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

/**
 * Renders a responsive table for documenting API fields or properties.
 * Each row should include a prop name, type, and a JSX-based description.
 */
export function CodePropsTable({ rows = [] }) {
  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Property</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell><code>{row.prop}</code></TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
