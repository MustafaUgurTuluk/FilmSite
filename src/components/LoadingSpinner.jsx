import React from 'react';

// [cite: 44]
function LoadingSpinner() {
    return (
        <div className="status-message">
            <div className="spinner"></div>
            Yükleniyor...
        </div>
    );
}

export default LoadingSpinner;