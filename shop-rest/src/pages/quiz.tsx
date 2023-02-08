// import Radio from "@components/ui/radio/radio";
// import  Label  from "@components/ui/label";
// import { values } from "lodash";
// import React from "react";
// import { useForm } from "react-hook-form";
// import styles from "./quiz.module.css";
// import DefaultLayout from "@components/layout/default-layout";
// import  Button  from "@components/ui/button";
// import { useMutation, useQueryClient } from "react-query";
// import { toast } from "react-toastify";
// import { API_ENDPOINTS } from "@utils/api/endpoints";
// import http from "@utils/api/http";
// import url from "@utils/api/server_url";


// const QuizForm = () => {

//   const { register, handleSubmit, errors } = useForm();

//   const queryClient = useQueryClient()
//   // const { mutate: createquiz, isLoading: loading } = useQuizMutations();

//   const postQuiz = async (data:any)=> {
//     const {data: response} = await http.post(
//       `${url}/${API_ENDPOINTS.OPERATOR}`,
//       data,
//     )
//   }

//   const { mutate: createquiz } = useMutation(postQuiz, {
//     onSuccess: (data) => {
//       // setOperator(data)
//       // data?.status == false ? setError(data?.msg) : null
//       // setOperatorName(data?.operator)
//       // setCircleName(data?.circle)
//       console.log('operator plans', data)
//     },

//     onError: (data) => {
//       // alert(data?.msg)
//       toast.error("unable to process the request, please try later");
//       // setError(data?.msg)
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.QUIZ)
//     },
//   })


//   const onSubmit = (data:any) => {

    
//     let input = {
//       q1: data?.q1,
//     };

//     // if(loading){
//     //   return;
//     // }
//     createquiz(input)
//   }
//   };


//   return (

//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full lg:w-1/2 mx-auto lg:shadow-2xl text-left" onSubmit={handleSubmit(onSubmit)}>

//       <Label className="text-2xl text-center pb-5">Valentine’s Day Quiz. </Label>

//       <div className="flex flex-col space-y-4 mx-auto items-center w-full">

//       <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

//         <Label>  When did Valentine's Day start being celebrated as a holiday?</Label>

//         <div className="flex flex-col space-y-2">
//           <Radio
//             id="1000 AD"
//             type="radio"
//             {...register("q1")}
//             value="1000 AD"
//             label={("1000 AD")}
//             className=""
//           />

//           <Radio
//             id="496 AD"
//             type="radio"
//             {...register("q1")}
//             value="496 AD"
//             label={("496 AD")}
//             className=""
//           />

//           <Radio
//             id="273 AD"
//             type="radio"
//             {...register("q1")}
//             value="273 AD"
//             label={("273 AD")}
//             className=""
//           />
//         </div>

//       </div>

//       <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

//           <Label>  Who is considered the patron saint of love and romance?</Label>

//           <div className="flex flex-col space-y-2">
//             <Radio
//               id="St. Valentinus"
//               type="radio"
//               {...register("q2")}
//               value="q2"
//               label={("St. Valentinus")}
//               className=""
//             />

//             <Radio
//                 id="St Rose"
//                 type="radio"
//                 {...register("q2")}
//                 value="q2"
//                 label={("St Rose")}
//                 className=""
//               />

//             <Radio
//                 id="St Anthony"
//                 type="radio"
//                 {...register("q2")}
//                 value="q2"
//                 label={("St Anthony")}
//                 className=""
//               />
//           </div>

//       </div>

//       <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

//           <Label>  What is the most popular flower given on Valentine's Day?</Label>

//           <div className="flex flex-col space-y-2">
//             <Radio
//               id="Lilies"
//               type="radio"
//               {...register("q3")}
//               value="q3"
//               label={("Lilies")}
//               className=""
//             />

//             <Radio
//                 id="Roses"
//                 type="radio"
//                 {...register("q3")}
//                 value="q3"
//                 label={("Roses")}
//                 className=""
//               />

//             <Radio
//                 id="Tulips"
//                 type="radio"
//                 {...register("q3")}
//                 value="q3"
//                 label={("Tulips")}
//                 className=""
//               />
//           </div>

//       </div>

//       <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

//           <Label>  Which of the following movies is not a romantic comedy released around Valentine's Day?</Label>

//           <div className="flex flex-col space-y-2">
//             <Radio
//               id="The Notebook"
//               type="radio"
//               {...register("q4")}
//               value="q4"
//               label={("The Notebook")}
//               className=""
//             />

//             <Radio
//                 id="When Harry Met Sally"
//                 type="radio"
//                 {...register("q4")}
//                 value="q4"
//                 label={("When Harry Met Sally")}
//                 className=""
//               />

//             <Radio
//                 id="Jurassic Park"
//                 type="radio"
//                 {...register("q4")}
//                 value="q4"
//                 label={("Jurassic Park")}
//                 className=""
//               />
//           </div>

//       </div>

//       <div className="border-b border-gray-50 shadow-sm py-2 w-full flex flex-col mx-auto px-4 space-y-2 sm:px-6 lg:px-8">

//           <Label>  In which country is it a tradition to give women chocolate on Valentine's Day?</Label>

//           <div className="flex flex-col space-y-2">
//             <Radio
//               id="France"
//               type="radio"
//               {...register("q5")}
//               value="q5"
//               label={("France")}
//               className=""
//             />

//             <Radio
//                 id="Japan"
//                 type="radio"
//                 {...register("q5")}
//                 value="q5"
//                 label={("Japan")}
//                 className=""
//               />

//             <Radio
//                 id="USA"
//                 type="radio"
//                 {...register("q5")}
//                 value="q5"
//                 label={("USA")}
//                 className=""
//               />
//           </div>

//       </div>

      

//       </div>

//       <Button
//         loading={loading}
//         className="w-full mt-5 lg:w-auto lg:ms-auto"
//       >
//         {t("Place Order")}
//       </Button>

//     </form>
//   )

// QuizForm.Layout  = DefaultLayout;
//   }

// export default QuizForm;
          