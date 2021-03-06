import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(name, salary, gender, id, test, address) {
//   return { name, salary, gender, id, test, address };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 1, 'test1', 'banglore'),
//   createData('Donut', 452, 25.0, 2, 'test2', 'delhi'),
//   createData('Eclair', 262, 16.0, 1, 'test1', 'banglore'),
//   createData('Frozen yoghurt', 159, 6.0, 1, 'test1', 'banglore'),
//   createData('Gingerbread', 356, 16.0, 1, 'test1', 'banglore'),
//   createData('Honeycomb', 408, 3.2, 1, 'test1', 'banglore'),
//   createData('Ice cream sandwich', 237, 9.0, 1, 'test1', 'banglore'),
//   createData('Jelly Bean', 375, 0.0, 1, 'test1', 'banglore'),
//   createData('KitKat', 518, 26.0, 1, 'test1', 'banglore'),
//   createData('Lollipop', 392, 0.2, 1, 'test1', 'banglore'),
//   createData('Marshmallow', 318, 0, 1, 'test1', 'banglore'),
//   createData('Nougat', 360, 19.0, 1, 'test1', 'banglore'),
//   createData('Oreo', 437, 18.0, 1, 'test1', 'banglore'),
// ].sort((a, b) => (a.salary < b.salary ? -1 : 1));

//const rows = Axios.get('http://localhost:8000/api/employee/')




const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '10px auto',
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const Employees = () => {
  const [rows, setRows] = React.useState([])
  const [search, setSearch] = React.useState('')
  
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    Axios.get('http://localhost:8000/api/employee/?q='+ search + '&limit='+ rowsPerPage + '&offset=' + page*rowsPerPage)
      .then(response => setRows(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [search, page, rowsPerPage]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    Axios.delete('http://localhost:8000/api/employee/' + id)
      .then(window.location.reload())
  }

  return (
    <div className="form--card">
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Employee By Name"
          inputProps={{ 'aria-label': 'search employees' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell style={{ width: 20 }}>
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row" style={{ maxWidth: 140 }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 60 }}>
                  {row.gender}
                </TableCell>
                <TableCell style={{ width: 60 }}>
                  {row.salary}
                </TableCell>
                <TableCell style={{ width: 60 }}>
                  {row.team}
                </TableCell>
                <TableCell style={{ width: 60 }}>
                  {row.address}
                </TableCell>
                <TableCell style={{ width: 60 }}>
                  <Link to={"update/" + row.id}>
                    <EditIcon style={{ color: 'green' }} />
                  </Link>
                  <DeleteIcon onClick={() => handleDelete(row.id)} style={{ color: 'red' }} />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
      </TableContainer>
    </div>
  );
}

export default Employees
