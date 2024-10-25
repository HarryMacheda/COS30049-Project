from utility.data import LoadDataTable
from pydantic import BaseModel
import joblib

#Suburb model
class suburb(BaseModel):
    Suburb: str
    State: str
    Postcode: int
    Longitude: float
    Latitude: float



# Suburbs class
# This is used to load suburbs data
# This allows the searching of the datasource
# for use in python.
class SuburbData:
    #Class varible which will store an instance of the class
    instance = None

    # Initiation function
    # This loads the data and sets the class
    # instance variable
    def __init__(self, path):
        # Load the data
        data = LoadDataTable(path)

        #set data types
        data["Suburb"] =  data["Suburb"] .astype(str)
        data["State"] = data["State"].astype(str)
        data["Postcode"] = data["Postcode"].astype(int)
        data["Longitude"] = data["Longitude"].astype(float)
        data["Latitude"] = data["Latitude"].astype(float)


        self.data = data.to_dict(orient="records")

        joblib.dump(self, 'suburb_data.pkl')
        SuburbData.instance = self