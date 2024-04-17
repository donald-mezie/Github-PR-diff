import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import route from './router/sticker.route';

dotenv.config();

if(!process.env.PORT){
    console.error('No port value specified...');
    process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(helmet());

app.use(route);

app.listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}`);
});