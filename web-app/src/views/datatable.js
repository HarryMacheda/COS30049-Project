import { useState, useEffect } from "react"
import { Table, TableHead, TableRow, TableCell, styled, TableContainer, TableBody } from "@mui/material"
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

        let data = await APIClient.get("/data/suburb" + (filter.Suburb ? "/" + filter.Suburb.Suburb : "")); 
        //filter data further
        if(filter.Type || filter.Type == 0){
            data = data.filter((element) => element.Type == filter.Type);
        }


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
        <TableContainer style={{width: "100%", overflow: "auto"}}>
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