import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Chip, TablePagination } from '@mui/material';
import createDataUtil from '@/utils/create-data';


function Row(props: { row: ReturnType<typeof createDataUtil> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ py: 0, width: 2 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ py: 0 }}>
          {row.driver}
        </TableCell>
        <TableCell align="center" sx={{ py: 0 }}>{row.prefix}</TableCell>
        <TableCell align="center" sx={{ py: 0 }}>{row.odometer}</TableCell>
        <TableCell align="center" sx={{ py: 0 }}>{row.inputDate}</TableCell>
        <TableCell align="center" sx={{ py: 0 }}>{row.outputDate}</TableCell>
        <TableCell align="center" sx={{ py: 0 }}>
          <Chip label={row.status} color={row.status == 'E' ? 'secondary' : 'info'}  />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Observação</TableCell>
                    <TableCell align="center">Destino</TableCell>
                    <TableCell align="center">Distância pecorrida (L)</TableCell>
                    <TableCell align="center">Odômetro anterior</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.description}>
                      <TableCell align="left" sx={{maxWidth: '20vw', textAlign: 'justify' }}>
                        {detailsRow.description}
                      </TableCell>
                      <TableCell align="center">{detailsRow.destiny}</TableCell>
                      <TableCell align="center">{detailsRow.travelled_distance}</TableCell>
                      <TableCell align="center">{detailsRow.odometer_before}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createDataUtil('Frozen yoghurt', 159, 135696, null, '07:00 - 26/07', 'S', null, 135001, 45, null, 'São Mateus')
];

export default function InputOutputTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Motorista</TableCell>
            <TableCell align="center">Prefixo</TableCell>
            <TableCell align="center">Odômetro</TableCell>
            <TableCell align="center">Entrada</TableCell>
            <TableCell align="center">Saída</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row.driver} row={row} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}