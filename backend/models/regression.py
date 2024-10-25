from utility.data import LoadDataTable
import pandas as pd
from pydantic import BaseModel
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import joblib

#regression model
class regressionPrediction(BaseModel):
    Prediction: float

class regressionInput(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int


class regression():
    instance = None

    def __init__(self, path):
        # read the data
        self.data = LoadDataTable(path)
        # define the features we want
        features = ['Longitude', 'Latitude', 'Beds', 'Baths', 'Parking', 'Type']

        # Scale the features
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # create a train the model
        self.model = LinearRegression()
        self.model.fit(scaled, self.data["Price"])
        joblib.dump(self, 'regression_model.pkl')
        regression.instance = self

    def predict(self, input):
        # scale the imput then predict
        prediction = self.model.predict(self.scaler.transform( pd.DataFrame([input.dict()])))
        # return the prediction
        return regressionPrediction(Prediction = float(prediction[0]))