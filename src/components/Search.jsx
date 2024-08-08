import { useState } from "react";

function Search ({searchHandler}){
    const [string, setString] = useState("")

    const handleSearch = (e) =>{
        setString(e.target.value);
        searchHandler(e.target.value)
    };

    return(
        <div className="search-container">
        <input
            type="text"
            value={string}
            onChange={handleSearch}
            placeholder="Search for skills"
            className="search-input"
        />
    </div>
    )
}

export default Search