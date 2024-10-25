from utility.data import LoadDataTable
import pandas as pd
from pydantic import BaseModel
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from fastapi import HTTPException
import joblib

#regression model
class clusteringPrediction(BaseModel):
    Prediction: str

class clusteringInput(BaseModel):
    Longitude: float
    Latitude: float
    Beds: int
    Baths: int
    Parking: int
    Type: int


class Cluster():

    instance = None

    def __init__(self, path):
        # read the data
        self.data = LoadDataTable(path)
        # define the features we care abput
        features = ['Longitude', 'Latitude', 'Beds', 'Baths', 'Parking', 'Type']

        # scale the features
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # create and train the model
        self.model = KMeans(n_clusters=10, random_state=42)
        clusters = self.model.fit_predict(scaled)
        clusters = list(set(clusters))

        # get the amount of properties in each cluster
        cluster_counts = pd.Series(clusters).value_counts()

        self.clusters = [{'cluster': c, 'count': count} for c, count in zip(clusters,cluster_counts)]

        # sort the clusters by counts
        self.clusters = sorted(self.clusters, key=lambda x: x['count'])

        # Define the names of clusters
        names = [
            "Everywhere",
            "Abundant",
            "Common",
            "Uncommon",
            "Rare",
            "Very Rare",
            "limited",
            "Scarce",
            "Unique",
            "1 in a million",
        ]

        # set the clusters name based on order
        for obj, value in zip(self.clusters, names):
            obj['name'] = value

        joblib.dump(self, 'clustering_model.pkl')
        Cluster.instance = self

    # predict the cluster for a give input
    def predict(self, input):
        # get the cluster
        prediction = self.model.predict(self.scaler.transform(pd.DataFrame([input.dict()])))
        for cluster in self.clusters:
            # find the name for the give cluster
            if cluster.get('cluster') == prediction:
                return clusteringPrediction(Prediction = (cluster.get('name')))
            
        raise HTTPException(status_code=500, detail="Could not find cluster for prediction")