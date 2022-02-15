import React, { useEffect, useState } from 'react';
import { CurrencyInfo, getCurrencyList } from '../currency.service';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../store/currencySlice';
import { RootState } from '../store/store';


const Settings = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.selectedCurrencyCode);
  const [availableCurrencies, setAvailableCurrencies] = useState<
    CurrencyInfo[]
  >([]);
  const [selected, setSelected ]= useState<string>(currency);

  useEffect(() => {
    getCurrencyList().then((res) => setAvailableCurrencies(res));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSelected(selected || 'eur'));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Current currency: {currency.toLocaleUpperCase()}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            label="Currency"
            defaultValue={currency}
            onChange={handleChange}
          >
            {availableCurrencies.map((c) => (
              <MenuItem value={c.code}>{`${
                c.name
              } (${c.code.toLocaleUpperCase()})`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Change currency
        </Button>
      </Box>
    </>
  );
};

export default Settings;