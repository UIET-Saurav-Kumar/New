import React, { useState } from 'react';
import Electricity from './electricity';
import Dth from './dth';
import MobileRecharge from './mobile-recharge';
import Insurance from './insurance';
import Input from '@components/ui/input';
import Select from '@components/ui/select/select';
import { Button } from 'react-scroll';
import Label from '@components/ui/label';
import MobileRechargeForm from './forms/mobile-recharge-form';
import Broadband from './broadband';
import Landline from './landline';
import PipedGas from './piped-gas';
import DthForm from './forms/dth-form';

import { usePayment } from '@contexts/payment.context';
import ElectricityForm from './forms/electricity-form';
import InsuranceForm from './forms/insurance-form';
import LandlineForm from './forms/landline-form';
import PipedgasForm from './forms/pipedgas-form ';
import BroadbandForm from './forms/broadband-form';


export default function BillPayment() {
 

       const {
              mobileRecharge,
              electricity,
              insurance,
              landline,
              pipedgas,
              dth,
              broadband,
      
              mobileRechargeView,
              electricityView,
              insuranceView,
              broadbandView,
              landlineView,
              pipedGasView,
              dthView
            } = usePayment();


  return (

       <> 

              <Label className='text-2xl mt-4'> Pay your bills </Label>

              <div className='flex items-center overflow-x-scroll   lg:grid-cols-7 w-full bg-gradient-to-l from-gray-50 lg:gap-4 to p-3 bg-gray-50  mt-4 place-content-center rounded shadow-xl'>

                     <MobileRecharge  view={mobileRechargeView} click={mobileRecharge}  width={60}  height={60}   label={'Mobile'}      />
                     <Dth             view={dthView}            click={dth}             width={60}  height={60}   label={'Dth'}         />
                     <Electricity     view={electricityView}    click={electricity}     width={60}  height={60}   label={'Electricity'} />
                     <Insurance       view={insuranceView}      click={insurance}       width={60}  height={60}   label={'Insurance'}   />
                     <Broadband       view={broadbandView}      click={broadband}       width={60}  height={60}   label={'Broadband'}   />
                     <Landline        view={landlineView}       click={landline}        width={60}  height={60}   label={'Landline'}    />
                     <PipedGas        view={pipedGasView}       click={pipedgas}        width={60}  height={60}   label={'Piped Gas'}   />
                     
              </div>

                     <MobileRechargeForm click={mobileRecharge} />
                     <DthForm            click={dth}            />
                     <ElectricityForm    click={electricity}    />
                     <InsuranceForm      click={insurance}      />
                     <LandlineForm       click={landline}       />
                     <PipedgasForm       click={pipedgas}       />
                     <BroadbandForm      click={broadband}      />

       </>

  )
}
