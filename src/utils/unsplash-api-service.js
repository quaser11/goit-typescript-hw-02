import axios from 'axios';

const BASE_KEY = 'H0wnL8wDc_HOffizgr_1FPbAZzKuehHMD0KfQfQMqS4';
axios.defaults.baseURL = 'https://api.unsplash.com';

export const getImages = async (query, page) => {
    const params = {
        'client_id':BASE_KEY,
        query: query,
        page,
        'per_page': 16,
        orientation: 'landscape',
    }

    const data = await axios.get('/search/photos', {params})

    return data
}
