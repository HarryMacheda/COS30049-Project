import { useState, useEffect } from "react";
import APIClient from '../api/client'
import { Slider } from "@mui/material";
import styles from './prediction.module.css'

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



export function PredictionView({ filter })
{
    const [regression, setRegression] = useState(null);
    const [clustering, setClustering] = useState(null);

    const LoadPrediction = async () => {
        //Load the prediction based on the filter 
        const input = {
            Longitude: filter.Suburb.Longitude,
            Latitude: filter.Suburb.Latitude,
            Beds: filter.Beds ? filter.Beds : 0,
            Baths: filter.Baths ? filter.Beds : 0,
            Parking: filter.Parks ? filter.Parks : 0,
            Type: filter.Type ? filter.Type : 0
        }

       //get predictions
        APIClient.post("/regression/predict", input).then((response) => {
            setRegression(response.Prediction);
        });
        APIClient.post("/clustering/predict", input).then((response) => {
            //get the ranking of the cluster
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

    useEffect(() => {
        if(filter != undefined  && filter != null && filter.Suburb != undefined && filter.Suburb != null)
        {
            LoadPrediction()
        }
      },[filter]);


    if (filter.Suburb == undefined || filter.Suburb == null){
        return <>Unable to make prediction for the given filter. Please enter a Suburb.</>
    }
    if (regression == null && clustering == null){
        return <>Unable to make prediction for the given filter. Try updating the filter to re-predict.</>
    }

    return (
        <>
            {regression && 
            <p className={styles.PriceDisplay}>${getPrettyNumber(regression)}</p>}
            {clustering && <div key={clustering.cluster}>
                <span>{clustering.cluster}</span>
                <Slider defaultValue={clustering.order} step={1} marks min={0} max={9} disabled />
                <div className={styles.scarcityIndicator}></div>
                <span className={styles.floatLeft}>&lt;----more common</span> <span className={styles.floatRight}>Less common----&gt;</span>
            </div>}
        </>
    )

}