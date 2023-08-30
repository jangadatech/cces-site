import React, { useEffect, useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  TablePagination,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import createDataUtil from '@/utils/create-data';
import { URL } from '@/http/config';
import IInputOutput from '@/interfaces/IInputOutput';

export default function InputOutputTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inputOutput, setInputOutput] = useState<IInputOutput[]>([]);

  useEffect(() => {

    const fetchInputOutputData = async () => {
      const url = `${URL}/api/input-outputs`;
  
      try {
        const response = await axios.get(url);
        setInputOutput(response.data);
      } catch (error: any) {
        console.error('Erro na requisição GET:', error.message);
      }
    };

    fetchInputOutputData();
  }, [open]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const transformDataToRows = (inputOutputData: IInputOutput[]): ReturnType<typeof createDataUtil>[] => {
    return inputOutputData.map((el: IInputOutput) => {
      return createDataUtil(el._id, el.driver.name, el.vehicle.prefix, el.odometer, el.register_at, el.status, el.description, null, null, null, el.destiny);
    });
  };


  const rows = transformDataToRows(inputOutput);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Motorista</TableCell>
            <TableCell align="center">Prefixo</TableCell>
            <TableCell align="center">Odômetro</TableCell>
            <TableCell align="center">Horário</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row.id} row={row} />
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

function Row(props: { row: ReturnType<typeof createDataUtil> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
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
        <TableCell align="center" sx={{ py: 0 }}>{row.register_at}</TableCell>
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
    </>
  );
}
