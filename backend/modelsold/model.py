from abc import ABC, abstractmethod

#This is an abstract class for a model
#All models will inherit so we can use it in the same way
class model(ABC):
    # Initication function for createing an insatce
    @abstractmethod
    def __init__(self, data):
        pass

    # Takes an input and outputs a prediction
    @abstractmethod
    def predict(self, input):
        pass

