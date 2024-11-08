import { useCallback, useEffect, useState } from 'react';
import { CustomersType } from '../models/Customers/customers-type';
import { getCustomersList } from '../services/customers';

export const useGetCustomersList = () => {
  const [customers, setCustomers] = useState<CustomersType[]>([]);

  const requestCustomers = useCallback(() => {
    let ignore = false;
    getCustomersList()
      .then((data) => {
        if (!ignore) {
          setCustomers(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestCustomers();
  }, [requestCustomers]);

  return { requestCustomersCustomers: requestCustomers, customersCustomers: customers, setCustomersCustomers: setCustomers };
}
