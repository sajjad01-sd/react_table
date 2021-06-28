import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ filter , setFilter }) => {
    const [value,setValue] = useState(filter);
    // If data will more and more increase the milisecond to 2000 or 3000
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <span>
            Search: {' '}
            <input value={value || null} onChange={(e) => { setValue(e.target.value); onChange(e.target.value)}} />
        </span>
    )
}