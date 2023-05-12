import React from 'react';
import { useRouter } from 'next/router';

const ProfileIntroSlide = ({onNext, onBack,}) => {
  const router = useRouter();

  const handleProceed = () => {
    // Navigate to the age slide
    router.push('/age-slide');
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto text-center h-full">
      <h1 className="text-2xl font-bold  mb-4">
        Connect with like-minded people in our community.
      </h1>
      <p className="text-lg text-center mb-6">
        Complete your profile now
      </p>
      <button
        type="button"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        onClick={onNext}
      >
        Proceed
      </button>
    </div>
  );
};

export default ProfileIntroSlide;
