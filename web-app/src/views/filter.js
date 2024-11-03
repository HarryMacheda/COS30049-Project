import { CardContent, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Box, Stack, Skeleton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { SuburbSearch } from '../components/suburbs/SuburbSearch';
import Divider from '@mui/material/Divider';
import APIClient from '../api/client';

export function Filter({ filter, onChange }) {
  // State to manage values for various filters like Beds, Baths, etc.
  const [stateValues, setStateValues] = useState({
    Beds: 0,
    Baths: 0,
    Parks: 0,
    Type: "",
    State: "",
    suburbs: "",
    nonce: new Date().getTime(),
  });
  
  // State to manage loading status
  const [isLoading, setLoading] = useState(true);
  // Function to fetch suburb data from API and update state
  const loadSuburbs = async () => {
    const suburbData = await APIClient.get("/suburbs");
    setStateValues((prevState) => ({
      ...prevState,
      suburbs: suburbData
    }));
    setLoading(false); // Set loading to false after data is fetched
  };

  // useEffect hook to load suburbs when component mounts or filter changes
  useEffect(() => {
    loadSuburbs();
  }, [filter]);

  // Function to handle changes in filter fields
  const handleChange = (property) => (event) => {
    const value = event.target.value;
    setStateValues((prevState) => ({
      ...prevState,
      [property]: value
    }));
    const newFilter = { ...filter, [property]: value };
    onChange(newFilter); // Trigger the onChange callback to update the parent component
  };

  // Function to clear all filters and reset to initial state
  const clearFilter = () => {
    const newFilter = {...{...stateValues,
      Beds: 0,
      Baths: 0,
      Parks: 0,
      Type: "",
      State: "",
      nonce: new Date().getTime(),
    }}
    setStateValues(newFilter);
    onChange(newFilter); // Trigger the onChange callback to update the parent component
  };

  // Render the form only if not loading
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
          {/* Input for selecting the number of bedrooms */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Bedrooms"
              type="number"
              value ={stateValues.Beds}
              onChange={handleChange("Beds")}
            />
          </FormControl>
          {/* Input for selecting the number of bathrooms */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Bathrooms"
              type="number"
              value={stateValues.Baths}
              onChange={handleChange("Baths")}
            />
          </FormControl>
          {/* Input for selecting the number of parking spaces */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Parking spaces"
              type="number"
              value={stateValues.Parks}
              onChange={handleChange("Parks")}
            />
          </FormControl>
          {/* Dropdown for selecting property type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="label-type">Property Type</InputLabel>
            <Select
              label={"Property Type"}
              value={stateValues.Type}
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
        {/* Dropdown for selecting the state */}
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
        {/* Suburb search component */}
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
        {/* Button to clear all filter inputs */}
        <Button variant="contained" onClick={clearFilter}>
          Clear Filter
        </Button>
      </CardContent>
    );
  }

  // Placeholder layout displayed while loading suburb data
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
