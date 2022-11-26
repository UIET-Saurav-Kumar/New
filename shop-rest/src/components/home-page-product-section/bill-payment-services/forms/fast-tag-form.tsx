import Input from '@components/ui/input'
import Label from '@components/ui/label'
import Select from '@components/ui/select/select'
import { yupResolver } from '@hookform/resolvers/yup'
 import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useModalAction } from '@components/ui/modal/modal.context'
import {operators} from './mobile-recharge-form'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import url from '@utils/api/server_url'
import http from '@utils/api/http'
import { useMutation } from 'react-query'

type FormValues = {
    date_of_birth:Date;
}

const defaultValues = {
    date_of_birth: ''
}


export default function FastTagForm({click,variant} :any) {


    console.log(' form insurance ',click)

    const[loading,setLoading] = useState(false);
    const[fastTagInfo,setFastTagInfo]= useState(null);
    const[operator, setOperator] = useState(null);
    const[category, setCategory] = useState(null);
    const[billerId, setBillerId] = useState(null);

    const[para1,setPara1] = useState('');
    const[para2, setPara2] =useState('');
    const[para3,setPara3] =useState('');
    const[fastTagDetails,setFastTagDetails] = useState(null);

    const[key1, setKey1] = useState('');
    const[key2,setKey2] = useState('');
    const[key3,setKey3] = useState('')

    const { openModal } = useModalAction();


    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

const [birthDate, setBirthDate] = useState(null);

 
const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    // resolver: yupResolver(registerFormSchema),
  });

  const fetchFastTagInfo = async (data:any) => {

    setLoading(true)

    console.log('biller',data)

    const { data:response } = await http.get(`${url}/${API_ENDPOINTS.FAST_TAG_INFO}?biller_id=${billerId}&category=${category}`);
    
    setLoading(false)
    setFastTagInfo(response)
     
    console.log('fastTagInfo',fastTagInfo,response);
    return response;

  };

  const fetchFastTagDetails = async (data:any) => {
    setLoading(true)

    console.log('biller',data)

    const { data:response } = await http.post(`${url}/${API_ENDPOINTS.FAST_TAG_DETAILS}`,data);
    setLoading(false)
    setFastTagDetails(response);
    console.log('billDetails',fastTagDetails)
    fieldKeys()
    return response;

  };

  const { mutate: mutateFastTagInfo } = useMutation(fetchFastTagInfo, {
       
    onSuccess: data => {
     console.log('biller',data.data.map((m)=>m.paramName))
    },


    onError: (e) => {
      alert('something went wrong')
      setLoading(false)
    },
  
    // onSettled: () => {
    //   queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS);
    // }

  });

  const { mutate: mutateFastTagDetails } = useMutation(fetchFastTagDetails, {
       
    onSuccess: data => {
      data?.status_msg == 'OK' && openFastTagDetails(data)
      
     console.log(data)
    },


    onError: (e) => {
      alert('something went wrong')
      setLoading(false)
    },
  
    // onSettled: () => {
    //   queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS);
    // }

  });

  useEffect(() => {
      
    if(billerId && category) {

      const biller =  {
        'biller_id' :  billerId ,
        'category'   :  category,
      };

      mutateFastTagInfo(biller);
    }
  }, [operator])

  const onSubmit = async  () => {
        
    const biller =  {
      // 'operator' :  operator ,
      'category'   : category,
      'biller_id' : billerId
    };

    mutateFastTagInfo(biller);
   
  };

  const submitFastTagDetails =  () => {
    
    const billDetails =  {
      'para1':   para1,
      'para2':   para2,
      'para3':    para3,
      'biller_id':billerId,
      'category': category,
    };

    console.log(billDetails)

    mutateFastTagDetails(billDetails);
   
  };

  function openFastTagDetails(data:any) {

    return openModal("BILL_PAYMENT_DETAILS",{
        data,
        operator,
        para: [{key1,para1},{key2,para2},{key3,para3}],
       
      // img : logoImg,
    });
  }

  function fieldKeys(){
    fastTagInfo?.data?.map((field:any)=>
      field?.fieldKey=='para1' ? setKey1(field?.paramName) 
    : field?.fieldKey=='para2' ? setKey2(field?.paramName) 
    : field?.fieldKey =='para3' ? setKey3(field?.paramName) 
    : null 
    )
  }

  function onValueChange(option:any) {
    setLoading(true);
    setOperator(option.label)
    setBillerId(option.biller_id)
    setCategory(option?.Category)
     
  }

  const keywords = ['dob', 'date of birth','Date Of Birth (DDMMYYYY),date','expiry date','expiry']

  console.log('date', fastTagInfo?.data?.map((field,index)=>keywords.some((el)=>field?.datatype.toLowerCase().includes(el) ) ? 'date' : field?.datatype.toLowerCase()))

  return (

    <div className={`${click ? 'block' : 'hidden'}`}>

<div className='grid grid-cols-1 lg:flex space-y-3 lg:space-y-0 lg:space-x-20 px-6 justify-evenly w-full py-3 items-center bg-gray-200'>

            {/* <Input label='Phone number'
                variant=''
                type='number'
                className='rounded'
            /> */}

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select label='Operator'
                        variant=''
                        inputMode="numeric"
                        type='number'
                        getOptionLabel={(option: any) => option.label}
                          getOptionValue={(option: any) => option.label}
                          className={` ${loading ? 'w-full lg:w-1/2 flex-1' : 'w-full'}   `}
                          onChange={onValueChange}
                        options= {operators?.filter((opr)=> opr.Category=='FastTag')}
                />
            </div>

            { loading ? 
                 <img src="/preloader/cir.gif" 
                 className="w-full mt-10 mx-auto" 
                 style={{width:"30px",height:"30px"}}/>
                    : 
                   fastTagInfo?.data?.map((field,index)=>

                  //  field?.paramName !== 'Date Of Birth (DDMMYYYY)' || field?.paramName !== 'DOB' || field?.paramName !== 'DOB(YYYY-MM-DD)' ?  

                    <div className='flex-1 '> 
                        <Input 
                          name={field.paramName}        
                          label={field.paramName} 
                          variant={variant}
                          type={keywords.some((el)=>field?.paramName.toLowerCase().includes(el) ) ? 'date' : field?.datatype.toLowerCase()}
                          inputMode={keywords.some((el)=>field?.paramName.toLowerCase().includes(el) ) ? 'date' : field?.datatype.toLowerCase()}
                          className='rounded ' 
                          onChange={field?.fieldKey=='para1' ? (e)=>setPara1(e.target.value) : field?.fieldKey=='para2' ? (e)=>setPara2(e.target.value) : 
                          field?.fieldKey =='para3' ? (e)=>setPara3(e.target.value) : null }
                       />
                       

                       <h1 className='text-red-600 text-xs'>{fastTagDetails?.status_code == 500 ? fastTagDetails?.status_msg : null}</h1>

                    </div>
                  
                   )}

             {/* <div className="col-span-1 sm:col-span-1"> */}
        
        {/* <div className="flex  text-gray-700 h-3  font-semibold text-sm lg:text-md leading-none mb-3">
               <span className="">
              Date of Birth  </span>  
              </div>
          <Controller
                  control={control}
                  name="date_of_birth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    //@ts-ignore
                    <DatePicker
                    selected={birthDate}
                    onChange={(date) => {
                      setBirthDate((date));
                      setValue("date_of_birth", date);
                    }}
                    dateFormat="dd-MM-yyyy"
                    className="text-sm lg:text-md h-12 w-full px-4  bg-gray-   border-border-base rounded-sm focus:border-gray-400 no-underline "
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    peekNextMonth
                    showWeekNumbers
                    minDate={new Date(1900, 1, 1)}
                    maxDate={new Date()}
                    placeholderText={("eg..23/12/1996")}
                    // className="w-full"
              />          
                  )}
            />
    </div> */}

            {/* <div className='flex flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                />
            </div> */}

            {/* <div className='flex-1 items-center'> 
                
                <Input label = 'Mobile Number'
                        variant={variant}
                        type = 'number'

                        inputMode="numeric"
                />
            </div> */}

            {/* <Button className='' size='big'>
                Register
            </Button> */}

                <div className='hidden lg:block lg:pt-3'>
                        <Label className=''></Label>
                        <button onClick={submitFastTagDetails} 
                                className='bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                        </button>
                    </div> 

                    <button onClick={submitFastTagDetails} 
                            className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                    </button>

                </div>

    </div>
  )
}
