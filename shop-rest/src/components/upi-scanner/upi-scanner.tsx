import React from 'react'

export default function UpiScanner({data}) {

console.log('order link scanner', Object.values(data)[0][0]);
console.log('order link props scanner', (data));

const reciever_name = data?.reciever_name;

const upi_id = data?.reciever_upi;

const amount = data?.amount;
 
const upiApps = [
    '/upi/bhim.png','/upi/upi.jpeg','/upi/gpay.png','/upi/paytm.png','/upi/phone-pe.jpg','/upi/qr.jpg'
]

const upi_link = Object.values(data)[0][0];

const urlParams = new URLSearchParams(new URL(upi_link).search);
const trValue = urlParams.get("tr");
const tnValue = urlParams.get("tn");

console.log('new link', trValue, tnValue)


const upi_id2 = 'cf.lowcalventurespvtltd@icici';

const reciever = 'Lowcal%20Ventures%20Pvt%20Ltd';

const merchant_code = '0000';


const modifiedLinks = Object.values(data)[0]?.map((link, index) => {
  let modifiedLink = link.replace("pa=cf.lowcalventurespvtltd@icici", `pa=${upi_id}`) ;
  modifiedLink = modifiedLink.replace("pa=cf.cashfreelowcal@yesbank", `pa=${upi_id}`)
  modifiedLink = modifiedLink.replace("pn=Lowcal%20Ventures%20Pvt%20Ltd", `pn=${reciever_name}`);
  modifiedLink = modifiedLink.replace("mc=5399", `mc=${merchant_code}`);
  return modifiedLink;
});


const gpayLink = `upi://pay?pa=${upi_id2}&pn=${reciever}&tr=${trValue}&am=${amount}&cu=INR&mode=00&purpose=00&mc=0000&tn=${tnValue}&aid=uGICAgIC4oYCNBQ`
const gpayLink_MC= `upi://pay?pa=${upi_id}&pn=${reciever_name}&tr=${trValue}&am=${amount}&cu=INR&mode=00&purpose=00&mc=0000&tn=${tnValue}&aid=uGICAgIC4oYCNBQ`
const gpayLink_MC_CF= `upi://pay?pa=${upi_id2}&pn=${reciever}&tr=${trValue}&am=${amount}&cu=INR&mode=00&purpose=02&mc=5399&tn=${tnValue}&aid=uGICAgIC4oYCNBQ`
// const gpayLink = 'upi://pay?pa=vinendersingh91@okicici&pn=vinender%20singh&aid=uGICAgIC4oYCNBQ'
const gpay     =   `upi://pay?pa=${upi_id}&pn=${reciever_name}&am=${amount}&url=null&tid=aWd13cf2wer35&tr=${trValue}&mc=0000&mode=lazy&purpose=00&aid=uGICAgIC4oYCNBQ`
const gpay_2   =   `upi://pay?pa=${upi_id}&pn=${reciever_name}&am=${amount}&tid=aWd13cf234sc35&tr=${trValue}&mc=0000&mode=lazy&purpose=00`
const cashfree =   `upi://pay?pa=${upi_id}&pn=${reciever_name}&tr=${trValue}&am=${amount}&cu=INR&mode=00&purpose=00&mc=0000&tn=${tnValue}`
const cashfree_mc =   `upi://pay?pa=${upi_id}&pn=${reciever_name}&tr=${trValue}&am=${amount}&cu=INR&mode=00&purpose=00&mc=5399&tn=${tnValue}`

console.log('order link modified',modifiedLinks.join(' '));

return (

  <div className='grid grid-cols-3 place-items-center h-screen w-screen  gap-x-6 px-10  bg-white'>
     <span onClick={()=> window.open(gpayLink_MC_CF)} className='h-20 cursor-pointer w-20 rounded-full border'>gpayLink_MC_CF</span>
                <span onClick={()=> window.open(gpayLink_MC)} className='h-20 cursor-pointer w-20 rounded-full border'>gpayLink_MC</span>
                <span onClick={()=> window.open(gpayLink)} className='h-20 cursor-pointer w-20 rounded-full border'>gpay-link</span>
                <span onClick={()=> window.open(gpay)} className='h-20 cursor-pointer w-20 rounded-full border'>gpay-more</span>
                <span onClick={()=> window.open(gpay_2)} className='h-20 cursor-pointer w-20 rounded-full border'>gpay-2</span>
                 <span onClick={()=> window.open(cashfree_mc)} className='h-20 cursor-pointer w-20 rounded-full border'>cashfree_mc</span>
                <span onClick={()=> window.open(cashfree)} className='h-20 cursor-pointer w-20 rounded-full border'>cashfree</span>
                <a href={`upi://pay?pa=${upi_id}&pn=${reciever_name}&am=${amount}`} className="text-green-700 border w-20 h-20 rounded-full">Pay Now !</a>
    {modifiedLinks?.map((link, index) => {
      const app = upiApps[index];
      return (
        <div key={index} className='flex flex-col'> 
            <img src={app} className=' items-center rounded-full object-contain h-20 border w-20' 
             key={app} alt={'upi-app'} onClick={() => window.open(link)}
            />
        </div>
      );
    })}
  </div>
)   
}
