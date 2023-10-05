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
import { useMemo, useState } from "react";
import NoRecords from "../noRecords/NoRecords";
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
    flexBasis: "30%",
    padding: "10px",
    border: "1px solid #e0e0e0",
    fontSize: 13,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      background: "white !important",
    },
  },
  tableBody: {
    fontSize: 11,
  },
  title: {
    fontWeight: 700,
    fontSize: "18px",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "var(--gray)",
    paddingLeft: "1em",
    borderLeft: "solid 4px var(--gray)",
  },
});

const List = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // const filteredData = useMemo(() => {
  //   const hasFilter = filter || filterOption;
  //   if (!hasFilter) {
  //     return data;
  //   }
  //   const trimmedFilter = filter.trim(); // remove leading/trailing spaces
  //   return data.filter((item) => {
  //     let result = true;
  //     if (trimmedFilter) {
  //       // use trimmed filter value
  //       result = columns.some((column) => {
  //         if (!item[column.id]) {
  //           return false;
  //         }
  //         let cellValue;
  //         if (
  //           item[column.id] === "createdAt" ||
  //           item[column.id] === "tDateDeb" ||
  //           item[column.id] === "tDateRet"
  //         ) {
  //           cellValue = item[column.id];
  //         } else {
  //           cellValue = item[column.id].toString().toLowerCase();
  //         }
  //         const filterValue = trimmedFilter.toLowerCase();
  //         return (
  //           cellValue.includes(filterValue) ||
  //           (item.prenom + " " + item.nom)
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           (item.nom + " " + item.prenom)
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           ((column.id === "idEmetteur" ||
  //             column.id === "idEmploye" ||
  //             column.id === "createdBy") &&
  //             (item[column.id].nom
  //               .toString()
  //               .toLowerCase()
  //               .includes(filterValue) ||
  //               item[column.id].prenom
  //                 .toString()
  //                 .toLowerCase()
  //                 .includes(filterValue) ||
  //               (item[column.id].prenom + " " + item[column.id].nom)
  //                 .toString()
  //                 .toLowerCase()
  //                 .includes(filterValue) ||
  //               (item[column.id].nom + " " + item[column.id].prenom)
  //                 .toString()
  //                 .toLowerCase()
  //                 .includes(filterValue) ||
  //               item[column.id].structure
  //                 .toString()
  //                 .toLowerCase()
  //                 .includes(filterValue))) ||
  //           item["mission"]?.uid
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           item["idMission"]?.uid
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           item["mission"]?.objetMission
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           item["employe"]?.nom
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           item["employe"]?.prenom
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           (item["employe"]?.prenom + " " + item["employe"]?.nom)
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           (item["employe"]?.nom + " " + item["employe"]?.prenom)
  //             .toString()
  //             .toLowerCase()
  //             .includes(filterValue) ||
  //           item["uid"]?.toString().toLowerCase().includes(filterValue)
  //         );
  //       });
  //     }
  //     if (filterOption) {
  //       result = result && item?.etat === filterOption.toString();
  //     }

  //     return result;
  //   });
  // }, [data, filter, filterOption]);

  const filteredData = [];
  /** HANDLE  SORT ___________________________________________________*/
  const [sortOrder, setSortOrder] = useState({
    column: "createdAt",
    direction: "desc",
  });

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortOrder]);

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
      <TableContainer component={Paper} aria-label="table">
        <Table className={classes.table} stickyHeader size="small">
          <TableHead className={classes.tableHeader}>
            <TableRow className={classes.tableRow}>
              <TableCell align="center" className={classes.tableCell}>
                objet
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                créé a
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                agent
              </TableCell>
              <TableCell
                align="center"
                className={classes.tableCell}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {filteredData.length === 0 ? <NoRecords cols={4} /> : <ListItem />}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default List;
