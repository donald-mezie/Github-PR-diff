import { Router } from 'express'

import StickerController from '../controllers/sticker.controller';

const router = Router();

const Sticker = new StickerController();

router.get('/trending-stickers', Sticker.getTrendingStickers);

export default router;