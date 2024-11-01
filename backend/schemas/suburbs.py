from pydantic import BaseModel

# Suburb class
class Suburb(BaseModel):
    Suburb: str
    State: str
    Postcode: int
    Longitude: float
    Latitude: float
