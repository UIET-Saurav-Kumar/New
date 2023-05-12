import React from 'react';
import { useForm } from 'react-hook-form';


const LocationSlide = ({ onNext,onBack }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onNext();
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl font-bold mb-4">Where are you located?</h1>
      <input
        {...register("location", { required: true })}
        type="text"
        className="w-full max-w-xs px-4 py-2 border-2 border-pink-500 rounded-lg shadow-md text-gray-700 bg-white focus:outline-none focus:border-pink-700"        placeholder="Location"
      />
      {errors.location && <p className="text-red-500">Please enter your location.</p>}
      <div className="mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mr-2"
            onClick={onBack}
            >
            Back
          </button>
          <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                >
            Next
          </button>
        </div>
    </form>
  );
};

export default LocationSlide;
