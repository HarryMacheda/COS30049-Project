from fastapi import APIRouter, HTTPException
from utility.data import LoadDataTable
import os

router = APIRouter()

DATA = LoadDataTable(os.path.dirname(os.path.abspath(__file__)) + "/../data/data.csv")


@router.get("/suburb/{suburb}")
async def getSuburb(suburb: str):
    return DATA[DATA["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")



