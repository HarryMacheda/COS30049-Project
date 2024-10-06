from fastapi import APIRouter, HTTPException
from models.regression import regressionPrediction, regressionInput, regression

router = APIRouter()

@router.post("/predict", response_model=regressionPrediction)
async def predict(input: regressionInput):
    if regression.instance == None:
        raise HTTPException(status_code=404, detail="regression instance does not exist")
    
    print(regression.instance.predict(input))

    return regression.instance.predict(input)