import React, { useState, useEffect, useCallback } from 'react'; // useCallback eklendi
import axios from 'axios';
import { API_SHOW } from '../reducer';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

function ShowDetail({ showId, onBack }) {
    const [detailState, setDetailState] = useState({
        loading: true,
        error: false,
        show: null,
        episodes: []
    });

    // fetchDetails fonksiyonunu useEffect'in DIŞINA taşıdık
    // Bu sayede hem useEffect içinden hem de 'onRetry' prop'u içinden erişilebilir
    const fetchDetails = useCallback(async () => {
        setDetailState({ loading: true, error: false, show: null, episodes: [] });
        try {
            const [showResponse, episodesResponse] = await Promise.all([
                axios.get(`${API_SHOW}${showId}`),
                axios.get(`${API_SHOW}${showId}/episodes`)
            ]);
            
            setDetailState({
                loading: false,
                error: false,
                show: showResponse.data,
                episodes: episodesResponse.data
            });
        } catch (err) {
            setDetailState({ loading: false, error: true, show: null, episodes: [] });
        }
    }, [showId]); // showId değiştiğinde fonksiyonun yeniden oluşmasını sağlar

    // useEffect şimdi sadece bu fonksiyonu çağırıyor
    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]); // fetchDetails'e bağımlı hale getirdik

    const { loading, error, show, episodes } = detailState;

    if (loading) return <LoadingSpinner />;
    // Hata durumunda 'onRetry' artık 'fetchDetails' fonksiyonunu güvenle çağırabilir
    if (error) return <ErrorMessage onRetry={fetchDetails} />;
    if (!show) return null;

    const summary = show.summary?.replace(/<[^>]+>/g, '') || "Özet yok.";
    const image = show.image?.medium || "https://via.placeholder.com/210x295?text=Poster+Yok";

    return (
        <div className="detail-page">
            <button className="btn-secondary" onClick={onBack} style={{ marginBottom: '20px' }}>
                &larr; Geri Dön
            </button>
            <div className="detail-header">
                <img src={image} alt={show.name} />
                <div>
                    <h1>{show.name}</h1>
                    <p><strong>Tür:</strong> {show.genres?.join(', ')}</p>
                    <p><strong>Dil:</strong> {show.language}</p>
                    <p><strong>Puan:</strong> {show.rating?.average}</p>
                    <p><strong>Durum:</strong> {show.status}</p>
                    <p>{summary}</p>
                </div>
            </div>
            
            <h3>Bölümler ({episodes.length})</h3>
            <ul className="episode-list">
                {episodes.map(ep => (
                    <li key={ep.id}>
                        <strong>S{String(ep.season).padStart(2, '0')}E{String(ep.number).padStart(2, '0')}:</strong> {ep.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShowDetail;