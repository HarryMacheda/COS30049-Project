from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import clustering, regression, suburbs
from models.regression import Regression
from models.clustering import Clustering
from models.suburb_data import SuburbData
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load models
SuburbData.instance = joblib.load("./models/suburb_data.pkl")
Regression.instance = joblib.load("./models/regression_model.pkl")
Clustering.instance = joblib.load("./models/clustering_model.pkl")

# Define the routes
app.include_router(clustering.router, prefix="/clustering", tags=["Clustering"])
app.include_router(regression.router, prefix="/regression", tags=["Regression"])
app.include_router(suburbs.router, prefix="/suburbs", tags=["Suburbs Data"])
