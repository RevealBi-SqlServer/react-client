import { useCallback, useEffect, useState } from 'react';
import { getOrdersList } from '../services/orders';
import { OrdersType } from '../models/Orders/orders-type';

export const useGetOrdersList = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);

  const requestOrders = useCallback(() => {
    let ignore = false;
    getOrdersList()
      .then((data) => {
        if (!ignore) {
          setOrders(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestOrders();
  }, [requestOrders]);

  return { requestOrdersOrders: requestOrders, ordersOrders: orders, setOrdersOrders: setOrders };
}
