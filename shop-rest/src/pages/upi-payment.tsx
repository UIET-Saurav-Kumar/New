import DefaultLayout from '@components/layout/default-layout';
import ShopLayout from '@components/layout/shop-layout';
import { useRouter } from 'next/router';
import React from 'react';

export default function UpiPayment( )  {

    const {query} = useRouter();

    const response = {
        user_transactionId: query.trans_id,
        transaction_id: query.tx_id,
        amount: 100,
        currency: 'INR',
        status: 'success',
        customerName: 'Vinender singh',
        customerEmail: 'vinender@gmail.com',
        paymentMethod: 'UPI',
        createdAt: '2022-01-01T12:00:00Z',
      };

      
      
  return (

    <div className="container h-screen mx-auto text-center p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800">
          Your Transaction details 
      </h1>
      {/* <p className="text-gray-600">
        Below are the details of the recharge transaction:
      </p> */}
      <table className="table-auto text-left align-center w-auto lg:w-1/3 rounded border bg-gray-50  mt-10 shadow-lg">
        <tbody className='p-2'>
          {Object.entries(response).map(([key, value]) => (
            <tr key={key}>
              <td className="px-4 py-2 text-gray-700">{key}</td>
              <td className={` ${value == 'success' ? 'text-green-500 font-semibold' : value == 'failure' ? 'text-red-500 font-semibold' : value == 'pending' ? 'text-yellow-500 font-semibold' : null } px-4 py-2 text-gray-800`}>
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {JSON.stringify(query)}
    </div>
  );
 };


 UpiPayment.Layout = DefaultLayout;

// export default CallbackPage;

 