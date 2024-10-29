import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {TableChart, Psychology} from '@mui/icons-material'

import {Grid, GridItem} from './components/grid/Grid'
import {CardContent, Typography } from '@mui/material';

import {AppBar, Button, Toolbar} from '@mui/material';

import { Filter } from './views/filter';
import { DataTable } from './views/datatable';
import { PredictionView } from './views/prediction';
import ModelGraphs from './views/modelGraphs';

import { ThemeController } from './contexts/themecontext/ThemeContext';

function App() {
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState("model")
  const [isLandscape, setLandscape] = useState(document.body.clientHeight < document.body.clientWidth)

  window.addEventListener('resize', () => {
    setLandscape(document.body.clientHeight < document.body.clientWidth);
  });

  return (
    <ThemeController>
      <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>   
        <Toolbar>
         <Button sx={{"&:hover": {backgroundColor: "#2a3866"}}} color={page == "data" ? "secondary" : "inherit"} onClick={() => setPage("data")}><TableChart />&emsp;Data</Button>
         <Button sx={{"&:hover": {backgroundColor: "#2a3866"}}} color={page == "model" ? "secondary" : "inherit"} onClick={() => setPage("model")}><Psychology />&emsp;Ai Model</Button>
        </Toolbar>
      </AppBar>
      <Grid rows={isLandscape ? 2 : 4} columns={isLandscape ? 3: 1} gap={"1em"} style={{marginTop:"5%", height: "95%"}}>
        <GridItem x={1} width={1} y={1} height={isLandscape ? 2 : 1}>
          <Filter filter={filter} onChange={setFilter}/>
        </GridItem>
        {page == "data" &&
          <GridItem x={isLandscape ? 2 : 1} width={isLandscape ? 2 : 1} y={isLandscape ? 1 : 2} height={isLandscape ? 2 : 1}>
            <CardContent>
              <Typography variant="h3">Data results</Typography>
              <Typography>This is the used to search the data that our model is based on. Controlled
                by the filter you can verify real world data to further inform your house pricing
                decision.
              </Typography>
              <DataTable filter={filter}/>
            </CardContent>
          </GridItem>
        }
        {page == "model" &&
          <>
            <GridItem x={isLandscape ? 2 : 1} width={1} y={isLandscape ? 1 : 4} height={1}>
              <CardContent>
                <Typography variant="h3">AI Prediction</Typography>
                <PredictionView filter={filter}/>
              </CardContent>
            </GridItem>
            <GridItem x={isLandscape ? 3 : 1} width={1} y={isLandscape ? 1 : 3} height={1}>
              <CardContent>
                <Typography variant="h3">Usage</Typography>
                <Typography>
                    This is the AI model part of the data, this is influenced by real data however it is not
                    expected to reflect reality and any actions taken based on this data are at your own risk.
                    <hr/>
                    This contains two components, the AI model predictions and graphs. They both use the filter to make predictions.
                    <br/>
                    The Prediction uses a regression model to predict the expected house price based on the filter, 
                    and then uses a clustering model to classify how rare of a property it is.
                    <br/>
                    The graphs use the filter and generates variations to that filter to show how 
                    the price changes when different factors change, this can help with developing understanding of the
                    housing market.
                </Typography>
              </CardContent>
            </GridItem>
            <GridItem x={isLandscape ? 2 : 1} width={isLandscape ? 2 : 1} y={isLandscape ? 2 : 5} height={isLandscape ? 1: 2}>
              <CardContent>
                <Typography variant="h3">Graphs</Typography>
                <ModelGraphs filter={filter} isLandscape={isLandscape}/>
              </CardContent>
            </GridItem>
          </>
        }
      </Grid>
    </ThemeController>
  );
}

export default App;
