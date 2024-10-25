import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react"
import APIClient from "../../api/client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineController,
    LineElement,
  } from "chart.js";
import { Line }  from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineController,
    LineElement,
  );

const HOUSE_BEDS = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
    }


export function HouseBedsGraph({filter}){
    const [data, setData] = useState(null);

    const getAllPredictions = async () => {
        const predictions = await Promise.all(
          Object.keys(HOUSE_BEDS).map(async (x) => {
              const prediction = await getPrediction(x);
              return { [x]: prediction };
          })
        );
    
        const newData = predictions.reduce((acc, curr) => {
          return curr ? { ...acc, ...curr } : acc;
        }, {});
    
        setData(newData);
    };
    
    const getPrediction = async (beds) => {
        const input = {
            Longitude: filter.Suburb.Longitude,
            Latitude: filter.Suburb.Latitude,
            Beds: beds,
            Baths: filter.Baths ? filter.Baths : 0,
            Parking: filter.Parks ? filter.Parks : 0,
            Type: filter.Type ? filter.Type : 0,
        };

        let prediction = await APIClient.post("/regression/predict", input);
        return prediction;
    };
    

    useEffect(() => {
        if(filter != undefined  && filter != null && filter.Suburb != undefined && filter.Suburb != null)
        {
            getAllPredictions();
        }
    },[filter])



    if(data == null){
        return <>
             Enter a suburb to generate results...
            <Skeleton sx={{ fontSize: '10rem' }} animation={"wave"}></Skeleton>
        </>
    }

    const config = {
        type: 'line',
        data: {
            labels: Object.values(HOUSE_BEDS),  
            datasets: [{
                label: 'Different number of beds',  
                data: Object.values(data).map(x => x.Prediction),  
                backgroundColor: 'rgba(192, 75, 192, 0.2)',  
                borderColor: 'rgba(192, 75, 192, 1)',
                borderWidth: 1 
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Price (100,000s)'  // Axis title
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, ticks) {
                            return Math.floor(value / 100000);
                        }
                    }
                }
            }
        }
    }

    return (
        <div style={{height: "200px", width:"100%"}}>
            <Line data={config.data} options={config.options} />
        </div>
    )
}