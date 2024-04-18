import { Router } from 'express'

import GifController from '../controllers/gif.controller';

const router = Router();

const Gif = new GifController();

router.get('/trending-gifs', Gif.getTrendingGifs);

export default router;