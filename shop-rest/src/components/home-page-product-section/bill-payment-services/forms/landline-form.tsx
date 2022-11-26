import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import Select from '@components/ui/select/select'
 import React, { useEffect, useState } from 'react';
 import { operators } from './mobile-recharge-form';
 import { API_ENDPOINTS } from "@utils/api/endpoints";
 import url from "@utils/api/server_url";
 import http from "@utils/api/http";
 import { useMutation } from 'react-query';

export default function LandlineForm({click,variant} :any) {

console.log('dth form',click)

const { openModal } = useModalAction();

const[loading,setLoading] = useState(false);
const[landlineInfo,setLandlineInfo]= useState(null);
const[operator, setOperator] = useState(null);
const[category, setCategory] = useState(null);
const[billerId, setBillerId] = useState(null);

const[para1,setPara1] = useState('');
const[para2, setPara2] =useState('');
const[para3,setPara3] =useState('');
const[landlineDetails,setLandlineDetails] = useState(null);

const[key1, setKey1] = useState('');
const[key2,setKey2] = useState('');
const[key3,setKey3] = useState('')

const fetchLandlineInfo = async (data:any) => {
    setLoading(true)

    console.log('biller',data)

    const { data:response } = await http.get(`${url}/${API_ENDPOINTS.LANDLINE_INFO}?biller_id=${billerId}&category=${category}`);
    setLoading(false)
    setLandlineInfo(response)
     
    console.log('biller',landlineInfo,response);
    return response;

  };

  const { mutate: mutateLandline } = useMutation(fetchLandlineInfo, {
       
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

  useEffect(() => {
      
    if(billerId && category) {

      const biller =  {
        'biller_id' :  billerId ,
        'category'   :  category,
      };

      mutateLandline(biller);
    }
  }, [operator])


    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

    function fieldKeys(){
        landlineInfo?.data?.map((field:any)=>
          field?.fieldKey=='para1' ? setKey1(field?.paramName) 
        : field?.fieldKey=='para2' ? setKey2(field?.paramName) 
        : field?.fieldKey =='para3' ? setKey3(field?.paramName) 
        : null 
        )
      }
  
      function onValueChange(option:any) {
        setLoading(true);
        setOperator(option.label)
        setOperator(option?.label)
        setBillerId(option.biller_id)
        setCategory(option?.Category)
      }

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
                        className={` ${loading ? 'w-full lg:w-1/2 flex-1' : 'w-full'}   `}
                        onChange={onValueChange}
                        options= {operators?.filter((opr)=> opr.Category=='Landline')}
                />
            </div>

            { loading ? 
                 <img src="/preloader/cir.gif" 
                 className="w-full mt-10 mx-auto" 
                 style={{width:"30px",height:"30px"}}/>
                    : 
                   landlineInfo?.data?.map((field,index)=>
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
                       <h1 className='text-red-600 text-xs'>{landlineDetails?.status_code == 500 ? landlineDetails?.status_msg : null}</h1>

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
                    <button onClick={ handleClick} className='    bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                            </button>
                </div> 

                <button onClick={ handleClick} className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                </button>

            </div>

    </div>
  )
}
