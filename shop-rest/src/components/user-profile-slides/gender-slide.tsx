import { useForm } from 'react-hook-form';

const GenderSlide = ({ onNext, onBack, formData, setFormData }) => {
  
  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    const updatedFormData = { ...formData, gender: selectedGender };
    setFormData(updatedFormData);
    onNext(updatedFormData);
  };


  return (

    <div className="flex flex-col items-center justify-center h-full">

      <h1 className="text-xl  font-semibold mb-4">What's Your Life Character??</h1>

      <select
        className="w-full max-w-xs px-4 py-2 border rounded-lg shadow-md text-gray-700"
        defaultValue=""
        value={formData.gender || ""}
        {...{
          onChange: handleGenderChange,
        }}
      >
        <option value="" disabled hidden>
          Select your gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-Binary</option>
        <option value="other">Other</option>
      </select>
      <div className="mt-6">
        {/* <button
          type="button"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mr-2"
          onClick={onBack}
        >
          Back
        </button> */}
        <button
          type="submit"
          onClick={onNext}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
         >
          Next
        </button>
      </div>
    </div>

  );
};

export default GenderSlide;
