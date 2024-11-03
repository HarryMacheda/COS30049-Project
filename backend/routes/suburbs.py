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
        raise HTTPException(status_code=404, detail="Suburbs instance does not exist")

    try:
        return SuburbData.instance.data
    except Exception as e:
        raise HTTPException(status_code=500, detail="Something went wrong: " + str(e))


# Returns all the houses for a specific suburb
# this is used to show users what data the model is trained on
@router.get("/{suburb}")
async def get_suburb(suburb: str):
    #filter the data where the subrub matches
    # orient them as records to they are a dictionary of all values
    if (DATA is None):
        raise HTTPException(status_code=404, detail="Data was not loaded")
    
    try:
        return DATA[DATA["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Something went wrong: " + str(e))
