import React from 'react';

const Search = ({onChange}) => {

    return (
        <form onChange={onChange} >
            <label>Search: 
                <input type="text" />
            </label>
        </form>
        
    )}


export default Search;
