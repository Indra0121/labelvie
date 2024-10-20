import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material/styles";
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableFooter, TablePagination, TableRow, TableHead, Paper,
  IconButton, Typography, Avatar
} from '@mui/material';
import { FirstPage as FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon } from '@mui/icons-material';
import axios from 'axios';

// Pagination Actions Component
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
  const handleBackButtonClick = (event) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event) => onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Main Table Component
function CustomTable({ title, onCellClick }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.31.224/api/magasin.php');
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate empty rows for padding
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>{title}</Typography>
      {data.length > 0 ? (
        <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
           <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={Object.keys(data[0]).length}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', width: 'auto' }}>
            <Table aria-label="custom pagination table" sx={{ tableLayout: 'auto', width: 'auto' }}>
              
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map((key) => (
                    <TableCell
                      key={key}
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                        whiteSpace: 'nowrap',  // Prevent breaking content
                        padding: '10px',
                        flexGrow: 1,
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    {Object.entries(row).map(([key, value], cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        align="center"
                        sx={{
                          whiteSpace: 'nowrap',  // Prevent breaking content
                          flexGrow: 1,
                          cursor: 'pointer',
                          padding: '10px',
     '&:hover': { backgroundColor: 'rgba(240, 240, 240, 0.8)' }

                        }}
                        onClick={() => onCellClick(row, key)}
                      >
                        {key === 'Name' ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ marginRight: '10px' }}>{value.charAt(0)}</Avatar>
                            {value}
                          </Box>
                        ) : key === 'BU' ? (
                          <Box
                            sx={{
                              backgroundColor: value.toLowerCase() === 'active' ? '#e8f5e9' : '#ffebee',
                              color: value.toLowerCase() === 'active' ? '#4caf50' : '#f44336',
                              borderRadius: '16px',
                              padding: '4px 8px',
                              display: 'inline-block',
                            }}
                          >
                            {value}
                          </Box>
                       ) : key === 'Google_Maps' ? (
                        <Box
                          sx={{
                            
                            color: '#FFFFFF',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:visited': {  color: '#FFFFFF',},
                          }}
                        >
                          <a styles={{
                         color: '#FFFFFF',
                         padding: '4px 8px',
                         cursor: 'pointer',
                         textDecoration: 'none',
                         '&:visited': {  color: '#FFFFFF',},
                          }} href={value} >
                            {value}
                            </a>
                        </Box>
                      ) : (
                        value
                      )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={Object.keys(data[0]).length} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
               
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ marginLeft: '1vh', mt: 5 }}>No data available</Typography>
      )}
    </>
  );
}

CustomTable.propTypes = {
  title: PropTypes.string.isRequired,
  onCellClick: PropTypes.func.isRequired,
};

export default CustomTable;
