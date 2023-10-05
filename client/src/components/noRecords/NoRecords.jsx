import { TableCell, TableRow } from "@mui/material";
import "./NoRecords.css";
const NoRecords = ({ cols }) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={cols} className="no-records">
        Il n'y a pas de tickets disponibles
      </TableCell>
    </TableRow>
  );
};

export default NoRecords;
