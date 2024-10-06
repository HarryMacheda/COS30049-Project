from model import model
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
import os

# This is the class for the clustering model
class Cluster(model):
    def __init__(self, path):
        # read the data
        self.data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
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

    # predict the cluster for a give input
    def predict(self, input):
        # get the cluster
        prediction = self.model.predict(self.scaler.transform(input))
        for cluster in self.clusters:
            # find the name for the give cluster
            if cluster.get('cluster') == prediction:
                return (cluster.get('name'))
         