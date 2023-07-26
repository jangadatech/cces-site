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
import { TablePagination } from '@mui/material';

function createData(
  driver: string,
  prefix: number,
  odometer: number,
  input_date: string,
  output_date: string | null,
  status: string,
  price: number,
) {
  return {
    driver,
    prefix,
    odometer,
    input_date,
    output_date,
    status,
    price,
    details: [
      {
        description: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente',
        destiny: 'São Mateus',
        kilometer: 3,
        odometer_before: 3,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
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
        <TableCell align="right" sx={{ py: 0 }}>{row.prefix}</TableCell>
        <TableCell align="right" sx={{ py: 0 }}>{row.odometer}</TableCell>
        <TableCell align="right" sx={{ py: 0 }}>{row.input_date}</TableCell>
        <TableCell align="right" sx={{ py: 0 }}>{row.output_date}</TableCell>
        <TableCell align="right" sx={{ py: 0 }}>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Observação</TableCell>
                    <TableCell>Destino</TableCell>
                    <TableCell align="right">Kilometro (L)</TableCell>
                    <TableCell align="right">Odometro anterior</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.description}>
                      <TableCell align="left" sx={{maxWidth: '20vw'}}>
                        {detailsRow.description}
                      </TableCell>
                      <TableCell>{detailsRow.destiny}</TableCell>
                      <TableCell align="right">{detailsRow.kilometer}</TableCell>
                      <TableCell align="right">{detailsRow.odometer_before}</TableCell>
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
  createData('Frozen yoghurt', 159, 135696, '07:00 - 26/07', null, 'Entrada',3.99),
  createData('Ice cream sandwich', 237, 205696, '07:00 - 26/07', null, 'Entrada',4.99),
  createData('Eclair', 262, 139600, '07:00 - 26/07', null, 'Entrada',3.79),
  createData('Cupcake', 305, 145696, '07:00 - 26/07', '18:00 - 26/07', 'Saída',2.5),
  createData('Gingerbread', 356, 130001, '07:00 - 26/07', '18:00 - 26/07', 'Saída',1.5),
  createData('Frozen yoghurt', 159, 257785, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.99),
  createData('Ice cream sandwich', 237, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',4.99),
  createData('Eclair', 262, 409096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.79),
  createData('Cupcake', 305, 309996, '07:00 - 26/07', '18:00 - 26/07', 'Saída',2.5),
  createData('Gingerbread', 356, 301099, '07:00 - 26/07', '18:00 - 26/07', 'Saída',1.5),
  createData('Frozen yoghurt', 115896, 6.0, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.99),
  createData('Ice cream sandwich', 237, 305196, '07:00 - 26/07', '18:00 - 26/07', 'Saída',4.99),
  createData('Eclair', 262, 909098, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.79),
  createData('Cupcake', 305, 458896, '07:00 - 26/07', '18:00 - 26/07', 'Saída',2.5),
  createData('Gingerbread', 309096, 16.0, '07:00 - 26/07', '18:00 - 26/07', 'Saída',1.5),
  createData('Frozen yoghurt', 309096, 6.0, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.99),
  createData('Ice cream sandwich', 237, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',4.99),
  createData('Eclair', 262, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.79),
  createData('Cupcake', 305, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',2.5),
  createData('Gingerbread', 356, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',1.5),
  createData('Frozen yoghurt', 159, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.99),
  createData('Ice cream sandwich', 237, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',4.99),
  createData('Eclair', 262, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',3.79),
  createData('Cupcake', 305, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',2.5),
  createData('Gingerbread', 356, 309096, '07:00 - 26/07', '18:00 - 26/07', 'Saída',1.5),
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
            <TableCell align="right">Prefixo</TableCell>
            <TableCell align="right">Odômetro</TableCell>
            <TableCell align="right">Entrada</TableCell>
            <TableCell align="right">Saída</TableCell>
            <TableCell align="right">Status</TableCell>
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