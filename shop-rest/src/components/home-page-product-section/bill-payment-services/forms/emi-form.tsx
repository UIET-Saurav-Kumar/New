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

export default function EmiForm({click,variant} :any) {

console.log('form broadband',click)

const { openModal } = useModalAction();

const[loading,setLoading] = useState(false);
    const[emiInfo,setEmiInfo]= useState(null);
    const[operator, setOperator] = useState(null);
    const[category, setCategory] = useState(null);
    const[billerId, setBillerId] = useState(null);

    const[para1,setPara1] = useState('');
    const[para2, setPara2] =useState('');
    const[para3,setPara3] =useState('');
    const[billDetails,setEmiDetails] = useState(null);

    const[key1, setKey1] = useState('');
    const[key2,setKey2] = useState('');
    const[key3,setKey3] = useState('');


    const fetchEmiInfo = async (data:any) => {

        setLoading(true)

        console.log('biller',data)
  
        const { data:response } = await http.get(`${url}/${API_ENDPOINTS.EMI_INFO}?biller_id=${billerId}&category=${category}`);
        setLoading(false)
         setEmiInfo(response)
         
        console.log('emiInfo',emiInfo,response);
        return response;

      };

      const fetchEmiDetails = async (data:any) => {
        setLoading(true)

        console.log('biller',data)
  
        const { data:response } = await http.post(`${url}/${API_ENDPOINTS.EMI_DETAILS}`,data);
        setLoading(false)
        setEmiDetails(response);
        console.log('billDetails',billDetails)
        fieldKeys()
        return response;

      };

      const { mutate: mutateBiller } = useMutation(fetchEmiInfo, {
       
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

      const { mutate: mutateEmiDetails } = useMutation(fetchEmiDetails, {
       
        onSuccess: data => {
          data?.status_msg == 'OK' && openEmiDetails(data)
          
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
  
          mutateBiller(biller);
        }
      }, [operator])

      console.log('biller name',emiInfo?.data?.map((m)=>m.paramName))



      const onSubmit = async  () => {
        
        const biller =  {
          // 'operator' :  operator ,
          'category'   : category,
          'biller_id' : billerId
        };

        mutateBiller(biller);
       
      };

      const submitEmiDetails =  () => {
        
        const billDetails =  {
          'para1':   para1,
          'para2':   para2,
          'para3':    para3,
          'biller_id':billerId,
          'category': category,
        };

        console.log(billDetails)

        mutateEmiDetails(billDetails);
       
      };
      
      console.log('bill operator',operator)


    function openEmiDetails(data:any) {

        return openModal("BILL_PAYMENT_DETAILS",{
            data,
            operator,
            para: [{key1,para1},{key2,para2},{key3,para3}],
           
          // img : logoImg,
        });
      }


      function fieldKeys(){
        emiInfo?.data?.map((field:any)=>
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

      const keywords = ['dob', 'date of birth','Date Of Birth (DDMMYYYY),date','expiry date','expiry']




function handleClick()  {
    return   openModal('BILL_PAYMENT')
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
                            options={operators.filter((opr)=> opr.Category=='Loan')}
                    />
                </div>

                { loading ? 
                 <img src="/preloader/cir.gif" 
                 className="w-full mt-10 mx-auto" 
                 style={{width:"30px",height:"30px"}}/>
                    : 
                   emiInfo?.data?.map((field,index)=>
                    <div className='flex-1 '> 
                        <Input 
                          name={field.paramName}        
                          label={field.paramName} 
                          variant={variant}
                          type={keywords.some((el)=>field?.paramName.toLowerCase().includes(el) ) ? 'date' : field?.datatype.toLowerCase()}
                          inputMode={keywords.some((el)=>field?.paramName.toLowerCase().includes(el) ) ? 'date' : field?.datatype.toLowerCase()}
                          className='rounded ' 
                          onChange={field?.fieldKey=='para1' ? (e)=>setPara1(e.target.value) : field?.fieldKey=='para2' ? (e)=>setPara2(e.target.value) : 
                          field?.fieldKey =='para3' ? (e)=>setPara3(e.target.value) : null  }

                       />
                       <h1 className='text-red-600 text-xs'>{billDetails?.status_code == 500 ? billDetails?.status_msg : null}</h1>

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
                        <button onClick={submitEmiDetails} 
                                className='bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                        </button>
                    </div> 

                    <button onClick={submitEmiDetails} 
                            className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                    </button>

                </div>

        </div>
  )
}
