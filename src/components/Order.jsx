import React from 'react';

const Order = ({ id, date, total, action }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{total}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">{action}</a>
      </td>
    </tr>
  );
};

export default Order;
