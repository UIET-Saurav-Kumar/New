
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import GenderSlide from './gender-slide';
import AgeSlide from './age-slide';
import LocationSlide from './location-slide';
import BioSlide from './bio-slide';
import InterestsSlide from './interest-slide';
import ImagesUploader from 'src/pages/user/images-uploader';

import ImagesUploaderSlide from './image-uploader-slide';
import ProfileIntroSlide from './profile-intro-slide';

const SlideForm = () => {

  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(null);
  
  const [formData, setFormData] = useState({});


  

  const slides = [
    {id: 0, Component : ProfileIntroSlide},
    { id: 1, Component: GenderSlide },
    { id: 2, Component: AgeSlide },
    // { id: 2, Component: LocationSlide },
    { id: 3, Component: BioSlide },
    {id: 4,  Component: ImagesUploaderSlide},
    { id: 5, Component: InterestsSlide},
    
  ];

  const transitions = useTransition(step, {
    from: {
      opacity: 0,
      transform: step > prevStep ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
    },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: {
      opacity: 0,
      transform: step > prevStep ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)',
    },
  });
  

  const nextSlide = () => {
    setPrevStep(step);
    setStep(step + 1)
  };
  const backSlide = () => {
    setPrevStep(step);
    if (step > 0) {
      setStep(step - 1);
    }
  };

 
  return (

    <div className="w-full h-full flex items-center justify-center">
      {transitions((props, item) => {
          if (item !== undefined && item !== null && slides[item]) {
            const { Component } = slides[item];

            console.log('slides', slides[item]);

            return (
              <animated.div
                key={item}
                style={props}
                className="absolute w-full h-full"
              >
                <Component onNext={nextSlide} onBack={backSlide} formData={formData} setFormData={setFormData} />
              </animated.div>
            );
          }
        })}

    </div>

  );
};

export default SlideForm;
