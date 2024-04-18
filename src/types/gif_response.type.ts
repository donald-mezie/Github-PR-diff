import { Item } from './sticker_response.type';

export interface GifResponse {
    data: Item[];
    meta: {status:number;msg:string;response_id:string};
    pagination: {total_count:number;count:number;offset:number};
}