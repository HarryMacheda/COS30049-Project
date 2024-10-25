import { CardContent, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Box, Stack, Skeleton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { SuburbSearch } from '../components/suburbs/SuburbSearch';
import Divider from '@mui/material/Divider';
import APIClient from '../api/client';

export function Filter({ filter, onChange }) {
  const [stateValues, setStateValues] = useState({
    beds: null,
    baths: null,
    parking: null,
    propertyType: "",
    state: "",
    suburbs: "",
    nonce: new Date().getTime(),
  });
  
  const [isLoading, setLoading] = useState(true);

  const loadSuburbs = async () => {
    const suburbData = await APIClient.get("/suburbs");
    setStateValues((prevState) => ({
      ...prevState,
      suburbs: suburbData
    }));
    setLoading(false);
  };

  useEffect(() => {
    loadSuburbs();
  }, [filter]);

  const handleChange = (property) => (event) => {
    const value = event.target.value;
    setStateValues((prevState) => ({
      ...prevState,
      [property]: value
    }));
    const newFilter = { ...filter, [property]: value };
    onChange(newFilter);
  };

  const clearFilter = () => {
    setStateValues({...stateValues,
      Beds: null,
      Baths: null,
      Parks: null,
      Type: "",
      State: "",
      nonce: new Date().getTime(),
    });
  };

  if (!isLoading) {
    return (
      <CardContent>
        <Typography variant="h3">Filter</Typography>
        <br />
        <Typography>Filter results for properties matching the given information.</Typography>
        <br />
        <Divider sx={{ color: (theme) => theme.palette.secondary.main }} textAlign="left">
          Property Details
        </Divider>
        <br />
        <Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Bedrooms"
              type="number"
              value={stateValues.Beds}
              onChange={handleChange("Beds")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Bathrooms"
              type="number"
              value={stateValues.Baths}
              onChange={handleChange("Baths")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Parking spaces"
              type="number"
              value={stateValues.Parks}
              onChange={handleChange("Parks")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="label-type">Property Type</InputLabel>
            <Select
              label={"Property Type"}
              value={stateValues.propertyType}
              labelId={"label-type"}
              onChange={handleChange("Type")}
            >
              <MenuItem value={0}>House</MenuItem>
              <MenuItem value={1}>Townhouse</MenuItem>
              <MenuItem value={2}>Apartment</MenuItem>
              <MenuItem value={3}>Land</MenuItem>
              <MenuItem value={4}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ color: (theme) => theme.palette.secondary.main }} textAlign="left">
          Location Details
        </Divider>
        <br />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="label-state">State</InputLabel>
          <Select
            label="State"
            value={stateValues.State}
            labelId={"label-state"}
            onChange={handleChange("State")}
          >
            <MenuItem value={"ACT"}>Australian Capital Territory</MenuItem>
            <MenuItem value={"NSW"}>New South Wales</MenuItem>
            <MenuItem value={"NT"}>Northern Territory</MenuItem>
            <MenuItem value={"QLD"}>Queensland</MenuItem>
            <MenuItem value={"SA"}>South Australia</MenuItem>
            <MenuItem value={"TAS"}>Tasmania</MenuItem>
            <MenuItem value={"VIC"}>Victoria</MenuItem>
            <MenuItem value={"WA"}>Western Australia</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <SuburbSearch
            options={stateValues.suburbs}
            state={stateValues.State ? stateValues.State : ""}
            filter={filter}
            onChange={onChange}
            nonce={stateValues.nonce}
          />
        </FormControl>
        <br />
        <Button variant="contained" onClick={clearFilter}>
          Clear Filter
        </Button>
      </CardContent>
    );
  }

  // Placeholder when loading
  return (
    <CardContent>
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation={"wave"} />
      <br />
      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} animation={"wave"} />
      <Divider />
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={60} animation={"wave"} />
        <Skeleton variant="rounded" height={60} animation={"wave"} />
        <Skeleton variant="rounded" height={60} animation={"wave"} />
        <Skeleton variant="rounded" height={60} animation={"wave"} />
      </Stack>
      <Divider />
      <br />
      <Skeleton variant="rounded" height={60} animation={"wave"} />
      <br />
      <Skeleton variant="rounded" height={60} animation={"wave"} />
      <br />
      <Skeleton variant="rounded" height={60} animation={"wave"} />
    </CardContent>
  );
}
