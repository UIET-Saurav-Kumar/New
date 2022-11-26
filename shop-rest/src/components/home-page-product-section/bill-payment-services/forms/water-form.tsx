import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import Select from '@components/ui/select/select'
 import React, { useEffect, useState } from 'react'
import { operators } from './mobile-recharge-form'
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";
import http from "@utils/api/http";
import { useMutation } from 'react-query';

export default function WaterForm({click,variant} :any) {

console.log('form water',click)

const[loading,setLoading] = useState(false);


const { openModal } = useModalAction();

const[value,setValue] = useState(null);
const[operator, setOperator] = useState(null);
const[category, setCategory] = useState(null);
const[billerId, setBillerId] = useState(null);

const[para1,setPara1] = useState('');
const[para2, setPara2] =useState('');
const[para3,setPara3] =useState('');
const[waterBillDetails,setWaterBillDetails] = useState(null);

const[key1, setKey1] = useState('');
const[key2,setKey2] = useState('');
const[key3,setKey3] = useState('')

const[waterBillerInfo,setWaterBillerInfo]= useState(null);

function openBillDetails(data:any) {

    return openModal("BILL_PAYMENT_DETAILS",{
        data,
        operator,
        para: [{key1,para1},{key2,para2},{key3,para3}],
       
      // img : logoImg,
    });
  }

const fetchWaterBillInfo = async (data:any) => {
    setLoading(true)

    console.log('biller',data)

    const { data:response } = await http.get(`${url}/${API_ENDPOINTS.WATER_BILL}?biller_id=${billerId}&category=${category}`);
    setLoading(false)
     setWaterBillerInfo(response)
     
    console.log('billerInfo',waterBillerInfo,response);
    return response;

  };

  const fetchWaterBillDetails = async (data:any) => {
    setLoading(true)

    console.log('biller',data)

    const { data:response } = await http.post(`${url}/${API_ENDPOINTS.WATER_BILL_DETAILS}`,data);
    setLoading(false)
    setWaterBillDetails(response);
    console.log('billDetails',waterBillDetails)
    fieldKeys()
    return response;

  };

  const { mutate: mutateWaterBillerInfo } = useMutation(fetchWaterBillInfo, {
       
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

  const { mutate: mutateWaterBillDetails } = useMutation(fetchWaterBillDetails, {
       
    onSuccess: data => {
      data?.status_msg == 'OK' && openBillDetails(data)
      
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

      mutateWaterBillerInfo(biller);
    }
  }, [value])


function handleClick()  {
    return   openModal('BILL_PAYMENT')
}

 function onValueChange(option) {
   setValue(option.label)
   setBillerId(option?.biller_id)
   setCategory(option?.Category)
 }

 const submitBillDetails =  () => {
        
    const billDetails =  {
      'para1':   para1,
      'para2':   para2,
      'para3':    para3,
      'biller_id':billerId,
      'category': category,
    };

    console.log(billDetails)

    mutateWaterBillDetails(billDetails);
   
  };

  function fieldKeys(){
    waterBillerInfo?.data?.map((field:any)=>
      field?.fieldKey=='para1' ? setKey1(field?.paramName) 
    : field?.fieldKey=='para2' ? setKey2(field?.paramName) 
    : field?.fieldKey =='para3' ? setKey3(field?.paramName) 
    : null 
    )
  }

 console.log('value',value,billerId,category)

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
                        type='number'
                        getOptionLabel={(option: any) => option.label}
                        getOptionValue={(option: any) => option.label}
                        onChange={onValueChange}
                        className={` ${loading ? 'w-full lg:w-1/2 flex-1' : 'w-full'}   `}
                        options={operators.filter((f)=>f.Category =='Water')}
                />
            </div>

            { loading ? 
                 <img src="/preloader/cir.gif" 
                 className="w-full mt-10 mx-auto" 
                 style={{width:"30px",height:"30px"}}/>
                    : 
                   waterBillerInfo?.data?.map((field,index)=>
                    <div className='flex-1 '> 
                        <Input 
                          name={field.paramName}        
                          label={field.paramName} 
                          variant={variant}
                          type={field?.datatype.toLowerCase()}
                          inputMode={field?.datatype.toLowerCase()}
                          className='rounded ' 
                          onChange={field?.fieldKey=='para1' ? (e)=>setPara1(e.target.value) : field?.fieldKey=='para2' ? (e)=>setPara2(e.target.value) : 
                          field?.fieldKey =='para3' ? (e)=>setPara3(e.target.value) : null  }

                       />
                       <h1 className='text-red-600 text-xs'>{waterBillDetails?.status_code == 500 ? waterBillDetails?.status_msg : null}</h1>

                        
                    </div>
                   )}

            {/* <div className='flex flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                />
            </div> */}

            {/* <div className='flex-1 items-center'> 
                
                <Input label = 'Amount'
                        variant = ' '
                        type = 'number'
                />
            </div> */}

            {/* <Button className='' size='big'>
                Register
            </Button> */}


                <div className='hidden lg:block lg:pt-3'>
                        <Label className=''></Label>
                        <button onClick={submitBillDetails} 
                                className='bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                        </button>
                    </div> 

                    <button onClick={submitBillDetails} 
                            className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                    </button>

                </div>


    </div>
  )
}
