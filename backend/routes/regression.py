from fastapi import APIRouter, HTTPException
from schemas.regression import RegressionPredictionRequest, RegressionPredictionResponse
from models.regression import Regression

#router
router = APIRouter()

# prediction 
# Takes in a clustering request and returns a response object
# uses our prediction model
@router.post("/predict", response_model=RegressionPredictionResponse)
async def regression_predict(features: RegressionPredictionRequest):
    # if the instance doesnt exist then
    if Regression.instance is None:
        raise HTTPException(status_code=404, detail="regression instance does not exist")

    try:
        return Regression.instance.predict(features)
    except Exception as e: 
        raise HTTPException(status_code=500, detail="Something went wrong: " + str(e))


# Description route
# simple route that returns a description of the model
@router.get("/description", response_model=str)
async def regression_description():
    description = ("A linear regression model trained on real estate data capable of estimating the listing price of a "
                   "house based on the house's features.")
    return description
