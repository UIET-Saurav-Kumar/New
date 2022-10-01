

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
import Datacard from './datacard';
import Challan from './challan';
import Cable from './cable';
import CreditCard from './creditcard';
import GooglePlay from './googleplay';
import Housing from './housing';
import GooglePlayForm from './forms/googlplay-fom';
import CableForm from './forms/cable-form';


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
              googleplay,
              cable,
              datacard,
              housing,
              challan,
              minicipality,
      
              // mobileRechargeView,
              electricityView,
              insuranceView,
              broadbandView,
              landlineView,
              pipedGasView,
              dthView,
              waterView,
              emiView,
              lpgbookingView,
              datacardView,
              challanView,
              housingView,
              cableView,
              googleplayView,
              
            } = usePayment();


  return (

       <div className='mx-2'> 

              <Label className='text-xl font-semibold text-gray-500 mt-4 px-4'> Pay your bills </Label>

              <div className='grid grid-cols-3 md-grid-cols-14 items-center overflow-x-scroll gap-3  lg:grid-cols-12 w-full bg-gradient-to-l from-gray-0 lg:gap-2 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl'>

                     {/* <MobileRecharge  view={mobileRechargeView} click={mobileRecharge}  width={60}  height={60}   label={'Mobile'}      /> */}
                     <Dth             view={dthView}            click={dth}             width={50}  height={50}   label={'Dth'}         />
                     <Electricity     view={electricityView}    click={electricity}     width={50}  height={50}   label={'Electricity'} />
                     <Insurance       view={insuranceView}      click={insurance}       width={50}  height={50}   label={'Insurance'}   />
                     <Broadband       view={broadbandView}      click={broadband}       width={50}  height={50}   label={'Broadband'}   />
                     <Landline        view={landlineView}       click={landline}        width={50}  height={50}   label={'Landline'}    />
                     <PipedGas        view={pipedGasView}       click={pipedgas}        width={50}  height={50}   label={'Piped Gas'}   />
                     <Water           view={waterView}          click={water}           width={50}  height={50}   label={'Water'}       />
                     <Emi             view={emiView}            click={emi}             width={50}  height={50}   label={'EMI'}         />
                     <LpgBooking      view={lpgbookingView}     click={lpgbooking}      width={50}  height={50}   label={'LPG Booking'} />
                     <Datacard        view={datacardView}     click={datacard}      width={50}  height={50}   label={'Datacard'}    />
                     <Challan         view={challanView}     click={challan}      width={50}  height={50}   label={'Challan'}     />
                     <Housing         view={housingView}     click={housing}      width={50}  height={50}   label={'Housing'}     />
                     {/* <Cable           view={cableView}     click={cable}      width={50}  height={50}   label={'Cable'}       />
                     <GooglePlay      view={googleplayView}     click={googleplay}      width={50}  height={50}   label={'GooglePlay'}  /> */}

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
                     <GooglePlayForm     click={googleplay}     />  
                     <CableForm          click={cable}          />

       </div>

  )
}
