import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select'
import React, { useEffect, useState } from 'react'
import { operators } from './mobile-recharge-form';
import { useBillerInfoQuery } from '@data/biller-info/use-bill-payment.query';
import { handleInputChange } from 'react-select/src/utils';
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";
import http from "@utils/api/http";
import { useMutation } from 'react-query';


export default function ElectricityForm({click,variant,props} :any) {


    const { openModal } = useModalAction();

    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }
    const[operator, setOperator] = useState(null);
    const[category, setCategory] = useState(null)

    // const {
    //     data:billerInfo
    // } = useBillerInfoQuery(
    //     category: 
    //     biller_id: 
    // );

      const fetchBillerInfo = async (data:any) => {
  
        const { data:response } = await http.get(`${url}/${API_ENDPOINTS.BILLER_INFO}`);
        console.log('object',url);
        return response;
      
      };

      const { mutate: mutateBiller } = useMutation(fetchBillerInfo, {
       
        onSuccess: data => {

          // setPlans(data);
          // addOnPlansList();
          // setLoading(false);
          // setAddOnPlans(data);
          // console.log('operator',data);

        },


        onError: () => {
          alert("error")
          // setLoading(false)
        },
      
        // onSettled: () => {
        //   queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS);
        // }

      });

      const onSubmit = async  (value:any) => {
        
        const biller =  {
          'operator' :  operator ,
          'category'   :  category,
        };

        mutateBiller(biller);
       
      };
      
      console.log('operator',operator)

    // console.log('billerInfo',billerInfo)

    // useEffect( ()=> {
    //     const getData = async () => {
    //     const res = await fetch('https://localhost/hrms/Plans/getOperator')
    //     .then((response)=>response.json)

    //     return res;
    //     }
    //     console.log('res',getData())
    // })

   

    function openBillDetails(value: string, logoImg: Maybe<string> | undefined) {

        return openModal("BILL_PAYMENT_DETAILS",{
          value: value,
          img : logoImg,
        });
      }

    console.log(props)

    console.log(' form electricity ',click)

    const  handleChange = (e:any) => {
        setOperator(e.value);
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
                                value={operators.filter(function(option) {
                                  return option.value === operator;
                                })}
                                onchange={handleChange}
                                options={operators?.filter((opr)=> opr?.Category=='Electricity')}
                        />
                    </div>

                    <div className='flex-1'> 
                        <Input 
                          name='Consumer Number'        
                          label='Consumer Number'
                          variant={variant}
                          type='number'
                          inputMode="numeric"
                          className='rounded' 
                       />
                    </div>

                    {/* <div className='flex flex-col'> 
                        <Label> Circle </Label>
                        <Select label='circle'
                                variant=''
                                type='number'
                        />
                    </div> */}

                   {/* 
                    <div className='flex-1 items-center'> 
                        
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
                        <button onClick={()=> openBillDetails()} className='bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                        </button>
                    </div> 

                    <button onClick={()=> openBillDetails()} className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                    </button>

                </div>

        </div>
        
  )
}
