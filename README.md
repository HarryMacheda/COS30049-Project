# Welcome
This is our complete full stack web application!

Below is some instructions on how to run our application

# Running the application
## Step 1: Prerequisites
We need to make sure we have the requied software (and versions) installed on our machine.
### Python 3.9+
Check if Python is installed by running:
```bash 
python3 --version 
```
If it's not installed, download it from [Python's official website](https://www.python.org/downloads/).

### Node.js
Check if Node.js is installed by running:
```bash 
node --version
```
If it's not installed, download it from [Node.js official website](https://nodejs.org/en).

### Virtual Environment (optional)
Create a virtual environment for Python dependencies, this ensures all the dependencies are stored against the project rather than directly on your machine this makes it easier to unistall unessecary libraries once you are completed with that project.
```bash 
python3 -m venv ~/myenv
source ~/myenv/bin/activate
```
## Step 2: Backend Setup (FastAPI)
First to run the api we will need to install FastAPi and Uvicorn
```bash 
    pip install fastapi uvicorn
```
To start the application we need to cd into the backend directory
```bash 
    cd backend
```
Once in we can start the server with our backend by running
```bash
    uvicorn main:app –reload
```
or
```bash
    fastapi dev main.py
```
To run in development mode.

This will run the application on the local machine at port 8000.
```http://127.0.0.1:8000```

## Step 3: Frontend Setup
We now need to cd into the frout end directory, 
```bash 
    cd web-app
```
We now need to install the project dependencies.
```bash 
    npm install
```
This uses npm the package manager built into node.js in order to get all the required packages.

Once everything is installed we can run 
```bash 
    npm start
```
which will start the application on our local machine on port 3000 ```http://localhost:3000``` by default
## Step 4: Testing 
### Backend
Open a web browser and go to http://127.0.0.1:8000/docs to access the automatically generated FastAPI documentation using swagger.
### Frontend
Go to http://localhost:3000 to see the web application running.
