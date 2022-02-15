import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CurrencyConversion,
  getCurrencyConversionList,
} from '../currency.service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { RootState } from '../store/store';

const Dashboard = () => {
  const currency = useSelector(
    (state: RootState) => state.currency.selectedCurrencyCode
  );
  const [list, setList] = useState<CurrencyConversion[]>([]);

  useEffect(() => {
    getCurrencyConversionList(currency).then((res) => setList(res));
  }, [currency]);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {currency.toLocaleUpperCase()} to currency conversion
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((currencyInfo) => (
            <TableRow key={currencyInfo.code}>
              <TableCell>{currencyInfo.code.toLocaleUpperCase()}</TableCell>
              <TableCell align="right">{`${currencyInfo.conversion}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Dashboard;
