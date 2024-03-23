import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoOptions } from "../geoapi";

function SearchBar({ OnInputChange }) {

  const [input, setInput] = useState(null);

  const getSuggestions = async (inputValue) => {
    try {
      if (!inputValue) {
        // If inputValue is not set, return empty options array
        return { options: [] };
      }
      const url = `https://booking-com18.p.rapidapi.com/stays/auto-complete?query=${inputValue}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4b885ecdb1msh6f39e2f29a6ea62p16c894jsn8b6172e49dd6',
          'X-RapidAPI-Host': 'booking-com18.p.rapidapi.com'
        }
      };
      const response = await fetch(url,options
        //`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
       // geoOptions
      );

      const data = await response.json();

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: city.label,
          id: city.id,
          country: city.country,
          image_url:city.image_url,
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