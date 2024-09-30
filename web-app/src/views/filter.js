import {CardContent, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Box} from '@mui/material';
export function Filter() 
{
    return (
        <CardContent>
          <Typography variant="h5">Filter</Typography>
          <br />
          <Typography>Filter results for properties matching the given information.</Typography>
          <hr />
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Bedrooms" type="number"/>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Bathrooms" type="number"/>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Parking spaces" type="number"/>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="label-state">State</InputLabel>
              <Select label="State" value={"ACT"} labelId={"label-state"}>
                <MenuItem value={"ACT"}>Australian Capital Territory</MenuItem>
                <MenuItem value={"NSW"}>New South Wales</MenuItem>
                <MenuItem value={"NT"}>Northern Territory</MenuItem>
                <MenuItem value={"QLD"}>Queensland</MenuItem>
                <MenuItem value={"SA"}>South Austalia</MenuItem>
                <MenuItem value={"TAS"}>Tasmania</MenuItem>
                <MenuItem value={"VIC"}>Victoria</MenuItem>
                <MenuItem value={"WA"}>Western Australia</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="label-type">Property Type</InputLabel>
              <Select label={"Property Type"} value={0} labelId={"label-type"}>
                <MenuItem value={0}>House</MenuItem>
                <MenuItem value={1}>Townhouse</MenuItem>
                <MenuItem value={2}>Appartment</MenuItem>
                <MenuItem value={3}>Land</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <hr />

        </CardContent>
    )
}





