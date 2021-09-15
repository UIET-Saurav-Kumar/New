export default function StayTuned() {

    return (

        <div className = 'flex flex-col items-center mt-20 w-full h-1/2 space-y-8 tracking-widest ' >

            <h1 className='text-5xl text-red-700  font-bold lg:text-8xl tracking-widest '>Stay </h1>
            <h1 className='text-5xl text-blue-600 font-bold lg:text-8xl tracking-widest' >Tuned</h1>
            <p className=' w:1/2 px-4 lg:w-1/3 text-center font-semibold text-lg items-center flex'>
                 Sorry we couldn’t find any restaurants near your location that we currently deliver from. 
                    Follow along as we launch in new cities.
            </p>

            <h2 className='text-gray-500 text-md '> Currently we are operating in <span className='font-semibold'>Chandigarh, Panchkula and Mohali.</span> </h2>
            
        </div>
    )
}
