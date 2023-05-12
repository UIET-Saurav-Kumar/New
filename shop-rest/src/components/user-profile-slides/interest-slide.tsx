import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useUserProfileMutation } from '@data/user/user-profile-create.mutation';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { toast } from "react-toastify";


const interests = [
  'Anime',
  'Pop Culture',
  'Movies',
  'Shows',
  'K pop',
  'K Drama',
  'Cricket',
  'Bollywood',
  'Technology',
  'Food',
  'Travel',
  'Politics',
  'Health',
  'Spirituality',
  'Gaming',
  'Art',
  'Music',
  'Fashion',
  'Education',
  'Startups',
  'Environment',
  'Fitness',
];

const gradientColors = [
  'bg-gradient-to-r from-purple-700 via-accent to-red-700',
  'bg-gradient-to-r from-green-700 via-blue-700 to-purple-700',
  'bg-gradient-to-r from-yellow-700 via-yellow-700 to-red-700',
  'bg-gradient-to-r from-blue-700 via-indigo-700 to-green-700',
  'bg-gradient-to-r from-red-700 via-yellow-700 to-green-700',
  'bg-gradient-to-r from-indigo-700 via-purple-700 to-accent',
  'bg-gradient-to-r from-yellow-700 via-green-700 to-blue-700',
  'bg-gradient-to-r from-accent via-purple-700 to-indigo-700',
  'bg-gradient-to-r from-green-700 via-yellow-700 to-yellow-900',
  'bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-700',
  'bg-gradient-to-r from-yellow-700 via-red-700 to-accent',
  'bg-gradient-to-r from-green-900 via-indigo-700 to-green-700',
  'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700',
  'bg-gradient-to-r from-red-700 via-yellow-700 to-yellow-700',
  'bg-gradient-to-r from-blue-700 via-green-900 to-indigo-700',
  'bg-gradient-to-r from-accent via-red-700 to-yellow-700',
  'bg-gradient-to-r from-yellow-700 via-green-900 to-blue-700',
  'bg-gradient-to-r from-indigo-700 via-blue-700 to-green-900',
  'bg-gradient-to-r from-green-700 via-indigo-700 to-green-900',
  'bg-gradient-to-r from-yellow-700 via-yellow-700 to-green-700',
  'bg-gradient-to-r from-indigo-700 via-green-700 to-yellow-700',
  'bg-gradient-to-r from-green-900 via-blue-700 to-indigo-700'
];



const InterestsSlide = ({ onNext, onBack, formData, setFormData }) => {
  
  const {data:userData} = useCustomerQuery()
  const [selectedInterests, setSelectedInterests] = React.useState(formData.interests || []);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const router = useRouter();

  const {mutate: createUserProfile } = useUserProfileMutation();

  const handleSubmit = () => {
    if (selectedInterests.length < 5) {
      alert("Please select at least 5 interests.");
      return;
    }

    // Update the formData with the selected interests
    setFormData({ ...formData, interests: selectedInterests });

    // Send the data to the server
    createUserProfile(
      { ...formData, interests: selectedInterests, user_id:userData?.me?.id },
      {
        onSuccess: () => {
          toast.success(("Profile Updated Successfully"));
          router.push('/home')
          // onNext();
        },
        onError: (error) => {
          console.log("Error submitting user profile:", error);
          alert("There was an error submitting your user profile. Please try again.");
        },
      }
    );
  };

  console.log('logs', formData)

  return (

    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="flex flex-col space-y-4  mb-4">
      <span className='text-xl font-semibold text-center '> What are the colors on your palette of interests?</span>
      <p className='text-gray-600 text-sm text-center'>Pick at least 5</p>
      </h1>
      <div className="grid grid-cols-3 gap-4 p-3">
            {interests.map((interest, index) => (
        <button
          key={interest}
          onClick={() => toggleInterest(interest)}
          className={`p-2 rounded-lg shadow-xl focus:outline-none font-bold text-sm ${
            selectedInterests.includes(interest)
              ? gradientColors[index % gradientColors.length] + ' text-white'
              : 'bg-white text-gray-500 border border-gray-300'
          }`}
        >
          {interest}
        </button>
      ))}

      </div>
      <div className="mt-6">
          <button
              type="button"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mr-2"
              onClick={onBack}
              >
              Back
          </button>
          <button
          onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
              >
            Save
          </button>
      </div>
    </div>

  );
};

export default InterestsSlide;
