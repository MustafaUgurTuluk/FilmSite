import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    
    const handleFirst = () => onPageChange(1);
    const handlePrev = () => onPageChange(currentPage - 1);
    const handleNext = () => onPageChange(currentPage + 1);
    const handleLast = () => onPageChange(totalPages);

    return (
        <div className="pagination">
            {/* PDF'te istenen navigasyon tuşları [cite: 39] */}
            <button onClick={handleFirst} disabled={currentPage === 1} className="btn-secondary">
                İlk
            </button>
            <button onClick={handlePrev} disabled={currentPage === 1} className="btn-secondary">
                Geri
            </button>
            <span>Sayfa {currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="btn-secondary">
                İleri
            </button>
            <button onClick={handleLast} disabled={currentPage === totalPages} className="btn-secondary">
                Son
            </button>
        </div>
    );
}

export default Pagination;