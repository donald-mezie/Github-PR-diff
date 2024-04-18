import GifService from "../services/gif.service";
import { Request, Response } from 'express';
import { GifResponse } from "../types/gif_response.type";

class GifController {
    async getTrendingGifs(req: Request, res: Response) {
        const GifServiceInstance = new GifService();
        const response: GifResponse =  await GifServiceInstance.getTrendingGifs();
        return res.json(response);
    }

    async searchGifs(req: Request, res: Response) {
        const GifServiceInstance = new GifService();
        const query = req.query.q as string;
        const response: GifResponse =  await GifServiceInstance.searchGifs(query);
        return res.json(response);
    }
}

export default GifController;