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
                        //user hasnt searched return the first [limit] options
                        if (inputValue == "" || inputValue.length < 3)
                            return options.slice(0, limit)

                        //filter options based on the input
                        let results = options.filter((option) =>
                            option?.Suburb?.toLowerCase().includes(inputValue.toLowerCase())
                        )

                        if(state != "")
                        {
                            results = results.filter((option) =>
                                option?.State?.toLowerCase() == state.toLowerCase()
                            )
                        }
                        return results;
                    }
                }
              renderInput={(params) => <TextField {...params} label="Suburb" />}
              isOptionEqualToValue = {(option,value) => {return option.Subrub == value.Suburb}}
            />
        </>
    )

}