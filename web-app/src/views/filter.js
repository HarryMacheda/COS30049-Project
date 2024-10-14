import {CardContent, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Box,Stack, Skeleton} from '@mui/material';
import {useState, useEffect} from 'react'
import {SuburbSearch} from '../components/suburbs/SuburbSearch';
import Divider from '@mui/material/Divider';
import APIClient from '../api/client'

export function Filter({filter, onChange}) 
{
    const [isLoading, setLoading] = useState(true)
    const [suburbs, setSuburbs] = useState("");
    const [state, setState] = useState("")
    const [propertyType, setPropertyType] = useState("")

    const LoadSuburbs = async () => {
      let suburbData = await APIClient.get("/suburbs");
      setSuburbs(suburbData);
      setLoading(false);
    }

    useEffect(() => {
      LoadSuburbs()
    },[filter]);

    const handlechange = (stateHandler, property) => (value) => {
      stateHandler(value);
      const newfilter = { ...filter, [property]: value }; //need to create a new object other react wont rerender
      onChange(newfilter);
    }


    if(!isLoading)
    {
      return (
        <CardContent>
          <Typography variant="h3">Filter</Typography>
          <br />
          <Typography>Filter results for properties matching the given information.</Typography>
          <br />
          <Divider sx={{ color: (theme) => theme.palette.secondary.main }} textAlign="left">Property Details</Divider>
          <br />
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
              <InputLabel id="label-type">Property Type</InputLabel>
              <Select label={"Property Type"} value={propertyType} labelId={"label-type"} onChange={(event) => handlechange(setPropertyType, "Type")(event.target.value)}>
                <MenuItem value={0}>House</MenuItem>
                <MenuItem value={1}>Townhouse</MenuItem>
                <MenuItem value={2}>Appartment</MenuItem>
                <MenuItem value={3}>Land</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ color: (theme) => theme.palette.secondary.main }} textAlign="left">Property Details</Divider>
          <br />
          <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="label-state">State</InputLabel>
              <Select label="State" value={state} labelId={"label-state"} onChange={(event) => handlechange(setState,"State")(event.target.value)}>
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
            <SuburbSearch options={suburbs} state={state} filter={filter} onChange={onChange}/>
          </FormControl>
        </CardContent>
      )
    }

    //Placeholder when loading
    return (
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation={"wave"}/>
        <br />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} animation={"wave"}/>
        <Divider />
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={60} animation={"wave"}/>
          <Skeleton variant="rounded" height={60} animation={"wave"}/>
          <Skeleton variant="rounded" height={60} animation={"wave"}/>
          <Skeleton variant="rounded" height={60} animation={"wave"}/>
        </Stack >
        <Divider />
        <br />
        <Skeleton variant="rounded" height={60} animation={"wave"}/>
        <br />
        <Skeleton variant="rounded" height={60} animation={"wave"}/>
      </CardContent>
    )
}





