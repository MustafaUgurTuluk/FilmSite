import React from 'react';

function WatchlistPanel({ watchlist, onRemove, onClear }) {
    return (
        <aside className="sidebar">
            <h3>Gösterime Girecekler</h3>
            {watchlist.length === 0 ? (
                <p>Listeniz boş.</p>
            ) : (
                <>
                    {watchlist.map(item => (
                        <div key={item.id} className="watchlist-item">
                            <span>{item.name}</span>
                            <button 
                                className="btn-danger"
                                onClick={() => onRemove(item.id)}
                            >
                                Kaldır
                            </button>
                        </div>
                    ))}
                    <button
                        className="btn-danger"
                        style={{ width: '100%', marginTop: '10px' }}
                        onClick={onClear}
                    >
                        Tümünü Temizle
                    </button>
                </>
            )}
        </aside>
    );
}

export default WatchlistPanel;