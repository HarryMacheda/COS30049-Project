import pandas as pd
import os

# Suburbs class
# This is used to load suburbs data
# This allows the searching of the datasource
# for use in python.
class Suburbs:
    #Class varible which will store an instance of the class
    instance = ""

    # Initiation function
    # This liads the data and sets the class
    # instance variable
    def __init__(self, path):
        # Load the data
        data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
        # Remove duplicates
        data.drop_duplicates()
        self.data = data
        Suburbs.instance = self

    # Search function
    # This takes in a search parameter
    # and returns all suburbs matching
    def search(self, search):
        # Search suburb name
        mask =  self.data['Suburb'].str.lower().str.contains(search)
        # Seacrh the state
        mask |= self.data['State'].str.lower().str.contains(search)
        # Seach the postcode
        mask |= self.data['Postcode'].astype(str).str.contains(search)
        return self.data[mask]
    
    # Return the row corrosponding to the index
    def get(self, id):
        return self.data.iloc[int(id)]