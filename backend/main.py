from typing import Union

from fastapi import FastAPI

from controllers import suburbs,clustering,regression
from models import SuburbData
import os

app = FastAPI()

# Set up required variables
 
subrubData = SuburbData.SuburbData(os.path.dirname(os.path.abspath(__file__)) + "/data/suburbs.csv")
regressionModel = regression.regression(os.path.dirname(os.path.abspath(__file__)) + "/data/data.csv")
clusterModel = clustering.Cluster(os.path.dirname(os.path.abspath(__file__)) + "/data/data.csv")


# Define the routes
app.include_router(suburbs.router, prefix="/suburbs", tags=["data, suburbs"])
app.include_router(clustering.router, prefix="/clustering", tags=["model, clustering"])
app.include_router(regression.router, prefix="/regression", tags=["model, regression"])