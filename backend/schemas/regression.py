from pydantic import BaseModel

# classes for the regression model

# request model used for input into the model
class RegressionPredictionRequest(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int

# class used for the prediction response
class RegressionPredictionResponse(BaseModel):
    Prediction: float
