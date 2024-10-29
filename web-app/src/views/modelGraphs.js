

import {Grid, GridItem} from '../components/grid/Grid'
import { HouseTypeGraph } from '../components/graphs/housetype'
import { HouseBedsGraph } from '../components/graphs/housebeds'
import { HouseParkingGraph } from '../components/graphs/houseparking'

/*  This is a wrapper for all the graphs
    It contols the layout based on a grid
    The actuall graphs are handled in seperate files
*/
export default function ModelGraphs({filter, isLandscape})
{
    return (
        <Grid rows={isLandscape ? 1 : 3} columns={isLandscape ? 3 : 1} gap={"0.5em"}>
            <GridItem x={1} width={1} y={1} height={1} style={{maxWidth: "100%"}}><HouseTypeGraph filter={filter}/></GridItem>
            <GridItem x={isLandscape ? 2 : 1} width={1} y={isLandscape ? 1 : 2} height={1} style={{maxWidth: "100%"}}><HouseBedsGraph filter={filter}/></GridItem>
            <GridItem x={isLandscape ? 3 : 1} width={1} y={isLandscape ? 1 : 3} height={1} style={{maxWidth: "100%"}}><HouseParkingGraph filter={filter}/></GridItem>
        </Grid>
    )
}