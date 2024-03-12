import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL,geoOptions } from "../geoapi";

function SearchBar({OnInputChange}){

    const [input, setInput]=useState(null);

    const getSuggestions = async (inputValue) => {
        try {
          const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoOptions
          );
          
          const data = await response.json();
          
          return {
            options: data.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: city.name,
              id:city.wikiDataId,
              countryID:city.countryCode,
            })),
          };
        } catch (error) {
          // Handle error
          console.error('Error fetching suggestions: ', error);
          return { options: [] }; // Return empty options array in case of error
        }
      };
      
    
      const handleOnChange = (searchData) => {
        console.log(searchData);
        setInput(searchData);
        OnInputChange(searchData);
      };


    return (
        <AsyncPaginate
          placeholder="Enter your destination"
          debounceTimeout={600}
          value={input}
          loadOptions={getSuggestions}
          onChange={handleOnChange}
          
        />
      );
}

export default SearchBar;