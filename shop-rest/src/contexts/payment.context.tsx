import { ReactNode, useContext, useState } from "react";
import React from "react";

import { createContext } from "vm";


type paymentContextType = {

    // mobileRecharge: boolean;
    dth: boolean;
    electricity: boolean;
    insurance: boolean;
    landline: boolean;
    broadband: boolean;
    pipedGas: boolean;
    water: boolean;
    lpgbooking: boolean;
    emi: boolean;
    datacard: boolean;
    challan: boolean;
    housing: boolean;
    cable: boolean;
    googleplay: boolean;

    // mobileRechargeView: () => void;
    landlineView: () => void;
    dthView: () => void;
    insuranceView: () => void;
    broadbandView: () => void;
    pipedgasView: () => void;
    electricityView: () => void;
    waterView: () => void;
    emiView: () => void;
    lpgbookingView: () => void;
    datacardView: () => void;
    challanView: () => void;
    housingView: () => void;
    cableView: () => void;
    googleplayView: () => void;
    

}

const paymentContextDefaultValues : paymentContextType = {
    // mobileRecharge: false,
    dth: true,
    electricity: false,
    insurance: false,
    landline: false,
    broadband: false,
    pipedGas: false,
    water: false,
    lpgbooking: false,
    emi: false,
    datacard: false,
    challan: false,
    housing: false,
    cable: false,
    googleplay: false,
    


    // mobileRechargeView: () => {},
    landlineView: () => {},
    dthView: () => {},
    insuranceView: () => {},
    broadbandView: () => {},
    pipedgasView: () => {},
    electricityView: () => {},
    waterView: () => {},
    emiView: () => {},
    lpgbookingView: () => {},
    datacardView: () => {},
    challanView:  () => {},
    housingView:  () => {},
    cableView:    () => {},
    googleplayView: () => {},
}


const PaymentContext =  React.createContext<paymentContextType | any>(paymentContextDefaultValues);

export function usePayment() {
    return useContext(PaymentContext);
}


type Props = {
    children: ReactNode;
}


export function PaymentProvider({children}:Props){

    // const[mobileRecharge, setMobileRecharge] = useState(true)
    const[dth, setDth] = useState(true)
    const[electricity, setElectricity] = useState(false)
    const[insurance, setInsurance] = useState(false);
    const[landline,setLandline] = useState(false);
    const[broadband, setBroadband] = useState(false)
    const[pipedgas, setPipedGas] = useState(false);
    const[water, setWater] = useState(false);
    const[emi, setEmi] = useState(false);
    const[lpgbooking, setLpgBooking] = useState(false);

    const[datacard, setDataCard] = useState(false);
    const[challan, setChallan] = useState(false);
    const[housing, setHousing] = useState(false);
    const[cable, setCable] = useState(false);
    const[googleplay, setGooglePlay] = useState(false);


    const  mobileRechargeView= () => {

        // setMobileRecharge(true      
        setElectricity(false);
        setInsurance(false);
        setLandline(false);
        setPipedGas(false);
        setBroadband(false);
        setDth(false)
        setDataCard(false);
        setChallan(false);
        setGooglePlay(false);
        setHousing(false);
        setGooglePlay(false);
        setCable(false);

     }

     const  dthView = () => {

        // setMobileRecharge(false);
        setWater(false);
        setLpgBooking(false);
        setEmi(false);
        setElectricity(false);
        setInsurance(false);
        setLandline(false);
        setBroadband(false);
        setPipedGas(false);
        setDth(true)
        setDataCard(false);
        setChallan(false);
        setGooglePlay(false);
        setHousing(false);
        setGooglePlay(false);
        setCable(false);
            
     }


     const  landlineView= () => {

        // setMobileRecharge(false)
        setWater(false);
        setLpgBooking(false);
        setEmi(false);
        setElectricity(false);
        setInsurance(false);
        setLandline(true);
        setBroadband(false);
        setPipedGas(false);
        setDth(false)
        setDataCard(false);
        setChallan(false);
        setGooglePlay(false);
        setHousing(false);
        setGooglePlay(false);
        setCable(false);
        
      }


        const  pipedGasView= () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(false);
            setEmi(false);
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setBroadband(false);
            setPipedGas(true);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }


        const  electricityView= () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(false);
            setEmi(false);
            setElectricity(true);
            setInsurance(false);
            setLandline(false);
            setBroadband(false);
            setPipedGas(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }


        const  insuranceView= () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(false);
            setEmi(false);
            setElectricity(false);
            setInsurance(true);
            setBroadband(false);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }


        const  broadbandView = () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(false);
            setEmi(false);
            setElectricity(false);
            setInsurance(false);
            setBroadband(true);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }


        const  waterView= () => {

            // setMobileRecharge(false);
            setWater(true);
            setLpgBooking(false);
            setEmi(false);
            setElectricity(false);
            setInsurance(false);
            setBroadband(false);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }


        const  emiView= () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(false);
            setEmi(true);
            setElectricity(false);
            setInsurance(false);
            setBroadband(false);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }

        const  lpgbookingView= () => {

            // setMobileRecharge(false);
            setWater(false);
            setLpgBooking(true);
            setEmi(false);
            setDataCard(false);
            setElectricity(false);
            setInsurance(false);
            setBroadband(false);
            setLandline(false);
            setPipedGas(false);
            setDth(false);
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
            
        }

        const  cableView= () => {

            // setMobileRecharge(true      
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setPipedGas(false);
            setBroadband(false);
            setDth(false);
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(true);
    
         }

         const  challanView= () => {

            // setMobileRecharge(true      
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setPipedGas(false);
            setBroadband(false);
            setDth(false);
            setDataCard(false);
            setChallan(true);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
    
         }

         const  housingView= () => {

            // setMobileRecharge(true      
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setPipedGas(false);
            setBroadband(false);
            setDth(false);
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(true);
    
         }

         const  googlePlayView= () => {

            // setMobileRecharge(true      
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setPipedGas(false);
            setBroadband(false);
            setDth(false)
            setDataCard(false);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(true);
            setCable(false);
    
         }

         const  datacardView= () => {

            // setMobileRecharge(true      
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setPipedGas(false);
            setBroadband(false);
            setDth(false);
            setDataCard(true);
            setChallan(false);
            setGooglePlay(false);
            setHousing(false);
            setGooglePlay(false);
            setCable(false);
    
         }

      const value = {
        // mobileRecharge,
        electricity,
        insurance,
        landline,
        pipedgas,
        dth,
        broadband,
        emi,
        water,
        lpgbooking,
        datacard,
        challan,
        housing,
        cable,
        googleplay,


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
      }

    return (
        <>
            <PaymentContext.Provider value = {value}>
                {children}
            </PaymentContext.Provider>
        </>
    )
}

 




