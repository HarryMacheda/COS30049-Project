from pydantic import BaseModel


class RegressionPredictionRequest(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int


class RegressionPredictionResponse(BaseModel):
    Prediction: float
