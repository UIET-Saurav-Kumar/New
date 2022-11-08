import { ReactNode, useContext, useState } from "react";
import React from "react";

import { createContext } from "vm";


type insuranceContextType = {

    termLifeInsurance: boolean;
    healthInsurance: boolean;
    bikeInsurance: boolean;
    carInsurance: boolean;
    investmentPlans: boolean;
    travelInsurance: boolean;
    familyHealthInsurance: boolean;
    zeroCostPlans: boolean;
    guranteedReturns: boolean;
    jeevanBima: boolean;
    retirementPlans: boolean;
    childSavingsPlans: boolean;
    groupHealthPlans: boolean;
    homeInsurance: boolean;
    petInsurance: boolean;

    termLifeInsuranceView: () => void;
    bikeInsuranceView: () => void;
    healthInsuranceView: () => void;
    carInsuranceView: () => void;
    travelInsuranceView: () => void;
    familyHealthInsuranceView: () => void;
    investmentPlansView: () => void;
    zeroCostPlansView: () => void;
    jeevanBimaView: () => void;
    guranteedReturnsView: () => void;
    retirementPlansView: () => void;
    childSavingsPlansView: () => void;
    groupHealthPlansView: () => void;
    homeInsuranceView: () => void;
    petInsuranceView: () => void;
    
}

const InsuranceContextDefaultValues : insuranceContextType = {
    termLifeInsurance: false,
    healthInsurance: true,
    bikeInsurance: false,
    carInsurance: false,
    investmentPlans: false,
    travelInsurance: false,
    familyHealthInsurance: false,
    zeroCostPlans: false,
    guranteedReturns: false,
    jeevanBima: false,
    retirementPlans: false,
    childSavingsPlans: false,
    groupHealthPlans: false,
    homeInsurance: false,
    petInsurance: false,
    // minicipality

    termLifeInsuranceView:      () => {},
    bikeInsuranceView:          () => {},
    healthInsuranceView:        () => {},
    carInsuranceView:           () => {},
    travelInsuranceView:        () => {},
    familyHealthInsuranceView:  () => {},
    investmentPlansView:        () => {},
    zeroCostPlansView:          () => {},
    jeevanBimaView:             () => {},
    guranteedReturnsView:       () => {},
    retirementPlansView:        () => {},
    childSavingsPlansView:      () => {},
    groupHealthPlansView:       () => {},
    homeInsuranceView:          () => {},
    petInsuranceView:           () => {},
}


const InsuranceContext =  React.createContext<insuranceContextType | any>(InsuranceContextDefaultValues);

export function useInsurance() {
    return useContext(InsuranceContext);
}


type Props = {
    children: ReactNode;
}


export function InsuranceProvider({children}:Props){

    const[termLifeInsurance, setTermLifeInsurance] = useState(true)
    const[healthInsurance, setHealthInsurance] = useState(false)
    const[investmentPlans, setInvestmentPlans] = useState(false);
    const[carInsurance,setCarInsurance] = useState(false);
    const[bikeInsurance, setBikeInsurance] = useState(false)
    const[travelInsurance, setTravelInsurance] = useState(false);
    const[familyHealthInsurance, setFamilyHealthInsurance] = useState(false);
    const[zeroCostPlans, setZeroCostPlans] = useState(false);
    const[jeevanBima, setJeevanBima] = useState(false);

    const[guranteedReturns, setGuranteedReturns] = useState(false);
    const[retirementPlans, setRetirementPlans] = useState(false);
    const[childSavingsPlans, setChildSavingsPlans] = useState(false);
    const[groupHealthPlans, setGroupHealthPlans] = useState(false);
    const[homeInsurance, setHomeInsurance] = useState(false);
    const[petInsurance, setPetInsurance] = useState(false);


    const  termLifeInsuranceView= () => {

      
        setTermLifeInsurance(true)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);

     }

     const  healthInsuranceView = () => {

        
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(true)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);
     }


     const bikeInsuranceView= () => {

        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(true);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);
        
      }


        const  familyHealthInsuranceView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(false);
            setBikeInsurance(false);
            setZeroCostPlans(false);
            setInvestmentPlans(false);
            setCarInsurance(false);
            setPetInsurance(false);
            setTravelInsurance(true);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }


        const  investmentPlansView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(false);
            setBikeInsurance(false);
            setZeroCostPlans(true);
            setInvestmentPlans(false);
            setCarInsurance(false);
            setPetInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }


        const carInsuranceView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(false);
            setBikeInsurance(false);
            setZeroCostPlans(false);
            setInvestmentPlans(true);
            setPetInsurance(false);
            setCarInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setChildSavingsPlans(false);
            setHomeInsurance(false);
            setGroupHealthPlans(false);
            
        }


        const travelInsuranceView = () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(false);
            setBikeInsurance(false);
            setZeroCostPlans(false);
            setInvestmentPlans(false);
            setPetInsurance(true);
            setCarInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }


        const zeroCostPlansView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(true);
            setJeevanBima(false);
            setBikeInsurance(false);
            setZeroCostPlans(false);
            setInvestmentPlans(false);
            setPetInsurance(false);
            setCarInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }


        const  jeevanBimaView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(false);
            setBikeInsurance(true);
            setZeroCostPlans(false);
            setInvestmentPlans(false);
            setPetInsurance(false);
            setCarInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false)
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }

        const  guranteedReturnsView= () => {

            setTermLifeInsurance(false);
            setFamilyHealthInsurance(false);
            setJeevanBima(true);
            setBikeInsurance(false);
            setGuranteedReturns(false);
            setZeroCostPlans(false);
            setInvestmentPlans(false);
            setPetInsurance(false);
            setCarInsurance(false);
            setTravelInsurance(false);
            setHealthInsurance(false);
            setGuranteedReturns(false);
            setRetirementPlans(false);
            setHomeInsurance(false);
            setChildSavingsPlans(false);
            setGroupHealthPlans(false);
            
        }

        const  homeInsuranceView= () => {

            
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(true);
    
         }

         const  childSavingsPlansView= () => {

            
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(true);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);
    
         }

         const  groupHealthPlansView= () => {

          
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(true);
        setGroupHealthPlans(false);
    
         }

         const  petInsuranceView= () => {

            
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(false);
        setRetirementPlans(false);
        setHomeInsurance(true);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);
    
         }

         const  retirementPlansView= () => {

           
        setTermLifeInsurance(false)
        setFamilyHealthInsurance(false);
        setJeevanBima(false);
        setBikeInsurance(false);
        setZeroCostPlans(false);
        setInvestmentPlans(false);
        setCarInsurance(false);
        setPetInsurance(false);
        setTravelInsurance(false);
        setHealthInsurance(false)
        setGuranteedReturns(true);
        setRetirementPlans(false);
        setHomeInsurance(false);
        setChildSavingsPlans(false);
        setGroupHealthPlans(false);
    
         }

      const value = {

        termLifeInsurance,
        healthInsurance,
        investmentPlans,
        carInsurance,
        bikeInsurance,
        travelInsurance,
        familyHealthInsurance,
        zeroCostPlans,
        jeevanBima,
        guranteedReturns,
        retirementPlans,
        childSavingsPlans,
        groupHealthPlans,
        homeInsurance,
        petInsurance,

        termLifeInsuranceView,
        investmentPlansView,
       carInsuranceView,
       travelInsuranceView,
       bikeInsuranceView,
        familyHealthInsuranceView,
        healthInsuranceView,
       zeroCostPlansView,
        jeevanBimaView,
        guranteedReturnsView,
        retirementPlansView,
        childSavingsPlansView,
        groupHealthPlansView,
        homeInsuranceView,
        petInsuranceView,

      }

    return (
        <>
            <InsuranceContext.Provider value = {value}>
                {children}
            </InsuranceContext.Provider>
        </>
    )
}

 




