import React, { memo } from 'react';

// 'memo' kullanarak gereksiz render'ları önlüyoruz.
const TVCard = memo(({ show, onAddToWatchlist, onShowDetail, isInWatchlist }) => {
    
    const handleSummary = (summary) => {
        if (!summary) return "Özet bulunamadı.";
        return summary.replace(/<[^>]+>/g, '');
    };

    const image = show.image?.medium || "https://via.placeholder.com/210x295?text=Poster+Yok";
    
    return (
        <div className="tv-card">
            <img src={image} alt={show.name} />
            <div className="tv-card-content">
                <h3>{show.name}</h3>
                <div className="tv-card-info">
                    <span>{show.genres?.join(', ') || 'N/A'} | </span>
                    <span>{show.language || 'N/A'} | </span>
                    <span>Puan: {show.rating?.average || 'N/A'}</span>
                </div>
                <p className="tv-card-summary">
                    {handleSummary(show.summary)}
                </p>
                <div className="tv-card-actions">
                    <button 
                        className="btn-secondary" 
                        onClick={() => onShowDetail(show.id)} 
                    >
                        Detay
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => onAddToWatchlist(show)}
                        disabled={isInWatchlist}
                    >
                        {isInWatchlist ? 'Listede' : 'Listeye Ekle'}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default TVCard;