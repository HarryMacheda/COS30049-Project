from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import suburbs,clustering,regression,data
from models import SuburbData
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Set up required variables
 
subrubData = SuburbData.SuburbData(os.path.dirname(os.path.abspath(__file__)) + "/data/suburbs.csv")
regressionModel = regression.regression(os.path.dirname(os.path.abspath(__file__)) + "/data/data.csv")
clusterModel = clustering.Cluster(os.path.dirname(os.path.abspath(__file__)) + "/data/data.csv")


# Define the routes
app.include_router(suburbs.router, prefix="/suburbs", tags=["data, suburbs"])
app.include_router(clustering.router, prefix="/clustering", tags=["model, clustering"])
app.include_router(regression.router, prefix="/regression", tags=["model, regression"])
app.include_router(data.router, prefix="/data", tags=["data"])