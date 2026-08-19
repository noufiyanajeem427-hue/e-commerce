import React from 'react';

const OrderRow = ({ orderId, customer, total, status }) => {
  return (
    <tr>
      <td>{orderId}</td>
      <td>{customer}</td>
      <td>{total}</td>
      <td>{status}</td>
    </tr>
  );
};

export default OrderRow;
