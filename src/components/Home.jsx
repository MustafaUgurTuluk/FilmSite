import React, { useMemo } from 'react';
import SearchBox from './SearchBox';
import Filters from './Filters';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyMessage from './EmptyMessage';

function Home({ appState, dispatch, onShowDetail }) {
    
    const { 
        isLoading, 
        isError, 
        data, 
        query, 
        filters, 
        watchlist, 
        currentPage, 
        pageSize 
    } = appState;

    // 1. Filtreleme Mantığı (API desteklemediği için istemci tarafında)
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const show = item.show;
            // Tür filtresi [cite: 31]
            if (filters.genre !== "All" && !show.genres?.includes(filters.genre)) {
                return false;
            }
            // Dil filtresi [cite: 31]
            if (filters.language !== "All" && show.language !== filters.language) {
                return false;
            }
            // Puan filtresi [cite: 31]
            if (show.rating?.average < filters.rating) {
                return false;
            }
            return true;
        });
    }, [data, filters]);

    // 2. Sayfalama Mantığı [cite: 36]
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, pageSize]);

    // --- Eylem Göndericiler (Dispatchers) ---
    const handleSearch = (newQuery) => {
        dispatch({ type: "SET_QUERY", payload: newQuery }); // [cite: 22]
    };

    const handleFilterChange = (newFilter) => {
        dispatch({ type: "SET_FILTERS", payload: newFilter }); // [cite: 22]
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            dispatch({ type: "SET_PAGE", payload: newPage }); // [cite: 22] (SET_PAGE)
        }
    };

    const handleAddToWatchlist = (show) => {
        dispatch({ type: "ADD_WATCHLIST", payload: show }); // [cite: 22]
    };

    const handleRemoveFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_WATCHLIST", payload: id }); // [cite: 22]
    };

    const handleClearWatchlist = () => {
        dispatch({ type: "CLEAR_WATCHLIST" }); // [cite: 22]
    };

    const handleRetryFetch = () => {
        // Sadece mevcut sorguyu tekrar tetikle
        dispatch({ type: "SET_QUERY", payload: query });
    };
    
    return (
        <>
            <header className="header">
                <h1>Kampüs Film Kulübü</h1>
                <div className="controls">
                    <SearchBox initialQuery={query} onSearch={handleSearch} />
                    <Filters filters={filters} onFilterChange={handleFilterChange} />
                </div>
            </header>

            <main className="main-layout">
                <div className="content">
                    {/* Koşullu Renderlama  */}
                    {isLoading ? (
                        <LoadingSpinner /> // [cite: 44]
                    ) : isError ? (
                        <ErrorMessage onRetry={handleRetryFetch} /> // [cite: 45]
                    ) : filteredData.length === 0 ? (
                        <EmptyMessage /> // [cite: 46]
                    ) : (
                        <>
                            <TVList
                                shows={paginatedData}
                                watchlist={watchlist}
                                onAddToWatchlist={handleAddToWatchlist}
                                onShowDetail={onShowDetail}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
                <WatchlistPanel
                    watchlist={watchlist}
                    onRemove={handleRemoveFromWatchlist}
                    onClear={handleClearWatchlist}
                />
            </main>
        </>
    );
}

export default Home;