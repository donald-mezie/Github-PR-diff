import GifService from "../services/gif.service";
import { Request, Response } from 'express';
import { StickerResponse } from "../types/sticker_response.type";

class GifController {
    async getTrendingGifs(req: Request, res: Response) {
        const GifServiceInstance = new GifService();

        const response: StickerResponse =  await GifServiceInstance.getTrendingGifs();

        return res.json(response);
    }
}

export default GifController;