from fastapi import APIRouter, Depends, HTTPException
from models.suburb_data import SuburbData
from services.data import LoadDataTable

#router
router = APIRouter()

#Load the data from teh csv into a datatable
DATA = LoadDataTable("./data/data.csv")

# Get route 
# returns all the suburbs we have
@router.get("/")
async def get_suburbs():
    # check if suburbs has loaded properly
    if SuburbData.instance is None:
        raise HTTPException(status_code=404, detail="suburbs instance does not exist")

    return SuburbData.instance.data

# Returns all the houses for a specific suburb
# this is used to show users what data the model is trained on
@router.get("/{suburb}")
async def get_suburb(suburb: str):
    #filter the data where the subrub matches
    # orient them as records to they are a dictionary of all values
    return DATA[DATA["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")
