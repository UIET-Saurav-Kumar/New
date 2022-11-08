

import React from 'react';
import InvestmentPlans from './investment-plans';
import Label from '@components/ui/label';
import PipedGas from './travel-insurance';
import { usePayment } from '@contexts/payment.context';
import Water from './zero-cost-plan';
import TermLifeInsurance from './term-life';
import HealthInsurance from './health';
import BikeInsurance from './bike-insurance';
import CarInsurance from './car-insurance';
import FamilyHealthInsurance from './family-health-insurance';
import JeevanBima from './jeevan-bima';
import GuranteedReturns from './guranteed-returns';
import ChildSavingsPlans from './child-saving-plans';
import RetirementPlans from './retirement-plans';
import GroupHealthPlans from './group-health-plans';
import HomeInsurance from './home-insurance';
import PetInsurance from './pet-insurance';
import ZeroCostPlans from './zero-cost-plan';
import TravelInsurance from './travel-insurance';
import { useInsurance } from '@contexts/insurance.context';


export default function PolicyServices() {
 

       const {
              termLifeInsurance,
              healthInsurance,
              bikeInsurance,
              carInsurance,
              investmentPlans,
              travelInsurance,
              familyHealthInsurance,
              zeroCostPlans,
              guranteedReturns,
              jeevanBima,
              retirementPlans,
              childSavingsPlans,
              groupHealthPlans,
              homeInsurance,
              petInsurance,
      
              termLifeInsuranceView,
              bikeInsuranceView,
              healthInsuranceView,
              carInsuranceView,
              travelInsuranceView,
              familyHealthInsuranceView,
              investmentPlansView,
              zeroCostPlansView,
              jeevanBimaView,
              guranteedReturnsView,
              retirementPlansView,
              childSavingsPlansView,
              groupHealthPlansView,
              homeInsuranceView,
              petInsuranceView,
              
            } = useInsurance();


  return (

              <div className='mx-2'> 

                     <Label className='text-xl font-semibold text-gray-500 mt-4 px-4'>Find best insurance  </Label>

                     <div className='grid grid-cols-3 md-grid-cols-7 items-center overflow-x-scroll gap-3  lg:grid-cols-7 w-full bg-gradient-to-l from-gray-0 lg:gap-2 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl'>

                            <TermLifeInsurance     view={termLifeInsuranceView}     click={termLifeInsurance}     cn={'p-4'} width={60}   height={60}    label={'Term Life Insurance'}      />
                            <HealthInsurance       view={healthInsuranceView}       click={healthInsurance}       cn={'p-4'} width={60}   height={60}    label={'Health Insurance'}         />
                            <InvestmentPlans       view={investmentPlansView}       click={investmentPlans}       cn={'p-4'} width={60}   height={60}    label={'Investment Plans'} />
                            <CarInsurance          view={carInsuranceView}          click={carInsurance}          cn={'p-4'} width={60}   height={60}    label={'Car Insurance'}   />
                            <BikeInsurance         view={bikeInsuranceView}         click={bikeInsurance}         cn={'p-4'} width={60}   height={60}    label={'2 Wheeler Insurance'}   />
                            <TravelInsurance       view={travelInsuranceView}       click={travelInsurance}       cn={'p-4'} width={60}   height={60}    label={'Travel Insurance'}   />
                            <FamilyHealthInsurance view={familyHealthInsuranceView} click={familyHealthInsurance} cn={'p-4'} width={60}   height={60}    label={'Family Health'}    />
                            <ZeroCostPlans         view={zeroCostPlansView}         click={zeroCostPlans}         cn={'p-4'} width={60}   height={60}    label={'0 Cost Term Plan'}       />
                            <JeevanBima            view={jeevanBimaView}            click={jeevanBima}            cn={'p-4'} width={60}   height={60}    label={' Jeevan Bima'}         />
                            <GuranteedReturns      view={guranteedReturnsView}      click={guranteedReturns}      cn={'p-4'} width={60}   height={60}    label={'Guranteed Return '} />
                            <RetirementPlans       view={retirementPlansView}       click={retirementPlans}       cn={'p-4'} width={60}   height={60}    label={'Retirement Plans'}     />
                            <ChildSavingsPlans     view={childSavingsPlansView}     click={childSavingsPlans}     cn={'p-4'} width={60}   height={60}    label={' Savings Plans '}    />
                            <GroupHealthPlans      view={groupHealthPlansView}      click={groupHealthPlans}      cn={'p-4'} width={60}   height={60}    label={'All Health Plans'}     />
                            <HomeInsurance         view={homeInsuranceView}         click={homeInsurance}         cn={'p-4'} width={60}   height={60}    label={'Home Insurance'}       />
                            <PetInsurance          view={petInsuranceView}          click={petInsurance}          cn={'p-4'} width={60}   height={60}    label={'Pet Insurance'}  />

                     </div>

                            {/* <termLifeInsuranceForm  variant={'border'}   click={termLifeInsurance} />
                            <DthForm             variant={'border'}   click={dth}            />
                            <ElectricityForm     variant={'border'}   click={electricity}    />
                            <InsuranceForm       variant={'border'}   click={insurance}      />
                            <LandlineForm        variant={'border'}   click={landline}       />
                            <PipedgasForm        variant={'border'}   click={pipedgas}       />
                            <BroadbandForm       variant={'border'}   click={broadband}      />
                            <WaterForm           variant={'border'}   click={water}          />
                            <EmiForm             variant={'border'}   click={emi}            />
                            <LpgBookingForm      variant={'border'}   click={lpgbooking}     />
                            <GooglePlayForm      variant={'border'}   click={googleplay}     />  
                            <CableForm           variant={'border'}   click={cable}          />
                            <ChallanForm         variant={car'border'}   click={challan}        />
                            <HousingForm         variant={'border'}   click={housing}        />
                            <DataCardForm        variant={'border'}   click={datacard}       /> */}
              </div>        
  )
}
