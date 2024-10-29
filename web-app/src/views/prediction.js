import { useState, useEffect } from "react";
import APIClient from '../api/client'
import { Slider } from "@mui/material";
import styles from './prediction.module.css'

// Utility function to convert large numbers into human-readable formats 
function getPrettyNumber(number){
    const integer = Math.floor(number);
    if (integer >= 1_000_000_000) {
        return `${(integer / 1_000_000_000).toFixed(2)} billion`;
    } else if (integer >= 1_000_000) {
        return `${(integer / 1_000_000).toFixed(2)} million`;
    } else if (integer >= 1_000) {
        return `${(integer / 1_000).toFixed(2)} thousand`;
    } else if (integer >= 100) {
        return `${(integer / 1_000).toFixed(2)} hundred`;
    } else {
        return integer.toString();
  }
}

// PredictionView component for displaying property price prediction and scarcity level
export function PredictionView({ filter })
{
    // State for regression (price prediction) and clustering (scarcity level)
    const [regression, setRegression] = useState(null);
    const [clustering, setClustering] = useState(null);

    // Function to load predictions based on filter input
    const LoadPrediction = async () => {
        // Prepare the input for prediction API using values from the filter
        const input = {
            Longitude: filter.Suburb.Longitude,
            Latitude: filter.Suburb.Latitude,
            Beds: filter.Beds ? filter.Beds : 0,
            Baths: filter.Baths ? filter.Baths : 0,
            Parking: filter.Parks ? filter.Parks : 0,
            Type: filter.Type ? filter.Type : 0
        }

       // Fetch price prediction from regression API
        APIClient.post("/regression/predict", input).then((response) => {
            setRegression(response.Prediction);
        });
        
        // Fetch scarcity level from clustering API
        APIClient.post("/clustering/predict", input).then((response) => {
            // Define scarcity ranking order
            const clusters = {
                "Everywhere":0,
                "Abundant":1,
                "Common":2,
                "Uncommon":3,
                "Rare":4,
                "Very Rare":5,
                "limited":6,
                "Scarce":7,
                "Unique":8,
                "1 in a million":9,
            }

            setClustering({cluster: response.Prediction, order:clusters[response.Prediction] });        
        });

    }

    // Load predictions when a valid filter with a suburb is provided
    useEffect(() => {
        if(filter != undefined  && filter != null && filter.Suburb != undefined && filter.Suburb != null)
        {
            LoadPrediction()
        }
      },[filter]);

    // Display message if no suburb information is available in the filter
    if (filter.Suburb == undefined || filter.Suburb == null){
        return <>Unable to make prediction for the given filter. Please enter a Suburb.</>
    }
    // Display message if predictions could not be retrieved
    if (regression == null && clustering == null){
        return <>Unable to make prediction for the given filter. Try updating the filter to re-predict.</>
    }

    // Render price prediction and scarcity level
    return (
        <>
            {regression && 
            <p className={styles.PriceDisplay}>${getPrettyNumber(regression)}</p>}
            {clustering && <div key={clustering.cluster}>
                <span>{clustering.cluster}</span>
                {/* Slider representing the scarcity level (disabled for display purposes) */}
                <Slider defaultValue={clustering.order} step={1} marks min={0} max={9} disabled />
                <div className={styles.scarcityIndicator}></div>
                <span className={styles.floatLeft}>&lt;----more common</span> <span className={styles.floatRight}>Less common----&gt;</span>
            </div>}
        </>
    )

}
