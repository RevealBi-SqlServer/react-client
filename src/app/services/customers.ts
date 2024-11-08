import { CustomersType } from '../models/Customers/customers-type';
import { FetchApi } from './fetch-api';

export async function getCustomersList(): Promise<CustomersType[]> {
  return await FetchApi.fetchApiResponse<CustomersType[]>('https://excel2json.io/api/share/b2a9c35c-638c-47c9-bd53-08dcf9e57512', []);
}
