import { useState } from "react";
import "./ListItem.css";
import { TableCell, TableRow, makeStyles, Tooltip } from "@material-ui/core";
const useStyles = makeStyles({
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const ListItem = ({ ticket }) => {
  const classes = useStyles();
  const [role, setrole] = useState("ADZ");
  const [etat, setEtat] = useState("OUVERT");
  return (
    <TableRow className={`list-item ${classes.tableRow}`}>
      <TableCell colSpan={3} className={`table-cell ${classes.TableCell}`}>
        <div className="objet">{ticket.objet}</div>
        <div className="description">{ticket.description}</div>
      </TableCell>
      <TableCell
        align="center"
        colSpan={1}
        className={`tdate table-cell ${classes.TableCell}`}
      >
        <p className="date">{ticket.createdAt}</p>
      </TableCell>
      <TableCell colSpan={2} className={`table-cell ${classes.TableCell}`}>
        <p className="objet">Boualouache lamia</p>
        <p className="description">lamiaboualouache@gmail.com</p>
      </TableCell>
      <TableCell
        colSpan={2}
        align="center"
        className={`table-cell action ${classes.TableCell}`}
      >
        <div className={`ticket-${ticket.etat}`}>{ticket.etat}</div>{" "}
        {role === "ADZ" && <button>Prendre</button>}
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
