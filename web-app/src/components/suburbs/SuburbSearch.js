import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";


export function SuburbSearch({ options, state })
{
    const [limit, setLimit] = useState(20); 

    if(options == null)
        return "";


    return(
        <>
            <Autocomplete 
              options={options}
              getOptionLabel={(option => option.Suburb)}
              filterOptions={(options = [], { inputValue }) => {
                        let results = options

                        //filter options based on selcted state
                        if(state != "")
                        {
                            results = results.filter((option) =>
                                option?.State?.toLowerCase() == state.toLowerCase()
                            )
                        }

                        //filter options based on the input
                        if (inputValue == "" || inputValue.length < 3)
                            //user hasn't searched return the first [limit] options
                            return results.slice(0, limit)
                        else 
                            results = results.filter((option) =>
                                option?.Suburb?.toLowerCase().includes(inputValue.toLowerCase())
                            )

                        return results;
                    }
                }
              renderInput={(params) => <TextField {...params} label="Suburb" />}
              isOptionEqualToValue = {(option,value) => {return option.Subrub == value.Suburb}}
            />
        </>
    )

}