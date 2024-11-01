from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import clustering, regression, suburbs
from models.regression import Regression
from models.clustering import Clustering
from models.suburb_data import SuburbData
import joblib

# Main file
# this is the starting point of the application
# it creates the fast api sets the middleware
# it also sets the routes the applcotion


app = FastAPI()

# Our cors middleware since the webapp is hosted on a seperate host
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #allow any origin
    allow_credentials=True,
    allow_methods=["*"], # allow any method post,get ect
    allow_headers=["*"], # allow any headers, we dont use them but still works
)


# Load models
SuburbData.instance = joblib.load("./models/suburb_data.pkl")
Regression.instance = joblib.load("./models/regression_model.pkl")
Clustering.instance = joblib.load("./models/clustering_model.pkl")

# Define the routes
app.include_router(clustering.router, prefix="/clustering", tags=["Clustering"])
app.include_router(regression.router, prefix="/regression", tags=["Regression"])
app.include_router(suburbs.router, prefix="/suburbs", tags=["Suburbs Data"])
