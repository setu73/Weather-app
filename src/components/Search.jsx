import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from '../apikeys';
const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        }
                    })
                }
            })
            //.catch(err => console.log(err));
    }
    const handleOnchange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const handleOnBlur = () => {
        if (search) {
          setSearch(null);
        }
      };
    
    return (
        <div className='search'>
        <AsyncPaginate
            placeholder='Search for city'
            debounceTimeout={600}
            value={search}
            onChange={handleOnchange}
            loadOptions={loadOptions}
            onBlur={handleOnBlur}
        />
        </div>
    )
}

export default Search