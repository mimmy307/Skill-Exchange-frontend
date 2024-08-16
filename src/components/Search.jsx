import { useState } from "react";
import "./Search.css"
import { TextInput, rem } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';

function Search ({searchHandler}){
    const [string, setString] = useState("")

    const handleSearch = (e) =>{
        setString(e.target.value);
        searchHandler(e.target.value)
    };


    return(
        <div className="search-container">
        <TextInput
            value={string}
            onChange={handleSearch}
            placeholder="Search for skills"
            className="search-input"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        />
    </div>
    )
}

export default Search