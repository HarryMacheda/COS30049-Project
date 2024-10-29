from pydantic import BaseModel


class Suburb(BaseModel):
    Suburb: str
    State: str
    Postcode: int
    Longitude: float
    Latitude: float
