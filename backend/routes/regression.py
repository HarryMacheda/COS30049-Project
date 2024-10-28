from fastapi import APIRouter, HTTPException
from schemas.regression import RegressionPredictionRequest, RegressionPredictionResponse
from models.regression import Regression

router = APIRouter()


@router.post("/predict", response_model=RegressionPredictionResponse)
async def regression_predict(features: RegressionPredictionRequest):
    if Regression.instance is None:
        raise HTTPException(status_code=404, detail="regression instance does not exist")

    return Regression.instance.predict(features)


@router.get("/description", response_model=str)
async def regression_description():
    description = "A linear regression model trained on real estate \
                    data capable of estimating the listing price of a \
                    house based on the house's features."
    return description
