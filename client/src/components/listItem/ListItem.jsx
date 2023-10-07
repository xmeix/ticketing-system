import { useState } from "react";
import "./ListItem.css";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow, makeStyles, Tooltip } from "@material-ui/core";
import { prendreTicket } from "../../store/apiCalls/ticket";
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

  const takeTicket = () => {
    console.log(`taking ticket..by ${user.id}`);
    dispatch(
      prendreTicket({
        etat: "ENCOURS",
        id: ticket?.id,
      })
    );
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
        <p className="date">{`${new Date(
          ticket?.createdAt
        ).getDate()} - ${new Date(ticket?.createdAt).getMonth()} - ${new Date(
          ticket?.createdAt
        ).getFullYear()}`}</p>
      </TableCell>
      <TableCell
        onClick={() => openPopup(ticket, "ticket")}
        colSpan={2}
        className={`table-cell ${classes.TableCell}`}
      >
        <p className="objet">
          {`${ticket?.afr?.last_name} ${ticket?.afr?.first_name}`.toLowerCase()}
        </p>
        <p className="description">{`${ticket?.afr?.email}`}</p>
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
