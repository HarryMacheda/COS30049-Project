from services.data import LoadDataTable
import joblib


# Suburbs class
# This is used to load suburbs data
# This allows the searching of the datasource
# for use in python.
class SuburbData:
    # Class variable which will store an instance of the class
    instance = None

    # Initiation function
    # This loads the data and sets the class
    # instance variable
    def __init__(self, path):
        # Load the data
        data = LoadDataTable(path)

        # set data types
        data["Suburb"] = data["Suburb"].astype(str)
        data["State"] = data["State"].astype(str)
        data["Postcode"] = data["Postcode"].astype(int)
        data["Longitude"] = data["Longitude"].astype(float)
        data["Latitude"] = data["Latitude"].astype(float)

        self.data = data.to_dict(orient="records")

        joblib.dump(self, 'suburb_data.pkl')
        SuburbData.instance = self
