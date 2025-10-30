import React, { useMemo } from 'react';
import TVCard from './TVCard';

function TVList({ shows, onAddToWatchlist, onShowDetail, watchlist }) {
    
    // Hangi kartların listede olduğunu hızlıca kontrol etmek için Set kullanıyoruz.
    const watchlistIds = useMemo(() => new Set(watchlist.map(item => item.id)), [watchlist]);

    return (
        <div className="tv-list">
            {shows.map(item => (
                <TVCard
                    key={item.show.id}
                    show={item.show}
                    onAddToWatchlist={() => onAddToWatchlist(item.show)}
                    onShowDetail={onShowDetail}
                    isInWatchlist={watchlistIds.has(item.show.id)}
                />
            ))}
        </div>
    );
}

export default TVList;