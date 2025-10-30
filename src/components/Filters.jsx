import React from 'react';

function Filters({ filters, onFilterChange }) {
    // Not: TVMaze API'si tür ve dil listesi vermediği için
    // PDF'teki senaryoya [cite: 31] uygun yaygın olanları manuel olarak ekliyoruz.
    const genres = ["All", "Drama", "Comedy", "Action", "Thriller", "Sci-Fi", "Fantasy"];
    const languages = ["All", "English", "Turkish", "Spanish", "French", "German"];

    return (
        <div className="filters">
            <label htmlFor="genre">Tür:</label>
            <select
                id="genre"
                value={filters.genre}
                onChange={(e) => onFilterChange({ genre: e.target.value })}
            >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <label htmlFor="language">Dil:</label>
            <select
                id="language"
                value={filters.language}
                onChange={(e) => onFilterChange({ language: e.target.value })}
            >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            <label htmlFor="rating">Min. Puan ({filters.rating}):</label>
            <input
                id="rating"
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={filters.rating}
                onChange={(e) => onFilterChange({ rating: parseFloat(e.target.value) })}
            />
        </div>
    );
}

export default Filters;