from pydantic import BaseModel

#Types for the clustering model

# class for the request
class ClusteringPredictionRequest(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int

# Class for the reponse
class ClusteringPredictionResponse(BaseModel):
    Prediction: str
