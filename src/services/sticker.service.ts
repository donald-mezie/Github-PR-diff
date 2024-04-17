import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
    baseURL: 'https://api.giphy.com/v1/stickers'
})

class StickerService {
    async getTrendingSticker() {
        // api.giphy.com/v1/stickers/trending
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
}

export default StickerService