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
import Water from './water';
import Emi from './emi';
import LpgBooking from './lpg-booking';
import WaterForm from './forms/water-form';
import EmiForm from './forms/emi-form';
import LpgBookingForm from './forms/lpg-booking-form';


export default function BillPayment() {
 

       const {
              mobileRecharge,
              electricity,
              insurance,
              landline,
              pipedgas,
              dth,
              broadband,
              emi,
              water,
              lpgbooking,
      
              mobileRechargeView,
              electricityView,
              insuranceView,
              broadbandView,
              landlineView,
              pipedGasView,
              dthView,
              waterView,
              emiView,
              lpgbookingView,
              
            } = usePayment();


  return (

       <div className='mx-2'> 

              <Label className='text-xl font-semibold text-gray-700 mt-4 px-4 '> Pay your bills </Label>

              <div className='grid grid-cols-3 md-grid-cols-9 items-center overflow-x-scroll gap-3  lg:grid-cols-9 w-full bg-gradient-to-l from-gray-0 lg:gap-4 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl'>

                     {/* <MobileRecharge  view={mobileRechargeView} click={mobileRecharge}  width={60}  height={60}   label={'Mobile'}      /> */}
                     <Dth             view={dthView}            click={dth}             width={100}  height={90}   label={'Dth'}         />
                     <Electricity     view={electricityView}    click={electricity}     width={100}  height={90}   label={'Electricity'} />
                     <Insurance       view={insuranceView}      click={insurance}       width={100}  height={90}   label={'Insurance'}   />
                     <Broadband       view={broadbandView}      click={broadband}       width={100}  height={90}   label={'Broadband'}   />
                     <Landline        view={landlineView}       click={landline}        width={100}  height={90}   label={'Landline'}    />
                     <PipedGas        view={pipedGasView}       click={pipedgas}        width={100}  height={90}   label={'Piped Gas'}   />
                     <Water           view={waterView}          click={water}           width={100}  height={90}   label={'Water'}       />
                     <Emi             view={emiView}            click={emi}             width={100}  height={90}   label={'EMI'}         />
                     <LpgBooking      view={lpgbookingView}     click={lpgbooking}      width={100}  height={90}   label={'Lpg Booking'} />
                     
              </div>

                     <MobileRechargeForm click={mobileRecharge} />
                     <DthForm            click={dth}            />
                     <ElectricityForm    click={electricity}    />
                     <InsuranceForm      click={insurance}      />
                     <LandlineForm       click={landline}       />
                     <PipedgasForm       click={pipedgas}       />
                     <BroadbandForm      click={broadband}      />
                     <WaterForm          click={water}          />
                     <EmiForm            click={emi}            />
                     <LpgBookingForm     click={lpgbooking}     />

       </div>

  )
}
