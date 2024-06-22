import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ id, date, total }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{total}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:text-orange-700">
        <Link to={{ pathname: `/purchasehistory/${id}` }}>
            <h1>VIEW DETAILS</h1>
        </Link>
      </td>
    </tr>
  );
};

export default Order;
