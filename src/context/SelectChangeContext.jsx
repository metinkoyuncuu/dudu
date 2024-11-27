import React, { createContext, useContext } from 'react';

const SelectChangeContext = createContext();

export function SelectChangeProvider({ children }) {
    const handleSelectChange = (event) => {
        console.log('Selected value:', event);
    };

    return (
        <SelectChangeContext.Provider value={handleSelectChange}>
            {children}
        </SelectChangeContext.Provider>
    );
}

export function useSelectChange() {
    return useContext(SelectChangeContext);
}
