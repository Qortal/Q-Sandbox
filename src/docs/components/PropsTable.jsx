import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
} from "@mui/material";

export function PropsTable({ rows = [], requiredColumn }) {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{
        width: "100%",
        overflowX: "auto",
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: 600, // Ensures horizontal scroll kicks in on narrow viewports
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Prop</TableCell>
            {requiredColumn && (
              <TableCell sx={{ fontWeight: "bold" }}>Required</TableCell>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Default</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <code>{row.prop}</code>
              </TableCell>
              {requiredColumn && (
                <TableCell>
                  <code>{row.required}</code>
                </TableCell>
              )}
              <TableCell>
                <code>{row.type}</code>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <code>{row.default ?? "-"}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
