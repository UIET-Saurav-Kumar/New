
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';


const AgeSlide = ({ onNext, onBack, formData, setFormData }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm();

  const [showErrors, setShowErrors] = useState(false);

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  const dayValue = watch("day");
  const monthValue = watch("month");
  const yearValue = watch("year");
 

  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    console.log("logs", formData);
    if (isInitialMount) {
      if (formData.day) setValue("day", formData.day);
      if (formData.month) setValue("month", formData.month);
      if (formData.year) setValue("year", formData.year);
      setIsInitialMount(false);
    }
  }, [setValue, formData.day, formData.month, formData.year, isInitialMount]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = await trigger(["day", "month", "year"]);
  
    const currentDay = getValues("day");
    const currentMonth = getValues("month");
    const currentYear = getValues("year");
  
    console.log('logs', currentDay);
    console.log('logs', currentMonth);
    console.log('logs', currentYear);
  
    if (isValid) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        day: parseInt(currentDay, 10),
        month: parseInt(currentMonth, 10),
        year: parseInt(currentYear, 10),
      }));
      onNext();
    } else {
      setShowErrors(true);
    }
  };
  

  useEffect(() => {
    if (dayValue && monthValue && yearValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        day: parseInt(dayValue, 10),
        month: parseInt(monthValue, 10),
        year: parseInt(yearValue, 10),
      }));
    }
  }, [dayValue, monthValue, yearValue, setFormData]);
  
  
  

  // const onSubmit = (currentData) => {
  //   const { day, month, year } = currentData;
  //   const birthdate = new Date(year, month - 1, day);
  //   const today = new Date();
  //   const age = today.getFullYear() - birthdate.getFullYear();
  //   const ageMonth = today.getMonth() - birthdate.getMonth();
  //   const ageDay = today.getDate() - birthdate.getDate();
  
  //   if (age > 18 || (age === 18 && ageMonth >= 0 && ageDay >= 0)) {
  //     setFormData({ ...formData, ...currentData });
  //     onNext();
  //   } else {
  //     alert("You must be at least 18 years old.");
  //   }
  // };
  


  const onDayInput = async (e) => {
    if (e.target.value.length === 2) {
      monthRef.current.focus();
    }
    setValue("day", e.target.value);
    await trigger("day");
  };
  
  const onMonthInput = async (e) => {
    if (e.target.value.length === 2) {
      yearRef.current.focus();
    }
    setValue("month", e.target.value);
    await trigger("month");
  };
  
  const onYearInput = async (e) => {
    setValue("year", e.target.value);
    await trigger("year");
  };
  

  const validateDay = (value) => {
    const day = parseInt(value, 10);
    return day >= 1 && day <= 31;
  };
  
  const validateMonth = (value) => {
    const month = parseInt(value, 10);
    return month >= 1 && month <= 12;
  };
  
  const validateYear = (value) => {
    const year = parseInt(value, 10);
    const maxYear = new Date().getFullYear() - 18;
    return year >= 1900 && year <= maxYear;
  };

  const onDayBlur = async (e) => {
    await trigger("day");
  };
  
  const onMonthBlur = async (e) => {
    await trigger("month");
  };
  
  const onYearBlur = async (e) => {
    await trigger("year");
  };

  return (

    <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center h-full">
      
      <h1 className="text-xl  font-semibold mb-4">When did your life's adventure begin?</h1>
        
        <div className="flex items-center">
          <input
            defaultValue={formData.day || ''}
            {...register("day", { required: true, validate: validateDay })}
            ref={dayRef}
            maxLength={2}
            type="number"
            className="w-20 px-2 py-2 border-2  rounded-lg shadow-md text-gray-700 bg-white focus:outline-none focus:border-pink-50  mr-2"
            placeholder="DD"
            onInput={onDayInput}
            onBlur={onDayBlur}
          />

          <input
            defaultValue={formData.month || ''}
            {...register("month", { required: true, validate: validateMonth })}
            ref={monthRef}
            maxLength={2}
            type="number"
            className="w-20 px-2 py-2 border-2  rounded-lg shadow-md text-gray-700 bg-white focus:outline-none focus:border-pink-50  mr-2"
            placeholder="MM"
            onInput={onMonthInput}
            onBlur={onMonthBlur}
          />

          <input
            defaultValue={formData.year || ''}
            {...register("year", {
              required: true,
              validate: validateYear,
            })}
            ref={yearRef}
            maxLength={4}
            type="number"
            className="w-20 px-2 py-2 border-2  rounded-lg shadow-md text-gray-700 bg-white focus:outline-none focus:border-pink-50 "
            placeholder="YYYY"
            onInput={onYearInput}
            onBlur={onYearBlur}
          />
        </div>

        {showErrors && errors.day && <p className="text-red-500">Please enter a valid day (1-31).</p>}
      {showErrors && errors.month && <p className="text-red-500">Please enter a valid month (1-12).</p>}
      {showErrors && errors.year && (
        <p className="text-red-100">Please enter a valid year (1900-{new Date().getFullYear() - 18}).</p>
      )}
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
  )}      

export default AgeSlide;
