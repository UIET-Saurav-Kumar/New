import React from 'react';
import { useForm } from 'react-hook-form';

const BioSlide = ({ onNext,onBack,  formData, setFormData }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm();
  
  const bioData = getValues('bio');

  const onSubmit = (data) => {

    console.log(data);
    setFormData((prevData)=>({
      ...prevData,
       bio : data?.bio,
    }))
    onNext();
   
  };

  console.log('logs bio',formData)

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  items-center justify-center h-full">
      <h1 className="text-xl  font-semibold text-center mb-4">How would you describe your life's trailer?</h1>
      <textarea
       defaultValue={formData.bio || ''}
        {...register("bio", { required: true, maxLength: 500 })}
        className="w-full  whitespace-pre-line max-w-xs px-4 py-2 h-60 border rounded-lg shadow-md text-gray-700"
        placeholder="Tell something interesting about you"
      ></textarea>
          {errors.bio && <p className="text-yellow-800 whitespace-pre-line text-center">
            Oops! Your life's trailer is missing. 
          <p>Our community would love to know more about you!</p>
        <br/>  Please share something .</p>}

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
  
  export default BioSlide;
  
