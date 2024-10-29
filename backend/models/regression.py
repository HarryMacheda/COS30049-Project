from services.data import LoadDataTable
from schemas.regression import RegressionPredictionResponse
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import joblib


class Regression:
    instance = None

    def __init__(self, path):
        # Read the data
        self.data = LoadDataTable(path)
        # define the features we want
        features = ['Longitude', 'Latitude', 'Beds', 'Baths', 'Parking', 'Type']

        # Scale the features
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # Create and train the model
        self.model = LinearRegression()
        self.model.fit(scaled, self.data["Price"])
        joblib.dump(self, 'regression_model.pkl')
        Regression.instance = self

    def predict(self, input):
        # scale the input then predict
        prediction = self.model.predict(self.scaler.transform( pd.DataFrame([input.dict()])))
        # return the prediction
        return RegressionPredictionResponse(Prediction = float(prediction[0]))