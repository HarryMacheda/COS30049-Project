from fastapi import APIRouter, Depends, HTTPException
from models.suburb_data import SuburbData
from services.data import LoadDataTable

router = APIRouter()

DATA = LoadDataTable("./data/data.csv")


@router.get("/")
async def get_suburbs():
    # check if suburbs has loaded properly
    if SuburbData.instance is None:
        raise HTTPException(status_code=404, detail="suburbs instance does not exist")

    return SuburbData.instance.data


@router.get("/{suburb}")
async def get_suburb(suburb: str):
    return DATA[DATA["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")
