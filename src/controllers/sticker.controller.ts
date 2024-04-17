import StickerService from "../services/sticker.service";
import { Request, Response } from 'express';
import { StickerResponse } from "../types/sticker_response.type";

class StickerController {
    async getTrendingStickers(req: Request, res: Response) {
        const StickerServiceInstance = new StickerService();

        const response: StickerResponse =  await StickerServiceInstance.getTrendingSticker();

        return res.json(response);
    }
}

export default StickerController;