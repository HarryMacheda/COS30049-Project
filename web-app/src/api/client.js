
// Url for the fast api server running the backend
const API_URL = "http://127.0.0.1:8000"

export default class APIClient {

    //Wrapper functions over the fetch api
    static async get(path)
    {
        try 
        {
            const response = await fetch(API_URL + path);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            return json;
        } catch (error) 
        {
            return {error: error.message}
        }
    }
}