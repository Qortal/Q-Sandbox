import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export function FunctionDocBlock({ name, description, params, returnType }) {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        <code>{name}()</code>
      </Typography>

      <Typography sx={{ mb: 2 }}>{description}</Typography>

      <Typography variant="subtitle1">Parameters</Typography>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Required</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.map((param) => (
            <TableRow key={param.name}>
              <TableCell><code>{param.name}</code></TableCell>
              <TableCell><code>{param.type}</code></TableCell>
              <TableCell>{param.required ? "Yes" : "No"}</TableCell>
              <TableCell>{param.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle1">Returns</Typography>
      <Typography>
        <code>{returnType.type}</code> – {returnType.description}
      </Typography>
    </Box>
  );
}
