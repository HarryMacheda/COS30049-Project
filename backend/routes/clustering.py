from fastapi import APIRouter, HTTPException
from schemas.clustering import ClusteringPredictionRequest, ClusteringPredictionResponse
from models.clustering import Clustering

#router 
router = APIRouter()

# prediction 
# Taks in a clustering request and returns a response object
@router.post("/predict", response_model=ClusteringPredictionResponse)
async def clustering_predict(features: ClusteringPredictionRequest):
    # If we havent loaded the model the throw an error
    if Clustering.instance is not None:
        return Clustering.instance.predict(features)

    raise HTTPException(status_code=404, detail="Regression instance does not exist.")

# Description route
# simple route that returns a description of the model
@router.get("/description", response_model=str)
async def clustering_description():
    description = ("A clustering model trained on housing data that groups properties into clusters based on their "
                   "features, allowing for the identification of similar properties within each cluster for targeted "
                   "analysis.")
    return description
