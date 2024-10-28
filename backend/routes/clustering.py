from fastapi import APIRouter, HTTPException
from schemas.clustering import ClusteringPredictionRequest, ClusteringPredictionResponse
from models.clustering import Clustering

router = APIRouter()


@router.post("/predict", response_model=ClusteringPredictionResponse)
async def clustering_predict(features: ClusteringPredictionRequest):
    if Clustering.instance is not None:
        return Clustering.instance.predict(features)

    raise HTTPException(status_code=404, detail="Regression instance does not exist.")


@router.get("/description", response_model=str)
async def clustering_description():
    description = "A clustering model trained on housing data that \
                    groups properties into clusters based on their \
                    features, allowing for the identification of similar \
                    properties within each cluster for targeted analysis."
    return description
