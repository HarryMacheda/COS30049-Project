import { useState, useEffect } from "react"
import { Table, TableHead, TableRow, TableCell, styled, TableContainer, TableBody } from "@mui/material"
import { Skeleton } from "@mui/material"
import APIClient from '../api/client'


/*
    Theses are how stylings are applied to table elements
*/
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.background.paperDarker,
    textAlign: "center", 
    padding: "8px"
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paperDark,
      },
}))

/* This is the data table view, this displays actual data we used to train the model*/
export function DataTable({filter}) 
{
    const [data, setData] = useState(null)

    const LoadData = async () => {
        // Load the data from the backend
        let data = await APIClient.get("/suburbs" + (filter.Suburb ? "/" + filter.Suburb.Suburb : "")); 
        //filter data further
        if(filter.Type){
            data = data.filter((element) => element.Type == filter.Type);
        }

        if(filter.Beds){
            data = data.filter((element) => element.Beds == filter.Beds);
        }

        if(filter.Baths){
            data = data.filter((element) => element.Baths == filter.Baths);
        }

        if(filter.Parks){
            data = data.filter((element) => element.Parking == filter.Parks);
        }

        setData(data);
    }

    /* use effect to update teh data when the filter changes
       check if the user has selected a suburb since we dont assume a default for them */
    useEffect(() => {
        if(filter.Suburb != undefined && filter.Suburb != null){
            LoadData();
        }
        else {
            setData(null)
        }
    },[filter]);

    // If theres no data then have a loading animation
    if(data == null) return (<SuspendedTable collums={5} rows={10}/>)
    
    // If we searched but there was nothing show a message
    if(data.length == 0) return (<>No data available for selected filters.</>)    

    if(data.error != null) return (<>{data.error}</>)
    /*  This is the table used to display the data  
        We get the object keys for the table head.
        We then loop through all the rows and create a new row in the table
    */
    return (
        <TableContainer style={{width: "100%", maxHeight: "750px", yOverflow: "auto"}}>
            <Table stickyHeader >
                <TableHead style={{width: "100%"}}> 
                    <TableRow style={{width: "100%"}}>
                        {Object.keys(data[0]).map((x, index) => (
                            <StyledTableHeadCell key={index}>{x}</StyledTableHeadCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((y,i) => (
                        <StyledTableRow key={"row_" + i}>
                            {Object.keys(y).map((x,j) => (
                                <TableCell key={i + "_" + j} style={{ textAlign: "center", padding: "8px"}}>
                                    {y[x]}
                                </TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

/* This is the element we display when loading the data
*/
function SuspendedTable({collums, rows})
{

    return (
        <Table>
            <TableHead style={{width: "100%"}}> 
                <TableRow style={{width: "100%"}}>
                    {[...Array(collums)].map((_, index) => (
                        <StyledTableHeadCell key={"suspend_" + index} style={{width: `${100 / collums}%`}}><Skeleton key={"suspend_" + index + "_skeleton"} sx={{ fontSize: '2rem' }} animation={"wave"} /></StyledTableHeadCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {[...Array(rows)].map((_, i) => (
                    <StyledTableRow key={"row_" + i}>
                        {[...Array(collums)].map((_, j) => (
                            <TableCell key={"suspend_" + i + "_" + j} style={{ width: `${100 / collums}%`, textAlign: "center", padding: "8px" }}><Skeleton sx={{ fontSize: '2rem' }} animation={"wave"} /></TableCell>
                        ))}
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    )
}