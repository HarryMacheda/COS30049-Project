from fastapi import APIRouter, HTTPException
from models.SuburbData import suburb,SuburbData


router = APIRouter()

@router.get("/", response_model=list[suburb])
async def getSuburbs():
    # check if suburbs has loaded properly
    if SuburbData.instance == None:
        raise HTTPException(status_code=404, detail="suburbs instance does not exist")
    
    return SuburbData.instance.data

