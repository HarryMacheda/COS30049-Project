
// Url for the fast api server running the backend
const API_URL = "http://127.0.0.1:8000"

//This is a class used to communicate with backend
export default class APIClient {

    //Wrapper functions over the fetch api
    static async get(path)
    {
        try 
        {
            const response = await fetch(API_URL + path);

            const json = await response.json();

            if (!response.ok) {
                throw new Error(`Response status: ${response.status} ${json.detail ? json.detail : ""}`);
            }
        
            return json;
        } catch (error) 
        {
            return {error: error.message}
        }
    }

    static async post(path, body)
    {
        try 
        {

            const response = await fetch(API_URL + path, {
                method: "post",
                // sets some default headers to ensure format is correct
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const json = await response.json();

            if (!response.ok) {
              throw new Error(`Response status: ${response.status} ${json.detail ? json.detail : ""}`);
            }
        
            return json;
        } catch (error) 
        {
            return {error: error.message}
        }
    }
}