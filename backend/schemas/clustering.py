from pydantic import BaseModel


class ClusteringPredictionRequest(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int


class ClusteringPredictionResponse(BaseModel):
    Prediction: str
