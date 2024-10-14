import { useState, useEffect } from "react"
import { Table, TableHead, TableRow, TableCell, styled, TableContainer } from "@mui/material"
import { Skeleton } from "@mui/material"
import APIClient from '../api/client'

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

export function DataTable({filter}) 
{
    const [data, setData] = useState(null)

    const LoadData = async () => {

        let data = await APIClient.get("/data/suburb" + (filter.Suburb ? "/" + filter.Suburb : "")); 
        setData(data);
    }

    useEffect(() => {
        if(filter.Suburb != undefined && filter.Suburb != null){
            LoadData();
        }
        else {
            setData([])
        }
    },[filter]);

    if(data == null) return (<SuspendedTable collums={5} rows={10}/>)
    
    if(data.length == 0) return (<>No data available for selected filters.</>)    

    return (
        <TableContainer>
            <Table stickyHeader >
                <TableHead style={{width: "100%"}}> 
                    <TableRow style={{width: "100%"}}>
                        {Object.keys(data[0]).map((x, index) => (
                            <StyledTableHeadCell key={index}>{x}</StyledTableHeadCell>
                        ))}
                    </TableRow>
                </TableHead>
                {data.map((x,index) => (
                    <StyledTableRow>
                        {Object.keys(data[index]).map((x,index) => (
                            <TableCell key={index} style={{ textAlign: "center", padding: "8px"}}>
                                {data[index][x]}
                            </TableCell>
                        ))}
                    </StyledTableRow>
                ))}
            </Table>
        </TableContainer>
    )

}

function SuspendedTable({collums, rows})
{

    return (
        <Table>
            <TableHead style={{width: "100%"}}> 
                <TableRow style={{width: "100%"}}>
                    {[...Array(collums)].map((_, index) => (
                        <StyledTableHeadCell key={index} style={{width: `${100 / collums}%`}}><Skeleton sx={{ fontSize: '2rem' }} animation={"wave"} /></StyledTableHeadCell>
                    ))}
                </TableRow>
            </TableHead>
                {[...Array(rows)].map((_, index) => (
                    <StyledTableRow>
                        {[...Array(collums)].map((_, index) => (
                            <TableCell key={index} style={{ width: `${100 / collums}%`, textAlign: "center", padding: "8px" }}><Skeleton sx={{ fontSize: '2rem' }} animation={"wave"} /></TableCell>
                        ))}
                    </StyledTableRow>
                ))}
        </Table>
    )
}