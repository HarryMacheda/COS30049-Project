import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";


export function SuburbSearch({ options, state, filter, onChange, nonce })
{
    if(options == null)
        return "";

    const  handleChange = async (value) =>
    {
        const newfilter = { ...filter, ["Suburb"]: value ? value : null };
        onChange(newfilter);
    }



    return(
        <>
            <Autocomplete 
              key={nonce}
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
                            return results.slice(0, 20)
                        else 
                            results = results.filter((option) =>
                                option?.Suburb?.toLowerCase().includes(inputValue.toLowerCase())
                            )

                        return results;
                    }
                }
              renderInput={(params) => <TextField {...params} label="Suburb" />}
              isOptionEqualToValue = {(option,value) => {return option.Suburb == value.Suburb}}
              onChange={(event, newValue) => handleChange(newValue)}
            />
        </>
    )

}