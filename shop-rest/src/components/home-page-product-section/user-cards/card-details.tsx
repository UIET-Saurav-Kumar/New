import React from 'react';

export default function CardDetails( {data} ) {


    console.log('props',data?.user?.date_of_birth);
    //get age from date
    //date format - Mon Mar 07 2005 00:00:00 GMT+0530 (India Standard Time)
     
    const getAge = (dateString:string) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
      
        return age;
    }
  

    //data?.user?.name first letter to upper case
    const capitalize= (string:string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



  return (

    <div className="bg-white p-4 h-screen w-screen lg:w-96 lg:h-full  overflow-y-scroll shadow-lg mt-0">
      <div className="flex flex-row overflow-x-scroll">
        {/* Add multiple images here */}
        <img
          src={`https://source.unsplash.com/featured/?${data?.user?.gender}/${data?.user?.name}`}
          alt={data?.user?.name}
          className="w-screen h-2/3 object-cover rounded-lg mr-2"
        />
      </div>
      <div className="mt-4">
        {/* <h3 className="text-lg font-semibold">Name</h3> */}
        <p className='text-gray-900 text-2xl font-semibold'>
            {capitalize(data?.user?.name) + ', '+ getAge(data?.user?.date_of_birth) }</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Lives In</h3>
        <p>{data?.user?.current_location == null ? 'N/A' : data?.user?.current_location.includes('undefined')   ? 'N/A' : data?.user?.current_location || "N/A"}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Interests</h3>
        <p>{data?.user?.interests || "N/A"}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Occupation</h3>
        <p>{data?.user?.occupation || "N/A"}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">About</h3>
        <p>{data?.user?.about || "N/A"}</p>
      </div>
    </div>
  );
}
