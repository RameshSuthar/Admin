import { useState } from "react";
import './Search.css';

const Search = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const [showCloseBtn, setShowCloseBtn] = useState(false);

    const handleOnChange = (e) => {
        setQuery(e.target.value);
        if(e.target.value === '') {
            onSearch('');
            setShowCloseBtn(false)
        }
    }

    const handleRemoveFilter = () => {
        onSearch(' ');
        setQuery('');
        setShowCloseBtn(false);
    }

    const handleOnEnter = (e) => {
        if(e.key === "Enter" && e.target.value !== '') {
            onSearch(e.target.value.toLowerCase());
            setShowCloseBtn(true);
        }
    }

    return (
        <div className="Search-wrapper">
            <input type="text" name="search" value={query} onChange={handleOnChange} onKeyUp={handleOnEnter} placeholder="search by name/email or role and press enter."></input>
            {showCloseBtn && <p className="Search-remove-filter-btn" onClick={handleRemoveFilter}>x</p>}
        </div>
    )
}

export default Search;