import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

// SuburbSearch component to handle suburb selection with autocomplete and filtering options
export function SuburbSearch({ options, state, filter, onChange, nonce })
{
    // If no options are available, return an empty string
    if(options == null)
        return "";

    // Function to handle changes in the selected suburb value
    const handleChange = async (value) =>
    {
        // Update the filter with the new suburb value or null if not selected
        const newfilter = { ...filter, ["Suburb"]: value ? value : null };
        onChange(newfilter); // Trigger the onChange callback to update the parent component
    }

    return(
        <>
            <Autocomplete 
              key={nonce} // Ensures re-rendering when the nonce changes
              options={options} // List of suburb options to display
              getOptionLabel={(option => option.Suburb)} // Display the Suburb name in options
              filterOptions={(options = [], { inputValue }) => {
                        let results = options;

                        // Filter options based on the selected state
                        if(state != "")
                        {
                            results = results.filter((option) =>
                                option?.State?.toLowerCase() == state.toLowerCase()
                            )
                        }

                        // Further filter options based on user input
                        if (inputValue == "" || inputValue.length < 3)
                            // If the user has not typed enough, return only the first 20 options
                            return results.slice(0, 20)
                        else 
                            // Filter options to match user input
                            results = results.filter((option) =>
                                option?.Suburb?.toLowerCase().includes(inputValue.toLowerCase())
                            )

                        return results;
                    }
                }
              renderInput={(params) => <TextField {...params} label="Suburb" />} // Input field with a label
              isOptionEqualToValue = {(option,value) => {return option.Suburb == value.Suburb}} // Check if the selected option matches the input value
              onChange={(event, newValue) => handleChange(newValue)} // Handle suburb selection
            />
        </>
    )
}
