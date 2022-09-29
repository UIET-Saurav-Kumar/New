import { ReactNode, useContext, useState } from "react";
import React from "react";

import { createContext } from "vm";


type paymentContextType = {
    mobileRecharge: boolean;
    dth: boolean;
    electricity: boolean;
    insurance: boolean;
    landline: boolean;
    broadband: boolean;
    pipedGas: boolean;

    mobileRechargeView: () => void;
    landlineView: () => void;
    dthView: () => void;
    insuranceView: () => void;
    broadbandView: () => void;
    pipedgasView: () => void;
    electricityView: () => void;

}

const paymentContextDefaultValues : paymentContextType = {
    mobileRecharge: false,
    dth: true,
    electricity: false,
    insurance: false,
    landline: false,
    broadband: false,
    pipedGas: false,

    mobileRechargeView: () => {},
    landlineView: () => {},
    dthView: () => {},
    insuranceView: () => {},
    broadbandView: () => {},
    pipedgasView: () => {},
    electricityView: () => {},
}

const PaymentContext =  React.createContext<paymentContextType | any>(paymentContextDefaultValues);

export function usePayment() {
    return useContext(PaymentContext);
}

type Props = {
    children: ReactNode;
}

export function PaymentProvider({children}:Props){

    const[mobileRecharge, setMobileRecharge] = useState(true)
    const[dth, setDth] = useState(false)
    const[electricity, setElectricity] = useState(false)
    const[insurance, setInsurance] = useState(false);
    const[landline,setLandline] = useState(false);
    const[broadband, setBroadband] = useState(false)
    const[pipedgas, setPipedGas] = useState(false);


    const  mobileRechargeView= () => {

        setMobileRecharge(true);
        setElectricity(false);
        setInsurance(false);
        setLandline(false);
        setPipedGas(false);
        setBroadband(false);
        setDth(false)

     }

     const  dthView = () => {

            setMobileRecharge(false);
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setBroadband(false);
            setPipedGas(false);
            setDth(true)
            
     }


     const  landlineView= () => {

        setMobileRecharge(false);
        setElectricity(false);
        setInsurance(false);
        setLandline(true);
        setBroadband(false);
        setPipedGas(false);
        setDth(false)
        
      }


        const  pipedGasView= () => {

            setMobileRecharge(false);
            setElectricity(false);
            setInsurance(false);
            setLandline(false);
            setBroadband(false);
            setPipedGas(true);
            setDth(false)
            
        }


        const  electricityView= () => {

            setMobileRecharge(false);
            setElectricity(true);
            setInsurance(false);
            setLandline(false);
            setBroadband(false);
            setPipedGas(false);
            setDth(false)
            
        }


        const  insuranceView= () => {

            setMobileRecharge(false);
            setElectricity(false);
            setInsurance(true);
            setBroadband(false);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            
        }


        const  broadbandView = () => {

            setMobileRecharge(false);
            setElectricity(false);
            setInsurance(false);
            setBroadband(true);
            setLandline(false);
            setPipedGas(false);
            setDth(false)
            
        }

      const value = {
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
        dthView,
      }

    return (
        <>
            <PaymentContext.Provider value = {value}>
                {children}
            </PaymentContext.Provider>
        </>
    )
}

 




