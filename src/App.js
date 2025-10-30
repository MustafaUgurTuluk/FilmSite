import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { initialState, appReducer, API_SEARCH } from './reducer';
import Home from './components/Home';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';

function App() {
    // PDF'te istendiği gibi state yönetimi için useReducer kullanıyoruz 
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Detay sayfası/Anasayfa arasında geçiş için basit bir 'view' state'i
    // (PDF React Router istemediği için en basit yönlendirme budur)
    const [view, setView] = useState({ page: 'home', showId: null });

    // Ana veri çekme işlemi [cite: 9]
    useEffect(() => {
        // Sadece 'query' değiştiğinde API'yi tekrar çağır
        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" }); // [cite: 22]
            try {
                // Axios ile API isteği 
                const result = await axios.get(`${API_SEARCH}${state.query}`);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data }); // [cite: 22]
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE" }); // [cite: 22]
            }
        };

        // Açılışta varsayılan sorgu ("friends") ile yükle [cite: 30]
        fetchData();
    }, [state.query]); // Sadece 'query' değiştiğinde tetiklenir


    const handleShowDetail = (id) => {
        setView({ page: 'detail', showId: id });
    };

    const handleGoHome = () => {
        setView({ page: 'home', showId: null });
    };

    return (
        <div className="container">
            {/* Sayfa yönlendirmesi */}
            {view.page === 'home' ? (
                <Home 
                    appState={state} 
                    dispatch={dispatch} 
                    onShowDetail={handleShowDetail}
                />
            ) : (
                <ShowDetail 
                    showId={view.showId} 
                    onBack={handleGoHome}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;