

import React, { useState } from 'react';
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
 
       const [open, setOpen] = useState(false);

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

            const toggleAccordion = () => {
              setOpen(!open);
            };


  return (
   
              <div className="border rounded-lg my-4">
              <button
                className="flex items-center justify-between w-full p-4 text-lg font-medium text-left bg-gray-50 hover:bg-gray-300 focus:outline-none"
                onClick={toggleAccordion}
              >
                <span>Find best insurance </span>
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
                <div className={`grid grid-cols-3 md-grid-cols-7 items-center overflow-x-scroll gap-3  lg:grid-cols-7 w-full bg-gradient-to-l from-gray-0 lg:gap-2 to p-3 bg-gray-0  mt-4 place-content-center rounded shadow-xl`}>

                     <TermLifeInsurance     view={termLifeInsuranceView}     click={termLifeInsurance}     cn={'p-4'}  width={60}   height={60}    label={'Term Life Insurance'}   />
                     <HealthInsurance       view={healthInsuranceView}       click={healthInsurance}       cn={'p-4'}  width={60}   height={60}    label={'Health Insurance'}      />
                     <InvestmentPlans       view={investmentPlansView}       click={investmentPlans}       cn={'p-4'}  width={60}   height={60}    label={'Investment Plans'}      />
                     <CarInsurance          view={carInsuranceView}          click={carInsurance}          cn={'p-4'}  width={60}   height={60}    label={'Car Insurance'}         />
                     <BikeInsurance         view={bikeInsuranceView}         click={bikeInsurance}         cn={'p-4'}  width={60}   height={60}    label={'2 Wheeler Insurance'}   />
                     <TravelInsurance       view={travelInsuranceView}       click={travelInsurance}       cn={'p-4'}  width={60}   height={60}    label={'Travel Insurance'}      />
                     <FamilyHealthInsurance view={familyHealthInsuranceView} click={familyHealthInsurance} cn={'p-4'}  width={60}   height={60}    label={'Family Health'}         />
                     <ZeroCostPlans         view={zeroCostPlansView}         click={zeroCostPlans}         cn={'p-4'}  width={60}   height={60}    label={'0 Cost Term Plan'}      />
                     <JeevanBima            view={jeevanBimaView}            click={jeevanBima}            cn={'p-4'}  width={60}   height={60}    label={' Jeevan Bima'}          />
                     <GuranteedReturns      view={guranteedReturnsView}      click={guranteedReturns}      cn={'p-4'}  width={60}   height={60}    label={'Guranteed Return '}     />
                     <RetirementPlans       view={retirementPlansView}       click={retirementPlans}       cn={'p-4'}  width={60}   height={60}    label={'Retirement Plans'}      />
                     <ChildSavingsPlans     view={childSavingsPlansView}     click={childSavingsPlans}     cn={'p-4'}  width={60}   height={60}    label={' Savings Plans '}       />
                     <GroupHealthPlans      view={groupHealthPlansView}      click={groupHealthPlans}      cn={'p-4'}  width={60}   height={60}    label={'All Health Plans'}      />
                     <HomeInsurance         view={homeInsuranceView}         click={homeInsurance}         cn={'p-4'}  width={60}   height={60}    label={'Home Insurance'}        />
                     {/* <PetInsurance      view={petInsuranceView}          click={petInsurance}          cn={'p-4'} width={60}   height={60}    label={'Pet Insurance'}  /> */}

                     </div>
                </div>
              </div>
            </div>
  )
}
