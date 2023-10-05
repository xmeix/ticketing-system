import "./List.css";

import ListItem from "../listItem/ListItem";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  InputAdornment,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import NoRecords from "../noRecords/NoRecords";
import ListParams from "../listParams/ListParams";
const useStyles = makeStyles({
  table: {
    "& .MuiPaper-root, & .MuiTableContainer-root": {
      height: "330px !important",
      maxHeight: "330px !important",
    },
    "& .MuiTableCell-body": {
      fontFamily: "var(--mont) !important",
      fontWeight: 500,
      fontSize: "12px",
      whiteSpace: "nowrap",
    },
    "& .MuiTableCell-head, & .MuiTableCell-stickyHeader": {
      fontFamily: "var(--mont) !important",
      fontWeight: 700,
      fontSize: "11px !important",
      whiteSpace: "nowrap",
      textTransform: "capitalize",
      backgroundColor: "var(--v-light-gray)",
      // color: "white",
    },
    "& .MuiTableRow-root": {
      maxHeight: "50px !important",
      height: "50px !important",
    },
    tableLayout: "fixed",
    borderCollapse: "collapse",
    border: "1px solid #e0e0e0",
    width: "100%",
  },
  tableHeader: {
    border: "1px solid #e0e0e0",
  },
  tableCell: {
    border: "1px solid #e0e0e0",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      background: "var(--white) !important",
    },
  },
});

const List = () => {
  const classes = useStyles();
  const ticket = {
    objet: "First issue",
    description: "lorem ipsum delorum set amet lorem ipsum delorum set amet ",
    etat: "OUVERT",
    adz: "assis dz",
    afr: "assis fr",
    createdAt: "13-12-2023",
  };

  const role = "ADZ";
  const [filter, setFilter] = useState("OUVERT");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const data = [
    {
      objet: "First issue",
      description: "lorem ipsum delorum set amet lorem ipsum delorum set amet ",
      etat: "OUVERT",
      adz: "assis dz",
      afr: "assis fr",
      createdAt:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
    },
    {
      objet: "First issue",
      description: "lorem ipsum delorum set amet lorem ipsum delorum set amet ",
      etat: "ENCOURS",
      adz: "assis dz",
      afr: "assis fr",
      createdAt:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
    },
    {
      objet: "First issue",
      description: "lorem ipsum delorum set amet lorem ipsum delorum set amet ",
      etat: "RESOLU",
      adz: "assis dz",
      afr: "assis fr",
      createdAt:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
    },
    {
      objet: "First issue",
      description: "lorem ipsum delorum set amet lorem ipsum delorum set amet ",
      etat: "OUVERT",
      adz: "assis dz",
      afr: "assis fr",
      createdAt:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
    },
  ];
  
  useEffect(() => {
    if (filter.trim() !== "") {
      const filtered = data.filter((item) =>
        item.etat.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(data);
    }
  }, [filter, data]);

  /** HANDLE  SORT ___________________________________________________*/

  const [sortOrder, setSortOrder] = useState({
    column: "createdAt",
    direction: "desc",
  });

  const sortedData = useMemo(() => {
    const sorted = [...filteredTickets].sort((a, b) => {
      const column = sortOrder.column;
      const direction = sortOrder.direction === "asc" ? 1 : -1;
      if (a[column] < b[column]) {
        return -1 * direction;
      } else if (a[column] > b[column]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return sorted;
  }, [filteredTickets, sortOrder]);

  const handleSort = () => {
    const isAsc = sortOrder.direction === "asc";

    setSortOrder({
      column: sortOrder.column,
      direction: isAsc ? "desc" : "asc",
    });
  };
  /**_______________________________________________ */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="list">
      <ListParams setFilter={setFilter} />

      <TableContainer
        component={Paper}
        aria-label="table"
        className="table-container"
      >
        <Table className={classes.table} stickyHeader size="small">
          <TableHead className={classes.tableHeader}>
            <TableRow className={classes.tableRow}>
              <TableCell colSpan={3} className={classes.tableCell}>
                ticket
              </TableCell>
              <TableCell
                colSpan={1}
                align="center"
                className={`tdate ${classes.tableCell}`}
              >
                créé a
              </TableCell>
              <TableCell colSpan={2} className={classes.tableCell}>
                {role === "ADZ" ? "créé par" : "pris par"}
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                className={classes.tableCell}
              >
                etat
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {filteredTickets.length === 0 ? (
              <NoRecords cols={4} />
            ) : (
              <>
                {filteredTickets.map((ticket) => (
                  <ListItem ticket={ticket} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default List;
