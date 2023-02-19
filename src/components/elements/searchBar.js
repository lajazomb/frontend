import React, {useState} from 'react'


const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        // do the searching here
    }

    return <div>
        <input
            type="search"
            placeholder="Search here..."
            onChange={handleChange}
            value={searchInput} />
    </div>


};

export default SearchBar;