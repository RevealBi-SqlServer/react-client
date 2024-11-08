import { FetchApi } from './fetch-api';
import { OrdersType } from '../models/Orders/orders-type';

export async function getOrdersList(): Promise<OrdersType[]> {
  return await FetchApi.fetchApiResponse<OrdersType[]>('https://excel2json.io/api/share/1e0599db-dc5e-4743-bd52-08dcf9e57512', []);
}
