import { useState } from "react";
import "./ListItem.css";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow, makeStyles, Tooltip } from "@material-ui/core";
import { getTickets, prendreTicket } from "../../store/apiCalls/ticket";
import { getDate, getEmail, getName } from "../../utils/utilFunctions";
const useStyles = makeStyles({
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const ListItem = ({ ticket, openPopup }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const takeTicket = async () => {
    // console.log(`taking ticket..by ${user.id}`);
    await dispatch(
      prendreTicket({
        etat: "ENCOURS",
        id: ticket?.id,
      })
    );
    dispatch(getTickets());
  };

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
        <p className="date">{getDate(ticket)}</p>
      </TableCell>
      <TableCell
        onClick={() => openPopup(ticket, "ticket")}
        colSpan={2}
        className={`table-cell ${classes.TableCell}`}
      >
        <p className="objet">
          {user?.role !== "AFR"
            ? getName(ticket, "afr")
            : ticket?.adz !== null
            ? getName(ticket, "adz")
            : ""}
        </p>
        <p className="description">
          {user?.role !== "AFR"
            ? getEmail(ticket, "afr")
            : ticket?.adz !== null
            ? getEmail(ticket, "adz")
            : "/"}
        </p>
      </TableCell>
      <TableCell
        colSpan={2}
        align="center"
        className={`table-cell action ${classes.TableCell}`}
      >
        <div className={`ticket-${ticket?.etat}`}>{ticket?.etat}</div>{" "}
        {user?.role === "ADZ" && ticket?.etat === "OUVERT" && (
          <button onClick={() => takeTicket()}>Prendre</button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
