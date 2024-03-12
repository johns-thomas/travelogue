import React, { useState, useEffect } from 'react';

import { CURRENCY_URL } from '../../currencyapi';
import { GEO_API_URL,geoOptions } from "../../geoapi";


const CurrencyWidget = ({ countryCode }) => {
  const [currencyData, setCurrencyData] = useState(null);
  const [CountryCodeData, setCountryCodeData] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        
        const fetchCountryCode=await fetch(`https://wft-geo-db.p.rapidapi.com/v1/locale/currencies?countryId=${countryCode}`,geoOptions)
        const fetchCountryCodeData = await fetchCountryCode.json();
        console.log(fetchCountryCodeData)
        setCountryCodeData(fetchCountryCodeData);


        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${CURRENCY_URL}&base=USD`);
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
        const data = await response.json();
        setCurrencyData(data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, []);

  if (!currencyData) {
    return <div>Loading...</div>;
  }
console.log(currencyData)
  let currencyCode = countryCode === 'US' ? 'USD' : countryCode; // Assuming the default currency is USD
  currencyCode=CountryCodeData.data[0].code;
  const currencyRate = currencyData.rates[currencyCode];
  const currencySymbol = getCurrencySymbol(currencyCode);

  return (
    <div>
      <h3>Currency</h3>
      <p>Country: {countryCode}</p>
      <p>Exchange Rate: {currencyRate} {currencySymbol}</p>
    </div>
  );
};

const getCurrencySymbol = (currencyCode) => {
  // You may need to extend this function to support more currencies
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    // Add more currency symbols as needed
    default:
      return currencyCode;
  }
};

export default CurrencyWidget;
