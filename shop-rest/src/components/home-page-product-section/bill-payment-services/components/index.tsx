import React, { useState } from 'react'
import Electricity from './electricity'
import Dth from './dth'
import MobileRecharge from './mobile-recharge'
import Insurance from './insurance'
import Input from '@components/ui/input'
import Select from '@components/ui/select/select'
import { Button } from 'react-scroll'
import Label from '@components/ui/label'
import MobileRechargeForm from '../forms/mobile-recharge-form'
import Broadband from './broadband'
import Landline from './landline'
import PipedGas from './piped-gas'
import DthForm from '../forms/dth-form'
import { usePayment } from '@contexts/payment.context'
import ElectricityForm from '../forms/electricity-form'
import InsuranceForm from '../forms/insurance-form'
import LandlineForm from '../forms/landline-form'
import PipedgasForm from '../forms/pipedgas-form '
import BroadbandForm from '../forms/broadband-form'
import Water from './water'
import Emi from './emi'
import LpgBooking from './lpg-booking'
import WaterForm from '../forms/water-form'
import EmiForm from '../forms/emi-form'
import LpgBookingForm from '../forms/lpg-booking-form'
import Datacard from './datacard'
import Challan from './challan'
import Cable from './cable'
import CreditCard from './creditcard'
import GooglePlay from './googleplay'
import FastTag from './fast-tag'
import GooglePlayForm from '../forms/google-play-form'
import CableForm from '../forms/cable-form'
import ChallanForm from '../forms/challan-form'
import FastTagForm from '../forms/fast-tag-form'
import DataCardForm from '../forms/datacard-form'


export default function BillPayment() {

  const [open, setOpen] = useState(false);

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
    fastTag,
    challan,
    minicipality,

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
    datacardView,
    challanView,
    housingView,
    cableView,
    googlePlayView,
  } = usePayment();

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className="border rounded-lg my-4">
      <button
        className="flex items-center justify-between w-full p-4 text-lg font-medium text-left bg-gray-50 hover:bg-gray-300 focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>Pay your bills </span>
        <svg
          className={`w-6 h-6 transition-transform transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
        <div
          className={`overflow-hidden transition-all ${
            open ? 'max-h-full' : 'max-h-0'
          }`}
        >
        <div className="p-4">
      <div className={` ${open ? 'block' : 'hidden'} grid grid-cols-3 md-grid-cols-7 items-center overflow-x-scroll gap-3  lg:grid-cols-7 w-full bg-gradient-to-l from-gray-0 lg:gap-2 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl`}>
        <MobileRecharge
          view={mobileRechargeView}
          click={mobileRecharge}
          width={90}
          height={90}
          label={'Mobile'}
        />
        <Dth 
					view={dthView} 
					click={dth} 
					width={90} 
					height={90} 
					label={'Dth'} 
				/>
        <Electricity
          view={electricityView}
          click={electricity}
          width={90}
          height={90}
          label={'Electricity'}
        />
        <Insurance
          view={insuranceView}
          click={insurance}
          width={90}
          height={90}
          label={'Insurance'}
        />
        <Broadband
          view={broadbandView}
          click={broadband}
          width={90}
          height={90}
          label={'Broadband'}
        />
        <Landline
          view={landlineView}
          click={landline}
          width={90}
          height={90}
          label={'Landline'}
        />
        {/* <PipedGas        view={pipedGasView}       click={pipedgas}        width={90}   height={90}    label={'Piped Gas'}   /> */}
        <Water
          view={waterView}
          click={water}
          width={90}
          height={90}
          label={'Water'}
        />
        <Emi view={emiView} click={emi} width={90} height={90} label={'EMI'} />
        <LpgBooking
          view={lpgbookingView}
          click={lpgbooking}
          width={90}
          height={90}
          label={'LPG Booking'}
        />
        {/* <Datacard        view={datacardView}       click={datacard}        width={90}   height={90}    label={'Datacard'}    /> */}
        {/* <Challan         view={challanView}        click={challan}         width={90}   height={90}    label={'Challan'}     /> */}
        <FastTag
          view={housingView}
          click={fastTag}
          width={90}
          height={90}
          label={' FastTag'}
        />
        <Cable
          view={cableView}
          click={cable}
          width={90}
          height={90}
          label={'Cable'}
        />
       </div>
        
         
            

      {open && <MobileRechargeForm variant={'border'} click={mobileRecharge} /> }
      {open && <DthForm variant={'border'} click={dth} /> }
      {open && <ElectricityForm variant={'border'} click={electricity} /> }
      {open && <InsuranceForm variant={'border'} click={insurance} /> }
      {open && <LandlineForm variant={'border'} click={landline} /> }
      {open && <PipedgasForm variant={'border'} click={pipedgas} /> }
      {open && <BroadbandForm variant={'border'} click={broadband} /> }
      {open && <WaterForm variant={'border'} click={water} /> }
      {open && <EmiForm variant={'border'} click={emi} /> }
      {open && <LpgBookingForm variant={'border'} click={lpgbooking} /> }
      {open && <GooglePlayForm variant={'border'} click={googleplay} /> }
      {open && <CableForm variant={'border'} click={cable} /> }
      {open && <ChallanForm variant={'border'} click={challan} /> }
      {open && <FastTagForm variant={'border'} click={fastTag} /> }
      {open && <DataCardForm variant={'border'} click={datacard} /> }
      </div>
    </div>
    </div>
  )
}
