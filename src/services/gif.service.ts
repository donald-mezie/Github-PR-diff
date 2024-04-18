import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs'
})

class GifService {
    async getTrendingGifs() {
        // api.giphy.com/v1/gifs/trending
        const API_KEY = process.env.API_KEY as string;

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            } as RawAxiosRequestHeaders
        };

        try {
            const searchResponse: AxiosResponse = await client.get(`/trending?api_key=${API_KEY}&limit=5`, config);
            return searchResponse.data;
        } catch (error) {
            console.log(error);
        }
    }

    async searchGifs(query: string) {
        // api.giphy.com/v1/gifs/search
        const API_KEY = process.env.API_KEY as string;

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            } as RawAxiosRequestHeaders
        };

        try {
            const searchResponse: AxiosResponse = await client.get(`/search?api_key=${API_KEY}&q=${query}&limit=5`, config);
            return searchResponse.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default GifService