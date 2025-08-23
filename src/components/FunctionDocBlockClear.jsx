import {
  Typography,
  Paper,
  Divider,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DisplayCode } from "./DisplayCode";

export function FunctionDocBlockClear({
  name,
  signature,
  isAsync = false,
  description,
  importStatement,
  params = [],
  returnType,
  codeblock,
}) {
  return (
    <Paper variant="outlined" sx={{ p: 3, my: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <Typography variant="h6" component="div">
          <code>{signature || `${name}()`}</code>
        </Typography>
        {isAsync && <Chip label="async" color="primary" size="small" />}
      </Stack>

      {importStatement && (
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            borderRadius: 1,
            mb: 2,
          }}
        >
          {importStatement}
        </Typography>
      )}

      <Typography variant="body1" mb={2}>
        {description}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Parameters
      </Typography>

      {params.length === 0 ? (
        <Typography color="text.secondary" mb={2}>
          This function takes no parameters.
        </Typography>
      ) : (
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Required</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {params.map((param) => (
              <TableRow key={param.name}>
                <TableCell>
                  <code>{param.name}</code>
                </TableCell>
                <TableCell>
                  <code>{param.type}</code>
                </TableCell>
                <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                <TableCell>{param.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Returns
      </Typography>
      <Typography>
        <code>{returnType.type}</code> – {returnType.description}
      </Typography>
      {codeblock && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Example
          </Typography>

          <DisplayCode hideLines codeBlock={codeblock} language="jsx" />
        </>
      )}
    </Paper>
  );
}
