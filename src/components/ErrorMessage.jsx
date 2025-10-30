import React from 'react';

// [cite: 45]
function ErrorMessage({ onRetry }) {
    return (
        <div className="status-message">
            <p>Veri çekilirken bir hata oluştu.</p>
            <button className="btn-primary" onClick={onRetry}>Tekrar Dene</button>
        </div>
    );
}

export default ErrorMessage;