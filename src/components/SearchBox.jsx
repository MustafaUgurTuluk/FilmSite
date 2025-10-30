import React, { useState } from 'react';

function SearchBox({ initialQuery, onSearch }) {
    const [localQuery, setLocalQuery] = useState(initialQuery);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localQuery.trim()) {
            onSearch(localQuery.trim());
        }
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <label htmlFor="search">Dizi Ara:</label>
            <input
                id="search"
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Örn: The Office"
            />
            <button type="submit" className="btn-primary">Ara</button>
        </form>
    );
}

export default SearchBox;