// API Adresleri
export const API_BASE = "https://api.tvmaze.com";
export const API_SEARCH = `${API_BASE}/search/shows?q=`;
export const API_SHOW = `${API_BASE}/shows/`;

// Başlangıç State'i
export const initialState = {
    isLoading: true,
    isError: false,
    data: [],           // API'den gelen ham veri
    query: "friends",   // Varsayılan arama sorgusu [cite: 30]
    filters: {
        genre: "All",
        language: "All",
        rating: 0,
    },
    watchlist: [],      // Gösterime girecekler listesi
    currentPage: 1,
    pageSize: 6,        // Sayfa başına dizi sayısı [cite: 38]
};

// Reducer Fonksiyonu
export function appReducer(state, action) {
    // PDF'te istenen eylem türleri [cite: 22]
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
                currentPage: 1, // Yeni aramada başa dön
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload,
            };
        case "SET_FILTERS":
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
                currentPage: 1, // Filtre değişince başa dön
            };
        // PDF'te SET_PAGE_SIZE istenmiş [cite: 22] ama mantık SET_PAGE gerektiriyor.
        // Biz sayfalama için SET_PAGE ekleyelim.
        case "SET_PAGE":
            return {
                ...state,
                currentPage: action.payload,
            };
        case "ADD_WATCHLIST": {
            if (state.watchlist.find(item => item.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
            };
        }
        case "REMOVE_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(item => item.id !== action.payload),
            };
        case "CLEAR_WATCHLIST":
            return {
                ...state,
                watchlist: [],
            };
        default:
            throw new Error(`Bilinmeyen eylem türü: ${action.type}`);
    }
}