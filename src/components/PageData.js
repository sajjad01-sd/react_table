import React, { useState } from 'react'

export default function PageData({setPageSize, pageSize}) {
    const [value,setValue] = useState(pageSize)
    const onChange = () => {
        if(value === null || undefined || '') {
            setValue(10)
        }
        setPageSize(value)
    }
    
    return (
        <div>
            <input type="number" value={value || ''} onChange={(e) => {setValue(e.target.value); onChange()}}/>
        </div>
    )
}
