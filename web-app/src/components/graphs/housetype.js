import { Skeleton, Typography } from "@mui/material";
import { useState, useEffect } from "react"
import APIClient from "../../api/client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar } from 'react-chartjs-2';

// Need to register the components chart js uses
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

// enum for the different options we will check
const HOUSE_TYPES = 
    {
        0: "House",
        1: "TownHouse",
        2: "Appartment",
        3: "Land",
        4: "Other",
    }

/*  This is the graph that displays different bed options
    IT goes through the enum and makes predictions
    It then populates the graph with those data points
*/
export function HouseTypeGraph({filter}){
    const [data, setData] = useState(null);

    const getAllPredictions = async () => {
        const predictions = await Promise.all(
            Object.keys(HOUSE_TYPES).map(async (x) => {
                const prediction = await getPrediction(x);
                if(prediction != null){
                    return { [x]: prediction };
                  }            
            })
          );
          
        const newData = predictions.reduce((acc, curr) => {
            if(acc != {}){
                return curr ? { ...acc, ...curr } : acc;
            }          
        }, {});
      
        if(Object.keys(newData).length > 0){
            setData(newData);
        }
    }

    const getPrediction = async (type) => {
        const input = {
            Longitude: filter.Suburb.Longitude,
            Latitude: filter.Suburb.Latitude,
            Beds: filter.Beds ? filter.Beds : 0,
            Baths: filter.Baths ? filter.Baths : 0,
            Parking: filter.Parks ? filter.Parks : 0,
            Type: type
        };

        let prediction = await APIClient.post("/regression/predict", input);
        if (prediction.error != null){
            return null;
        }
        return prediction;
    }

    useEffect(() => {
        if(filter != undefined  && filter != null && filter.Suburb != undefined && filter.Suburb != null)
        {
            getAllPredictions();
        }
        else {
            setData(null);
        }
    },[filter])

    // if we havent load any data show a loading animation
    if(data == null){
        return <>
             Enter a suburb to generate results...
            <Skeleton sx={{ fontSize: '10rem' }} animation={"wave"}></Skeleton>
        </>
    }

    const config = {
        type: 'bar',
        data: {
            labels: Object.values(HOUSE_TYPES),  
            datasets: [{
                label: 'Prices for different types',  
                data: Object.values(data).map(x => x.Prediction),  
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  
                borderColor: 'rgba(75, 192, 192, 1)',
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
        <>
            <Typography>House Type</Typography>
            <div style={{height: "200px"}}>
                <Bar data={config.data} options={config.options} />
            </div>
        </>
    )
}