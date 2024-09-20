import axios from 'axios';
import {Total, Results, TotalPages} from "./types";

const BASE_KEY:string = 'H0wnL8wDc_HOffizgr_1FPbAZzKuehHMD0KfQfQMqS4';
axios.defaults.baseURL = 'https://api.unsplash.com';

interface IResponse {
    data: {
        total: Total,
        results: Results[],
        total_pages: TotalPages,
    }
}

export const getImages = async (query:string, page:number):Promise<IResponse> => {
    const params = {
        'client_id':BASE_KEY,
        query: query,
        page,
        'per_page': 16,
        orientation: 'landscape',
    }

    return await axios.get('/search/photos', {params})
}
