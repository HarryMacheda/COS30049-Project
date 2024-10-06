import pandas as pd


# Utility file to load data from csvs

def LoadDataTable(path, features = []):
    # Load the data
    data = pd.read_csv(path) 

    # Do some cleaning
    data = data.drop_duplicates()
    data = data.dropna()

    ## strip whitespace
    data.columns = data.columns.str.strip()  
    data = data.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    # only return the features we want
    if (features != []):
        data = data[features]

    return data