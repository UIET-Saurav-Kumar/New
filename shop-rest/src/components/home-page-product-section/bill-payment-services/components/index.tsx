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
  } = usePayment()

  return (
    <div className="mx-2">
      <Label className="text-xl font-semibold text-gray-500 mt-4 px-4">
        {' '}
        Pay your bills{' '}
      </Label>

      <div className="grid grid-cols-3 md-grid-cols-7 items-center overflow-x-scroll gap-3  lg:grid-cols-7 w-full bg-gradient-to-l from-gray-0 lg:gap-2 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl">
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
        {/* <GooglePlay      view={googlePlayView}     click={googleplay}      width={90}   height={90}    label={'GooglePlay'}  /> */}
      </div>

      <MobileRechargeForm variant={'border'} click={mobileRecharge} />
      <DthForm variant={'border'} click={dth} />
      <ElectricityForm variant={'border'} click={electricity} />
      <InsuranceForm variant={'border'} click={insurance} />
      <LandlineForm variant={'border'} click={landline} />
      <PipedgasForm variant={'border'} click={pipedgas} />
      <BroadbandForm variant={'border'} click={broadband} />
      <WaterForm variant={'border'} click={water} />
      <EmiForm variant={'border'} click={emi} />
      <LpgBookingForm variant={'border'} click={lpgbooking} />
      <GooglePlayForm variant={'border'} click={googleplay} />
      <CableForm variant={'border'} click={cable} />
      <ChallanForm variant={'border'} click={challan} />
      <FastTagForm variant={'border'} click={fastTag} />
      <DataCardForm variant={'border'} click={datacard} />
    </div>
  )
}
