import { useState } from "react";
import "./ListItem.css";
import { useSelector } from "react-redux";
import { TableCell, TableRow, makeStyles, Tooltip } from "@material-ui/core";
const useStyles = makeStyles({
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const ListItem = ({ ticket, openPopup }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const [etat, setEtat] = useState("OUVERT");
  return (
    <TableRow className={`list-item ${classes.tableRow}`}>
      <TableCell
        onClick={() => openPopup(ticket, "ticket")}
        colSpan={3}
        className={`table-cell ${classes.TableCell}`}
      >
        <div className="objet">{ticket?.objet}</div>
        <div className="description">{ticket?.description}</div>
      </TableCell>
      <TableCell
        onClick={() => openPopup(ticket, "ticket")}
        align="center"
        colSpan={1}
        className={`tdate table-cell ${classes.TableCell}`}
      >
        <p className="date">{ticket?.createdAt}</p>
      </TableCell>
      <TableCell
        onClick={() => openPopup(ticket, "ticket")}
        colSpan={2}
        className={`table-cell ${classes.TableCell}`}
      >
        <p className="objet">Boualouache lamia</p>
        <p className="description">lamiaboualouache@gmail.com</p>
      </TableCell>
      <TableCell
        colSpan={2}
        align="center"
        className={`table-cell action ${classes.TableCell}`}
      >
        <div className={`ticket-${ticket?.etat}`}>{ticket?.etat}</div>{" "}
        {user?.role === "ADZ" && (
          <button onClick={() => console.log("just clicked")}>Prendre</button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
