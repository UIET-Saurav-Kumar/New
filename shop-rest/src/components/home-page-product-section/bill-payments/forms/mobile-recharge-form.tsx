
import Button from '@components/ui/button'
import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import SelectInput from '@components/ui/select-input'
import Select from '@components/ui/select/select'
import React from 'react'


 export const operators =[
 {
  id: 1,
  value: "Airtel",
  OperatorCode: "AT",
  ServiceType: "Prepaid-Mobile",
  label: "Airtel"
 },
 {
  id: 2,
  value: "BSNL Recharge\/Validity (RCV)",
  OperatorCode: "BVR",
  ServiceType: "Prepaid-Mobile",
  label: "BSNL Recharge\/Validity (RCV)"
 },
 {
  id: 3,
  value: "BSNL Special (STV)",
  OperatorCode: "BV",
  ServiceType: "Prepaid-Mobile",
  label: "BSNL Special (STV)"
 },
 {
  id: 4,
  value: "BSNL TopUp",
  OperatorCode: "BR",
  ServiceType: "Prepaid-Mobile",
  label: "BSNL TopUp"
 },
 {
  id: 5,
  value: "Idea",
  OperatorCode: "IC",
  ServiceType: "Prepaid-Mobile",
  label: "Idea"
 },
 {
  id: 6,
  value: "MTNL DELHI",
  OperatorCode: "MD",
  ServiceType: "Prepaid-Mobile",
  label: "MTNL DELHI"
 },
 {
  id: 7,
  value: "MTNL DELHI Special",
  OperatorCode: "MDS",
  ServiceType: "Prepaid-Mobile",
  label: "MTNL DELHI Special"
 },
 {
  id: 8,
  value: "MTNL MUMBAI",
  OperatorCode: "MM",
  ServiceType: "Prepaid-Mobile",
  label: "MTNL MUMBAI"
 },
 {
  id: 9,
  value: "MTNL MUMBAI SPECIAL",
  OperatorCode: "MMS",
  ServiceType: "Prepaid-Mobile",
  label: "MTNL MUMBAI SPECIAL"
 },
 {
  id: 10,
  value: "Reliance JIO",
  OperatorCode: "JIO",
  ServiceType: "Prepaid-Mobile",
  label: "Reliance JIO"
 },
 {
  id: 11,
  value: "Tata Docomo GSM",
  OperatorCode: "TD",
  ServiceType: "Prepaid-Mobile",
  label: "Tata Docomo GSM"
 },
 {
  id: 12,
  value: "Tata Docomo GSM Special",
  OperatorCode: "DS",
  ServiceType: "Prepaid-Mobile",
  label: "Tata Docomo GSM Special"
 },
 {
  id: 13,
  value: "Uninor",
  OperatorCode: "UN",
  ServiceType: "Prepaid-Mobile",
  label: "Uninor"
 },
 {
  id: 14,
  value: "Uninor Special",
  OperatorCode: "UNS",
  ServiceType: "Prepaid-Mobile",
  label: "Uninor Special"
 },
 {
  id: 15,
  value: "Vodafone",
  OperatorCode: "VF",
  ServiceType: "Prepaid-Mobile",
  label: "Vodafone"
 },
 {
  id: 16,
  value: "Aircel",
  OperatorCode: "ACP",
  ServiceType: "Postpaid-Mobile",
  label: "Aircel"
 },
 {
  id: 17,
  value: "Airtel",
  OperatorCode: "ATP",
  ServiceType: "Postpaid-Mobile",
  label: "Airtel"
 },
 {
  id: 18,
  value: "BSNL Mobile",
  OperatorCode: "BSP",
  ServiceType: "Postpaid-Mobile",
  label: "BSNL Mobile"
 },
 {
  id: 19,
  value: "Idea",
  OperatorCode: "IDP",
  ServiceType: "Postpaid-Mobile",
  label: "Idea"
 },
 {
  id: 20,
  value: "LOOP Mobile",
  OperatorCode: "LMP",
  ServiceType: "Postpaid-Mobile",
  label: "LOOP Mobile"
 },
 {
  id: 21,
  value: "MTS-Postpaid",
  OperatorCode: "MTSP",
  ServiceType: "Postpaid-Mobile",
  label: "MTS-Postpaid"
 },
 {
  id: 22,
  value: "Reliance CDMA",
  OperatorCode: "RCP",
  ServiceType: "Postpaid-Mobile",
  label: "Reliance CDMA"
 },
 {
  id: 23,
  value: "Reliance GSM",
  OperatorCode: "RGP",
  ServiceType: "Postpaid-Mobile",
  label: "Reliance GSM"
 },
 {
  id: 24,
  value: "Tata Docomo GSM",
  OperatorCode: "TDP",
  ServiceType: "Postpaid-Mobile",
  label: "Tata Docomo GSM"
 },
 {
  id: 25,
  value: "Tata Indicom",
  OperatorCode: "TIP",
  ServiceType: "Postpaid-Mobile",
  label: "Tata Indicom"
 },
 {
  id: 26,
  value: "Vodafone",
  OperatorCode: "VFP",
  ServiceType: "Postpaid-Mobile",
  label: "Vodafone"
 },
 {
  id: 27,
  value: "Airtel Landline",
  OperatorCode: "ATL",
  ServiceType: "Landline",
  label: "Airtel Landline"
 },
 {
  id: 28,
  value: "BSNL Landline",
  OperatorCode: "BSL",
  ServiceType: "Landline",
  label: "BSNL Landline"
 },
 {
  id: 29,
  value: "DOCOMO Landline",
  OperatorCode: "DOL",
  ServiceType: "Landline",
  label: "DOCOMO Landline"
 },
 {
  id: 30,
  value: "MTNL Landline",
  OperatorCode: "MTL",
  ServiceType: "Landline",
  label: "MTNL Landline"
 },
 {
  id: 31,
  value: "Reliance Landline",
  OperatorCode: "RIL",
  ServiceType: "Landline",
  label: "Reliance Landline"
 },
 {
  id: 32,
  value: "ICICI Prudential Life Insurance",
  OperatorCode: "ILI",
  ServiceType: "Insurence",
  label: "ICICI Prudential Life Insurance"
 },
 {
  id: 33,
  value: "LIC India",
  OperatorCode: "LIC",
  ServiceType: "Insurence",
  label: "LIC India"
 },
 {
  id: 34,
  value: "Max Life Insurance",
  OperatorCode: "MAX",
  ServiceType: "Insurence",
  label: "Max Life Insurance"
 },
 {
  id: 35,
  value: "Tata AIA Life Insurance",
  OperatorCode: "TLI",
  ServiceType: "Insurence",
  label: "Tata AIA Life Insurance"
 },
 {
  id: 36,
  value: "Adani Gas",
  OperatorCode: "ADNGS",
  ServiceType: "GAS",
  label: "Adani Gas"
 },
 {
  id: 37,
  value: "Gujrat Gas",
  OperatorCode: "GUJGS",
  ServiceType: "GAS",
  label: "Gujrat Gas"
 },
 {
  id: 38,
  value: "Indraprastha Gas",
  OperatorCode: "IPG",
  ServiceType: "GAS",
  label: "Indraprastha Gas"
 },
 {
  id: 39,
  value: "Mahanagar Gas",
  OperatorCode: "MAHGAS",
  ServiceType: "GAS",
  label: "Mahanagar Gas"
 },
 {
  id: 40,
  value: "Ajmer Vidhyut Vitran Nigam Ltd",
  OperatorCode: "ARE",
  ServiceType: "Electricity",
  label: "Ajmer Vidhyut Vitran Nigam Ltd"
 },
 {
  id: 41,
  value: "Bengaluru Electricity Supply",
  OperatorCode: "BBE",
  ServiceType: "Electricity",
  label: "Bengaluru Electricity Supply"
 },
 {
  id: 42,
  value: "BSES Rajdhani Power Limited - Delhi",
  OperatorCode: "BRP",
  ServiceType: "Electricity",
  label: "BSES Rajdhani Power Limited - Delhi"
 },
 {
  id: 43,
  value: "BSES Yamuna Power Limited - Delhi",
  OperatorCode: "BYP",
  ServiceType: "Electricity",
  label: "BSES Yamuna Power Limited - Delhi"
 },
 {
  id: 44,
  value: "CESC West Bengal",
  OperatorCode: "CESE",
  ServiceType: "Electricity",
  label: "CESC West Bengal"
 },
 {
  id: 45,
  value: "Chhattisgarh State Electricity Board",
  OperatorCode: "CSEB",
  ServiceType: "Electricity",
  label: "Chhattisgarh State Electricity Board"
 },
 {
  id: 46,
  value: "Dakshin Gujrat Vij",
  OperatorCode: "DGVCL",
  ServiceType: "Electricity",
  label: "Dakshin Gujrat Vij"
 },
 {
  id: 47,
  value: "DHBVN - HARYANA",
  OperatorCode: "DHE",
  ServiceType: "Electricity",
  label: "DHBVN - HARYANA"
 },
 {
  id: 48,
  value: "DNH Power - DADRA &amp;",
  OperatorCode: "NAGAR HAVELI",
  ServiceType: "DNE",
  label: "DNH Power - DADRA &amp;"
 },
 {
  id: 49,
  value: "India Power",
  OperatorCode: "IBE",
  ServiceType: "Electricity",
  label: "India Power"
 },
 {
  id: 50,
  value: "Jamshedpur Utilities &amp;",
  OperatorCode: "Services",
  ServiceType: "JUE",
  label: "Jamshedpur Utilities &amp;"
 },
 {
  id: 51,
  value: "Jodhpur Vidyut Vitran Nigam Ltd",
  OperatorCode: "DRE",
  ServiceType: "Electricity",
  label: "Jodhpur Vidyut Vitran Nigam Ltd"
 },
 {
  id: 52,
  value: "JVVNL-Jaipur Rajasthan",
  OperatorCode: "JRE",
  ServiceType: "Electricity",
  label: "JVVNL-Jaipur Rajasthan"
 },
 {
  id: 53,
  value: "Madhya Gujrat Vij",
  OperatorCode: "MGVCL",
  ServiceType: "Electricity",
  label: "Madhya Gujrat Vij"
 },
 {
  id: 54,
  value: "Madhya Kshetra Vitran - Madhya Pradesh",
  OperatorCode: "MKVMP",
  ServiceType: "Electricity",
  label: "Madhya Kshetra Vitran - Madhya Pradesh"
 },
 {
  id: 55,
  value: "Maharastra Power Distribution Ltd",
  OperatorCode: "MDE",
  ServiceType: "Electricity",
  label: "Maharastra Power Distribution Ltd"
 },
 {
  id: 56,
  value: "Noida Power Co Ltd",
  OperatorCode: "NPCL",
  ServiceType: "Electricity",
  label: "Noida Power Co Ltd"
 },
 {
  id: 57,
  value: "North Bihar Electricity",
  OperatorCode: "NBE",
  ServiceType: "Electricity",
  label: "North Bihar Electricity"
 },
 {
  id: 58,
  value: "Paschim Gujrat Vij",
  OperatorCode: "PGVCL",
  ServiceType: "Electricity",
  label: "Paschim Gujrat Vij"
 },
 {
  id: 59,
  value: "Paschim Kshetra Vitaran - MADHYA PRADESH",
  OperatorCode: "PME",
  ServiceType: "Electricity",
  label: "Paschim Kshetra Vitaran - MADHYA PRADESH"
 },
 {
  id: 60,
  value: "Punjab State Power Corp",
  OperatorCode: "PSPCL",
  ServiceType: "Electricity",
  label: "Punjab State Power Corp"
 },
 {
  id: 61,
  value: "Reliance Energy Limited",
  OperatorCode: "REE",
  ServiceType: "Electricity",
  label: "Reliance Energy Limited"
 },
 {
  id: 62,
  value: "South Bihar Electricity",
  OperatorCode: "SBE",
  ServiceType: "Electricity",
  label: "South Bihar Electricity"
 },
 {
  id: 63,
  value: "Southern Power - ANDHRA PRADESH",
  OperatorCode: "SAE",
  ServiceType: "Electricity",
  label: "Southern Power - ANDHRA PRADESH"
 },
 {
  id: 64,
  value: "Southern Power - TELANGANA",
  OperatorCode: "STE",
  ServiceType: "Electricity",
  label: "Southern Power - TELANGANA"
 },
 {
  id: 65,
  value: "Tata Power Delhi Limited - Delhi",
  OperatorCode: "TPD",
  ServiceType: "Electricity",
  label: "Tata Power Delhi Limited - Delhi"
 },
 {
  id: 66,
  value: "Torrent Power",
  OperatorCode: "TPE",
  ServiceType: "Electricity",
  label: "Torrent Power"
 },
 {
  id: 67,
  value: "Uttar Gujrat Vij",
  OperatorCode: "UGVCL",
  ServiceType: "Electricity",
  label: "Uttar Gujrat Vij"
 },
 {
  id: 68,
  value: "Airtel DTH",
  OperatorCode: "AH",
  ServiceType: "DTH",
  label: "Airtel DTH"
 },
 {
  id: 69,
  value: "Big TV",
  OperatorCode: "RB",
  ServiceType: "DTH",
  label: "Big TV"
 },
 {
  id: 70,
  value: "Dish TV",
  OperatorCode: "DT",
  ServiceType: "DTH",
  label: "Dish TV"
 },
 {
  id: 71,
  value: "Sun DTH",
  OperatorCode: "SD",
  ServiceType: "DTH",
  label: "Sun DTH"
 },
 {
  id: 72,
  value: "Tata Sky",
  OperatorCode: "TS",
  ServiceType: "DTH",
  label: "Tata Sky"
 },
 {
  id: 73,
  value: "Videocon DTH",
  OperatorCode: "VD",
  ServiceType: "DTH",
  label: "Videocon DTH"
 },
 {
  id: 74,
  value: "BSNL DC",
  OperatorCode: "BDC",
  ServiceType: "Datacard",
  label: "BSNL DC"
 },
 {
  id: 75,
  value: "MTNL Delhi DC",
  OperatorCode: "MDDC",
  ServiceType: "Datacard",
  label: "MTNL Delhi DC"
 },
 {
  id: 76,
  value: "MTNL Mumbai DC",
  OperatorCode: "MMDC",
  ServiceType: "Datacard",
  label: "MTNL Mumbai DC"
 },
 {
  id: 77,
  value: "MTS Mblaze",
  OperatorCode: "MTZ",
  ServiceType: "Datacard",
  label: "MTS Mblaze"
 },
 {
  id: 78,
  value: "MTS Mbrowse",
  OperatorCode: "MTW",
  ServiceType: "Datacard",
  label: "MTS Mbrowse"
 },
 {
  id: 79,
  value: "Reliance NetConnect 1X",
  OperatorCode: "RN",
  ServiceType: "Datacard",
  label: "Reliance NetConnect 1X"
 },
 {
  id: 80,
  value: "Reliance NetConnect 3G",
  OperatorCode: "RNG",
  ServiceType: "Datacard",
  label: "Reliance NetConnect 3G"
 },
 {
  id: 81,
  value: "Reliance NetConnect+",
  OperatorCode: "RNC",
  ServiceType: "Datacard",
  label: "Reliance NetConnect+"
 },
 {
  id: 82,
  value: "Tata Photon Whiz",
  OperatorCode: "TPW",
  ServiceType: "Datacard",
  label: "Tata Photon Whiz"
 },
 {
  id: 83,
  value: "Tata Photon+",
  OperatorCode: "TPP",
  ServiceType: "Datacard",
  label: "Tata Photon+"
 }

]

const cirleCode = [
  {
   "id": 1,
   "value": "Andhra Pradesh",
   "Circle Code": 1,
   "label": "Andhra Pradesh"
  },
  {
   "id": 2,
   "value": "Assam",
   "Circle Code": 2,
   "label": "Assam"
  },
  {
   "id": 3,
   "value": "Bihar",
   "Circle Code": 3,
   "label": "Bihar"
  },
  {
   "id": 4,
   "value": "Chennai",
   "Circle Code": 4,
   "label": "Chennai"
  },
  {
   "id": 5,
   "value": "Delhi",
   "Circle Code": 5,
   "label": "Delhi"
  },
  {
   "id": 6,
   "value": "Gujarat",
   "Circle Code": 6,
   "label": "Gujarat"
  },
  {
   "id": 7,
   "value": "Haryana",
   "Circle Code": 7,
   "label": "Haryana"
  },
  {
   "id": 8,
   "value": "Himachal Pradesh",
   "Circle Code": 8,
   "label": "Himachal Pradesh"
  },
  {
   "id": 9,
   "value": "Jammu &amp;",
   "Circle Code": "Kashmir",
   "Column4": 9,
   "label": "Jammu &amp;"
  },
  {
   "id": 10,
   "value": "Karnataka",
   "Circle Code": 10,
   "label": "Karnataka"
  },
  {
   "id": 11,
   "value": "Kerala",
   "Circle Code": 11,
   "label": "Kerala"
  },
  {
   "id": 12,
   "value": "Kolkata",
   "Circle Code": 12,
   "label": "Kolkata"
  },
  {
   "id": 13,
   "value": "Maharashtra &amp;",
   "Circle Code": "Goa (except Mumbai)",
   "Column4": 13,
   "label": "Maharashtra &amp;"
  },
  {
   "id": 14,
   "value": "Madhya Pradesh &amp;",
   "Circle Code": "Chhattisgarh",
   "Column4": 14,
   "label": "Madhya Pradesh &amp;"
  },
  {
   "id": 15,
   "value": "Mumbai",
   "Circle Code": 15,
   "label": "Mumbai"
  },
  {
   "id": 16,
   "value": "North East",
   "Circle Code": 16,
   "label": "North East"
  },
  {
   "id": 17,
   "value": "Orissa",
   "Circle Code": 17,
   "label": "Orissa"
  },
  {
   "id": 18,
   "value": "Punjab",
   "Circle Code": 18,
   "label": "Punjab"
  },
  {
   "id": 19,
   "value": "Rajasthan",
   "Circle Code": 19,
   "label": "Rajasthan"
  },
  {
   "id": 20,
   "value": "Tamil Nadu",
   "Circle Code": 20,
   "label": "Tamil Nadu"
  },
  {
   "id": 21,
   "value": "Uttar Pradesh - East",
   "Circle Code": 21,
   "label": "Uttar Pradesh - East"
  },
  {
   "id": 22,
   "value": "Uttar Pradesh - West",
   "Circle Code": 22,
   "label": "Uttar Pradesh - West"
  },
  {
   "id": 23,
   "value": "West Bengal",
   "Circle Code": 23,
   "label": "West Bengal"
  },
  {
   "id": 24,
   "value": "Jharkhand",
   "Circle Code": 24,
   "label": "Jharkhand"
  }
 ]


export const updatedIcons = operators.map((item: any) => {
     
      <div className="flex space-s-4 items-center text-body">
        <span className="flex w-4 h-4 items-center justify-center">
          {item.value}
        </span>
        <span>{item.label}</span>
      </div>
 
    return item;

});


export default function MobileRechargeForm({click,variant} :any) {

    console.log(' form recharge ',click)

    const { openModal } = useModalAction();

    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }
 


  return (

    <div className={`${click ? 'grid grid-cols-1 lg:flex lg:items-center place-content-center bg-gray-200 lg:px-6 space-x-4' : 'hidden'}`}>

        <div className = 'grid grid-cols-1 space-y-2 lg:grid-cols-4 place-content-center px-4  flex-col transition duration-500  lg:space-x-10  lg:space-y-0  lg:flex-row justify-between w-full py-3 items-center '>

            <div className='flex-1 flex-col'> 
                <Input label='Phone number'
                        variant={variant}
                        type='number'
                        className='rounded'
                />
            </div>

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select name='Operator'
                        variant=''
                        type='number'
                        // getOptionLabel={(option: any) => option?.name}
                        // getOptionValue={(option: any) => option?.id}
                        options={operators.filter((opr)=> opr.ServiceType=='Prepaid-Mobile')}
                />
            </div>

            <div className='flex-1 flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                        options={cirleCode}
                />
            </div>

            <div className = 'flex-1 items-center'> 
                <Input label = 'Amount'
                       variant={variant}
                       type = 'number'
                />
            </div>

            {/* <Button className='' size='big'>
                Register
            </Button> */}

        </div>

        <div className='hidden lg:block lg:pt-3'>
                <Label className=''></Label>
                <button onClick={handleClick} 
                        className='bg-gradient-to-r from-blue-600 to-blue-800  p-3 flex text-center 
                                   rounded text-white'>
                        Proceed
                </button>
        </div> 

        <button onClick={ handleClick} 
                className='lg:hidden  bg-gradient-to-r from-blue-600 to-blue-800  
                           p-3 flex text-center  rounded text-white'>
                Proceed
        </button>


    </div>
  )
}
