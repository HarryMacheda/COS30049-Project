from model import model
import pandas as pd
import os
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# This is the class for the regression model
class regression(model):
    def __init__(self, path):
        # read the data
        self.data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
        # define the features we want
        features = ['Longitude', 'Latitude', 'Beds', 'Baths', 'Parking', 'Type']

        # Scale the features
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # create a train the model
        self.model = LinearRegression()
        self.model.fit(scaled, self.data["Price"])

    def predict(self, input):
        # scale the imput then predict
        prediction = self.model.predict(self.scaler.transform(input))
        # return the prediction
        return str(prediction)

