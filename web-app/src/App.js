import logo from './logo.svg';
import './App.css';

import {Grid, GridItem} from './components/grid/Grid'
import {CardContent, Typography } from '@mui/material';

import { Filter } from './views/filter';

import { ThemeController } from './contexts/themecontext/ThemeContext';

function App() {
  return (
    <ThemeController>
      <Grid rows={2} columns={3} gap={"1em"}>
        <GridItem x={1} width={1} y={1} height={2}>
          <Filter />
        </GridItem>
        <GridItem x={2} width={1} y={1} height={2}>
          <CardContent>
            <Typography variant="h3">My Card Title</Typography>
            <Typography>This is some content inside the card.</Typography>
          </CardContent>
        </GridItem>
        <GridItem x={3} width={1} y={1} height={1}>
          <CardContent>
            <Typography variant="h3">My Card Title</Typography>
            <Typography>This is some content inside the card.</Typography>
          </CardContent>
        </GridItem>
        <GridItem x={3} width={1} y={2} height={1}>
          <CardContent>
            <Typography variant="h3">My Card Title</Typography>
            <Typography>This is some content inside the card.</Typography>
          </CardContent>
        </GridItem>
      </Grid>
    </ThemeController>
  );
}

export default App;
