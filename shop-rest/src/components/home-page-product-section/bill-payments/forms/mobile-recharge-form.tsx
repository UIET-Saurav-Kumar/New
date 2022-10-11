
import Button from '@components/ui/button'
import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import SelectInput from '@components/ui/select-input'
import Select from '@components/ui/select/select'
import React from 'react'
import { useEffect } from 'react'

export async function getServerSideProps(context) {
  const res = await fetch(`https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid=EZ929952&apikey=C019FB28E2&biller_id=VASA00000THAE9&category=Water`)
  const data = await res.json()
  console.log('data',data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data
    }, // will be passed to the page component as props
  }
}


 export const operators =[
    {
     "S No": 1,
     "OperatorName": "Airtel",
     "OperatorCode": "AT",
     "Category": "Prepaid-Mobile",
     "label": "Airtel"
    },
    {
     "S No": 2,
     "OperatorName": "BSNL Recharge\/Validity (RCV)",
     "OperatorCode": "BVR",
     "Category": "Prepaid-Mobile",
     "label": "BSNL Recharge\/Validity (RCV)"
    },
    {
     "S No": 3,
     "OperatorName": "BSNL Special (STV)",
     "OperatorCode": "BV",
     "Category": "Prepaid-Mobile",
     "label": "BSNL Special (STV)"
    },
    {
     "S No": 4,
     "OperatorName": "BSNL TopUp",
     "OperatorCode": "BR",
     "Category": "Prepaid-Mobile",
     "label": "BSNL TopUp"
    },
    {
     "S No": 5,
     "OperatorName": "Idea",
     "OperatorCode": "IC",
     "Category": "Prepaid-Mobile",
     "label": "Idea"
    },
    {
     "S No": 6,
     "OperatorName": "MTNL DELHI",
     "OperatorCode": "MD",
     "Category": "Prepaid-Mobile",
     "label": "MTNL DELHI"
    },
    {
     "S No": 7,
     "OperatorName": "MTNL DELHI Special",
     "OperatorCode": "MDS",
     "Category": "Prepaid-Mobile",
     "label": "MTNL DELHI Special"
    },
    {
     "S No": 8,
     "OperatorName": "MTNL MUMBAI",
     "OperatorCode": "MM",
     "Category": "Prepaid-Mobile",
     "label": "MTNL MUMBAI"
    },
    {
     "S No": 9,
     "OperatorName": "MTNL MUMBAI SPECIAL",
     "OperatorCode": "MMS",
     "Category": "Prepaid-Mobile",
     "label": "MTNL MUMBAI SPECIAL"
    },
    {
     "S No": 10,
     "OperatorName": "Reliance JIO",
     "OperatorCode": "JIO",
     "Category": "Prepaid-Mobile",
     "label": "Reliance JIO"
    },
    {
     "S No": 11,
     "OperatorName": "Tata Docomo GSM",
     "OperatorCode": "TD",
     "Category": "Prepaid-Mobile",
     "label": "Tata Docomo GSM"
    },
    {
     "S No": 12,
     "OperatorName": "Tata Docomo GSM Special",
     "OperatorCode": "DS",
     "Category": "Prepaid-Mobile",
     "label": "Tata Docomo GSM Special"
    },
    {
     "S No": 13,
     "OperatorName": "Uninor",
     "OperatorCode": "UN",
     "Category": "Prepaid-Mobile",
     "label": "Uninor"
    },
    {
     "S No": 14,
     "OperatorName": "Uninor Special",
     "OperatorCode": "UNS",
     "Category": "Prepaid-Mobile",
     "label": "Uninor Special"
    },
    {
     "S No": 15,
     "OperatorName": "Vodafone",
     "OperatorCode": "VF",
     "Category": "Prepaid-Mobile",
     "label": "Vodafone"
    },
    {
     "S No": 16,
     "OperatorName": "Aircel",
     "OperatorCode": "ACP",
     "Category": "Postpaid-Mobile",
     "label": "Aircel"
    },
    {
     "S No": 17,
     "OperatorName": "Airtel",
     "OperatorCode": "ATP",
     "Category": "Postpaid-Mobile",
     "label": "Airtel"
    },
    {
     "S No": 18,
     "OperatorName": "BSNL Mobile",
     "OperatorCode": "BSP",
     "Category": "Postpaid-Mobile",
     "label": "BSNL Mobile"
    },
    {
     "S No": 19,
     "OperatorName": "Idea",
     "OperatorCode": "IDP",
     "Category": "Postpaid-Mobile",
     "label": "Idea"
    },
    {
     "S No": 20,
     "OperatorName": "LOOP Mobile",
     "OperatorCode": "LMP",
     "Category": "Postpaid-Mobile",
     "label": "LOOP Mobile"
    },
    {
     "S No": 21,
     "OperatorName": "MTS-Postpaid",
     "OperatorCode": "MTSP",
     "Category": "Postpaid-Mobile",
     "label": "MTS-Postpaid"
    },
    {
     "S No": 22,
     "OperatorName": "Reliance CDMA",
     "OperatorCode": "RCP",
     "Category": "Postpaid-Mobile",
     "label": "Reliance CDMA"
    },
    {
     "S No": 23,
     "OperatorName": "Reliance GSM",
     "OperatorCode": "RGP",
     "Category": "Postpaid-Mobile",
     "label": "Reliance GSM"
    },
    {
     "S No": 24,
     "OperatorName": "Tata Docomo GSM",
     "OperatorCode": "TDP",
     "Category": "Postpaid-Mobile",
     "label": "Tata Docomo GSM"
    },
    {
     "S No": 25,
     "OperatorName": "Tata Indicom",
     "OperatorCode": "TIP",
     "Category": "Postpaid-Mobile",
     "label": "Tata Indicom"
    },
    {
     "S No": 26,
     "OperatorName": "Vodafone",
     "OperatorCode": "VFP",
     "Category": "Postpaid-Mobile",
     "label": "Vodafone"
    },
  {
   "biller_id": "APDCL0000ASM01",
   "label": "Assam Power Distribution Company Ltd (RAPDR)",
   "value": "APDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "AVVNL0000RAJ01",
   "label": "Ajmer Vidyut Vitran Nigam Limited (AVVNL)",
   "value": "AVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BESCOM000KAR01",
   "label": "Bangalore Electricity Supply Co. Ltd (BESCOM)",
   "value": "BESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BEST00000MUM01",
   "label": "B.E.S.T Mumbai",
   "value": "BEST",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BSESRAJPLDEL01",
   "label": "BSES Rajdhani Power Limited",
   "value": "BSES RPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BSESYAMPLDEL01",
   "label": "BSES Yamuna Power Limited",
   "value": "BSES YPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESC00000KOL01",
   "label": "CESC Limited",
   "value": "CESC",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CSPDCL000CHH01",
   "label": "Chhattisgarh State Power Distribution Co. Ltd",
   "value": "CSPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DDED00000DAD01",
   "label": "Daman and Diu Electricity",
   "value": "DDED",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DGVCL0000GUJ01",
   "label": "Dakshin Gujarat Vij Company Limited (DGVCL)",
   "value": "DGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "DHBVN0000HAR01",
   "label": "Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
   "value": "DHBVN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DNHPDCL0DNH001",
   "label": "DNH Power Distribution Company Limited",
   "value": "DNHPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GESCOM000KAR01",
   "label": "Gulbarga Electricity Supply Company Limited",
   "value": "GESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JBVNL0000JHA01",
   "label": "Jharkhand Bijli Vitran Nigam Limited (JBVNL)",
   "value": "JBVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JDVVNL000RAJ01",
   "label": "Jodhpur Vidyut Vitran Nigam Limited (JDVVNL)",
   "value": "JDVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JUSC00000JAM01",
   "label": "Jamshedpur Utilities",
   "value": "JUSCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JVVNL0000RAJ01",
   "label": "Jaipur Vidyut Vitran Nigam (JVVNL)",
   "value": "JVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MAHA00000MAH01",
   "label": "Maharashtra State Electricity Distbn Co Ltd",
   "value": "MSEDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MGVCL0000GUJ01",
   "label": "Madhya Gujarat Vij Company Limited (MGVCL)",
   "value": "MGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPDC00000MEG01",
   "label": "Meghalaya Power Dist Corp Ltd",
   "value": "MEPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPPK00000MAP01",
   "label": "M.P. Paschim Kshetra Vidyut Vitaran",
   "value": "MPPKVVCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NBPDCL000BHI01",
   "label": "North Bihar Power Distribution Company Ltd.",
   "value": "NBPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NESCO0000ODI01",
   "label": "NESCO\t Odisha",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "NPCL00000NOI01",
   "label": "Noida Power",
   "value": "NPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "PGVCL0000GUJ01",
   "label": "Paschim Gujarat Vij Company Limited (PGVCL)",
   "value": "PGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "PSPCL0000PUN01",
   "label": "Punjab State Power Corporation Ltd (PSPCL)",
   "value": "PSPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SBPDCL000BHI01",
   "label": "South Bihar Power Distribution Company Ltd.",
   "value": "SBPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SOUTHCO00ODI01",
   "label": "TP Southern Odisha Distribution Limited",
   "value": "SOUTHCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TATAPWR00DEL01",
   "label": "Tata Power - Delhi",
   "value": "TATA PWR - DEL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TATAPWR00MUM01",
   "label": "Tata Power - Mumbai",
   "value": "TATA PWR - MUM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TNEB00000TND01",
   "label": "Tamil Nadu Electricity Board (TNEB)",
   "value": "TNEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000AGR01",
   "label": "Torrent Power - Agra",
   "value": "TOR PWR - AGR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000AHM02",
   "label": "Torrent Power - Ahmedabad",
   "value": "TOR PWR - AHM",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000BHW03",
   "label": "Torrent Power - Bhiwandi",
   "value": "TOR PWR - BHI",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000SUR04",
   "label": "Torrent Power - Surat",
   "value": "TOR PWR - SUR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TSEC00000TRI01",
   "label": "Tripura Electricity Corp Ltd",
   "value": "TSECL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UGVCL0000GUJ01",
   "label": "Uttar Gujarat Vij Company Limited (UGVCL)",
   "value": "UGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "UHBVN0000HAR01",
   "label": "Uttar Haryana Bijli Vitran Nigam (UHBVN)",
   "value": "UHBVN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UPPCL0000UTP01",
   "label": "Uttar Pradesh Power Corp Ltd (UPPCL) - URBAN",
   "value": "UPPCL URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UPPCL0000UTP02",
   "label": "Uttar Pradesh Power Corp Ltd (UPPCL) - RURAL",
   "value": "UPPCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WESCO0000ODI01",
   "label": "TP Western Odisha Distribution Limited",
   "value": "WESCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "APDCL0000ASM02",
   "label": "Assam Power Distribution Company Ltd (NON-RAPDR)",
   "value": "APDCL NON-RAPDR",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESCOM000KAR01",
   "label": "Chamundeshwari Electricity Supply Corp Ltd (CESCOM)",
   "value": "CESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "HESCOM000KAR01",
   "label": "Hubli Electricity Supply Company Ltd (HESCOM)",
   "value": "HESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPCZ00000MAP01",
   "label": "M.P. Madhya Kshetra Vidyut Vitaran - URBAN",
   "value": "MPMKVVCL URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPCZ00000MAP02",
   "label": "M.P. Madhya Kshetra Vidyut Vitaran - RURAL",
   "value": "MPMKVVCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NDMC00000DEL02",
   "label": "New Delhi Municipal Council (NDMC) - Electricity",
   "value": "NDMC ELECTRICITY",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WBSEDCL00WBL01",
   "label": "West Bengal State Electricity Distribution Co. Ltd (WBSEDCL)",
   "value": "WBSEDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPEZ00000MAP02",
   "label": "M.P. Poorv Kshetra Vidyut Vitaran - RURAL",
   "value": "MPPKVVCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SKPR00000SIK01",
   "label": "Sikkim Power - RURAL",
   "value": "SKMPWR RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BESLOB000RAJ02",
   "label": "Bharatpur Electricity Services Ltd. (BESL)",
   "value": "BESL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BKESL0000RAJ02",
   "label": "Bikaner Electricity Supply Limited (BkESL)",
   "value": "BKESL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KEDLOB000RAJ02",
   "label": "Kota Electricity Distribution Limited (KEDL)",
   "value": "KEDL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "RELI00000MUM03",
   "label": "Adani Electricity Mumbai Limited",
   "value": "ADANI",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TPADL0000AJM02",
   "label": "TP Ajmer Distribution Ltd (TPADL)",
   "value": "TPADL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KESCO0000UTP01",
   "label": "Kanpur Electricity Supply Company",
   "value": "KESCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GED000000GOA01",
   "label": "Goa Electricity Department",
   "value": "GED",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DOPN00000NAG01",
   "label": "Department of Power\t Nagaland",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "MESCOM000KAR01",
   "label": "Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR",
   "value": "MESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SKPR00000SIK02",
   "label": "Sikkim Power - URBAN",
   "value": "SKMPWR URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESU00000ODI01",
   "label": "TP Central Odisha Distribution Ltd.",
   "value": "CESU",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KSEBL0000KER01",
   "label": "Kerala State Electricity Board Ltd. (KSEBL)",
   "value": "KSEBL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "PEDM00000MIZ01",
   "label": "Power & Electricity Department - Mizoram",
   "value": "PEDM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "HPSEB0000HIP02",
   "label": "Himachal Pradesh State Electricity Board",
   "value": "HPSEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GOVE00000PUDN0",
   "label": "Government of Puducherry Electricity Department",
   "value": "PYEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPPO00000MAP0Y",
   "label": "MP Poorva Kshetra Vidyut Vitaran Co. Ltd Jabalpur - NGB billing system",
   "value": "MPJNRAP",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "ELEC00000CHA3L",
   "label": "Electricity Department Chandigarh",
   "value": "CHD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000NATLX",
   "label": "Torrent Power",
   "value": "TOR PWR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "DEPA00000NATES",
   "label": "Department of Power\t Government of Arunachal Pradesh",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "UTTA00000UTT7M",
   "label": "Uttarakhand Power Corporation Limited",
   "value": "UPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JAMM00000JAKCP",
   "label": "Jammu and Kashmir Power Development Department",
   "value": "JKPDD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MANG00000KAR75",
   "label": "Mangalore Electricity Supply Company LTD (Non RAPDR)",
   "value": "Mangalore Electricity Supply Company LTD (Non RAPD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WEST00000WBL75",
   "label": "West Bengal Electricity",
   "value": "WBSEDCLOB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "LAKS00000LAKP8",
   "label": "Lakshadweep Electricity Department",
   "value": "Lakshadweep Electricity Department",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GIFT00000GUJ6Z",
   "label": "Gift Power Company Limited",
   "value": "Gift Power Company Limited",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KANN00000KERXX",
   "label": "Kannan Devan Hills Plantations Company Private Limited",
   "value": "KDHPCPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DEPA00000ARPD5",
   "label": "Department of Power\t Government of Arunachal Pradesh - Prepaid",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "INDI00000NATTR",
   "label": "Indian Highways Management Company Ltd FASTag",
   "value": "IHMCL FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "INDU00000NATR2",
   "label": "IndusInd Bank FASTag",
   "value": "IBL FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "BANK00000NATDH",
   "label": "Bank of Baroda - Fastag",
   "value": "BOBFAST",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "TOLL00000NAT72",
   "label": "ICICI Bank Fastag",
   "value": "ICICI Fastag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "AXIS00000NATSN",
   "label": "Axis Bank FASTag",
   "value": "AXISBFTG",
   "is_fetch": 0,
   "Category": "FastTag"
  },
  {
   "biller_id": "IDFC00000NATXM",
   "label": "IDFC FIRST Bank - FasTag",
   "value": "IDFC",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "HDFC00000NAT5K",
   "label": "HDFC Bank - Fastag",
   "value": "HDFCFAST",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "KOTA00000NATJZ",
   "label": "Kotak Mahindra Bank - Fastag",
   "value": "KMB",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "EQUI00000NATNF",
   "label": "Equitas FASTag Recharge",
   "value": "EQTSFT",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "THEF00000NATZO",
   "label": "Federal Bank - FASTag",
   "value": "The Federal Bank Limited",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "PAYT00000NATTQ",
   "label": "Paytm Payments Bank FASTag",
   "value": "PPBLFASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "TRAN00000NATSE",
   "label": "Transaction Analyst (T Wallet\t TA Wallet and TAG-ITI Wallet)",
   "value": 0,
   "is_fetch": "FastTag"
  },
  {
   "biller_id": "PAUL00000NATKI",
   "label": "Paul Merchants",
   "value": "Paul Merchants",
   "is_fetch": 0,
   "Category": "FastTag"
  },
  {
   "biller_id": "JAMM00000NATWB",
   "label": "Jammu and Kashmir Bank Fastag",
   "value": "Jammu and Kashmir Bank FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "IDBI00000NATK7",
   "label": "IDBI Bank Fastag",
   "value": "IDBI FASTAG",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "RELIGARENBC001",
   "label": "Religare Health Insurance Co Ltd.",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTUREGENLIFENBC001",
   "label": "Future Generali Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BALICNBC0001",
   "label": "Bajaj Allianz Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "HDFC00000NATV4",
   "label": "HDFC Life Insurance Co. Ltd.",
   "value": "HDFC Life",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NATQ9",
   "label": "Care Health Insurance",
   "value": "Religare",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "EXID00000NAT25",
   "label": "Exide Life Insurance",
   "value": "EXIDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "PRAM00000NATYI",
   "label": "Pramerica Life Insurance Limited",
   "value": "DHFLPRL",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTU00000NAT09",
   "label": "Future Generali India Life Insurance Company Limited",
   "value": "FG life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "TATA00000NATLP",
   "label": "TATA AIA Life Insurance",
   "value": "TATAAIA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NATRI",
   "label": "Shriram Life Insurance Co Ltd",
   "value": "SHRLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ICICILOMNBC0001",
   "label": "ICICI Lombard Motor Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUGEGNNBC001",
   "label": "Future Generali General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTEGENHLNBC0001",
   "label": "Future Generali Health Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NAT3O",
   "label": "Reliance Nippon Life Insurance",
   "value": "RNLIC",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "STAR00000NATXZ",
   "label": "Star Union Dai Ichi Life Insurance",
   "value": "SUDILI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BAJA00000NATP5",
   "label": "Bajaj Allianz Life Insurance Company Limited",
   "value": "BJALI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NATBP",
   "label": "Reliance General Insurance Company Limited",
   "value": "RGI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BAJA00000NAT58",
   "label": "Bajaj Allianz General Insurance",
   "value": "BAGIC",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "AVIV00000NAT5I",
   "label": "Aviva Life Insurance",
   "value": "AVIVA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAXB00000NAT28",
   "label": "Max Bupa Health Insurance",
   "value": "MAXBUPA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NATKR",
   "label": "Shriram General Insurance (Old)",
   "value": "Shriram General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "AEGO00000NATRJ",
   "label": "Aegon Life Insurance",
   "value": "Aegon",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ROYA00000NAT2C",
   "label": "Royal Sundaram General Insurance Co. Limited",
   "value": "Royal Sundaram General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NAT61",
   "label": "Magma HDI - Motor Insurance",
   "value": "magmahdi_motor",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NAT6B",
   "label": "Magma HDI - Health Insurance",
   "value": "magmahdi_health",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NATQI",
   "label": "Magma HDI - Non Motor Insurance",
   "value": "magmahdi life",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SBIL00000NATT0",
   "label": "SBI Life Insurance Company Limited",
   "value": "SBI Life Insurance Company Limited",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "KOTA00000NATDP",
   "label": "Kotak Life Insurance Company Limited",
   "value": "Kotak Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "CANA00000NATPI",
   "label": "Canara HSBC OBC Life Insurance",
   "value": "Canara HSBC OBC Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ICIC00000NATGF",
   "label": "ICICI Prudential Life Insurance - New",
   "value": "IPRU",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAXL00000NAT0Q",
   "label": "Max Life Insurance Company Limited",
   "value": "Max Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "IDBI00000NATRX",
   "label": "Ageas Federal Life Insurance Company Limited",
   "value": "IDBIFEDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ADIT00000NATVO",
   "label": "Aditya Birla Health Insurance Co Limited",
   "value": "Aditya Birla Health Insurance Co Limited",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "EXID00000NATSX",
   "label": "Exide Life Insurance",
   "value": "EXIDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "PRAM00000NATDP",
   "label": "Pramerica Life Insurance Limited",
   "value": "DHFLPRL",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NAT51",
   "label": "Shriram General Insurance",
   "value": "Shriram General Insurance Co. Ltd.",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "INDI00000NAT3L",
   "label": "IndiaFirst Life Insurance Company Ltd",
   "value": "IFLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "HOMECRDTNBC001",
   "label": "Home Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTHOOTNBC001",
   "label": "Muthoot",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINTREENBC001",
   "label": "FinTree Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ZESTMONEYNBC001",
   "label": "ZEST Money",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MANAPPURAMNBC001",
   "label": "Manappuram",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJAJFINNBC0001",
   "label": "Bajaj Finserv Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BFL000000NAT01",
   "label": "Bajaj Finance",
   "value": "BFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IDFC00000NATCK",
   "label": "IDFC FIRST Bank Ltd",
   "value": "IDFB",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "PAIS00000NATCV",
   "label": "Paisa Dukan-Borrower EMI",
   "value": "PAISA DUKAN -Borrower EMI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LAMP00000NAT7E",
   "label": "L and T Financial Services",
   "value": "LTFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FLEX00000NATJL",
   "label": "Flexsalary",
   "value": "FLEX SALARY",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LOKS00000NATC9",
   "label": "Loksuvidha",
   "value": "LOKSUVIDHA",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MOTI00000NATHD",
   "label": "Motilal Oswal Home Finance",
   "value": "MOTILAL OSWAL HOME FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SNAP00000NAT61",
   "label": "Snapmint",
   "value": "SNAP MINT",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TATA00000NATGS",
   "label": "Tata Capital Financial Services Limited",
   "value": "TATA CAPITAL FINANCIAL SERVICES LIMITED",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADIT00000NATRA",
   "label": "Aditya Birla Housing Finance Limited",
   "value": "ABHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT7D",
   "label": "Shriram City Union Finance Ltd",
   "value": "SRCUFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NAT2P",
   "label": "Dhani Loan & Services Ltd",
   "value": "IBCF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LAND00000NATRD",
   "label": "L and T Housing Finance",
   "value": "LTHF",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HERO00000NAT7F",
   "label": "Hero FinCorp Limited - Old",
   "value": "HFCL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AAVA00000NATMF",
   "label": "AAVAS FINANCIERS LIMITED",
   "value": "AAVAS FINANCIERS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATYG",
   "label": "Indiabulls Housing Finance Limited",
   "value": "IBHF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AVAI00000NAT7J",
   "label": "Avail",
   "value": "Avail",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATV1",
   "label": "Bajaj Auto Finance",
   "value": "BAJAJ AUTO FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JANA00000NATO4",
   "label": "Jana Small Finance Bank",
   "value": "JSFB",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CMFINANCENBC0001",
   "label": "Chaitanya Micro Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DGFINANCENBC0001",
   "label": "Digamber Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CLIX00000NATST",
   "label": "Clix",
   "value": "Clix",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VART00000NATHC",
   "label": "Varthana",
   "value": "Varthana",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAPR00000NATC0",
   "label": "Capri Global Capital Limited",
   "value": "Capri Global Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAPR00000NATUB",
   "label": "Capri Global Housing Finance",
   "value": "Capri Global Housing",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ESSK00000NATFR",
   "label": "Ess Kay Fincorp Limited",
   "value": "ESS KAY FINCORP",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FAIR00000NAT6Z",
   "label": "Faircent-Borrower EMI Account",
   "value": "Faircent-Borrower EMI Account",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "I2IF00000NAT6K",
   "label": "i2i Funding-Borrower EMI Repayment",
   "value": "I2I",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MANA00000NATWG",
   "label": "Manappuram Finance Limited-Vehicle Loan",
   "value": "MFL-Vehicle Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AROH00000WBL0I",
   "label": "Arohan Financial Services Ltd",
   "value": "Arohan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT7E",
   "label": "Shriram Housing Finance Limited",
   "value": "SHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CONBB0000PUN01",
   "label": "Connect Broadband",
   "value": "CONNECT BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATHWAY00NAT01",
   "label": "Hathway Broadband",
   "value": "HATHWAY BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIKO00000NAT01",
   "label": "Tikona Infinet Pvt Ltd",
   "value": "TIKONA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ACT000000NAT01",
   "label": "ACT Fibernet",
   "value": "ACTFIBER",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT01",
   "label": "Airtel Broadband",
   "value": "AIRTEL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NEXTRA000NAT01",
   "label": "Nextra Broadband",
   "value": "NEXTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SPENET000NAT01",
   "label": "Spectra",
   "value": "SPECTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TTN000000NAT01",
   "label": "TTN BroadBand",
   "value": "TTN BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT02",
   "label": "Airtel Broadband (Fetch & Pay)",
   "value": "AIRTEL BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIABB000NAT01",
   "label": "Asianet Broadband (Old)",
   "value": "ASIABB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "COMWBB000NAT01",
   "label": "Comway Broadband",
   "value": "COMWBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FUSNBB000NAT01",
   "label": "Fusionnet Web Services Private Limited",
   "value": "FUSNBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DVOIS0000NAT02",
   "label": "ION",
   "value": "ION BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000CHHZV",
   "label": "Instalinks",
   "value": "INTAL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "MNET00000ASM5W",
   "label": "M-NET Fiber Fast",
   "value": "MNET",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DENB00000NATIO",
   "label": "DEN Broadband",
   "value": "DEN",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIMB00000NATRQ",
   "label": "Timbl Broadband",
   "value": "Timbl",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000BIHKL",
   "label": "Instanet Broadband",
   "value": "INSTANBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "VFIB00000NATJJ",
   "label": "Vfibernet Broadband",
   "value": "VFIB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NETP00000PUNS8",
   "label": "Netplus Broadband",
   "value": "NETPB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FLAS00000NATVZ",
   "label": "Flash Fibernet",
   "value": "FLAFBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "EXCE00000NATDP",
   "label": "Excell Broadband",
   "value": "ExcellBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SWIF00000NATVE",
   "label": "Swifttele Enterprises Private Limited",
   "value": "Swift Tele",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ALLI00000NATHB",
   "label": "Alliance Broadband Services Pvt. Ltd.",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "RURA00000NAT9E",
   "label": "AirJaldi - Rural Broadband",
   "value": "AirJaldi - Rural Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SKYL00000NATJB",
   "label": "Skylink Fibernet Private Limited",
   "value": "Skylink Fibernet Private Limited",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIA00000NAT6O",
   "label": "Asianet Broadband",
   "value": "Asianet Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATH00000NATRZ",
   "label": "Hathway Digital Cable TV",
   "value": "HATHWAY TV",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "ASIA00000NATA2",
   "label": "Asianet Digital",
   "value": "ASIADIGI",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "INTE00000NATHP",
   "label": "Intermedia Cable Communication Pvt Ltd",
   "value": "ICC Network",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "DENHATHWAY001",
   "label": "Den Hathway Cable",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "HATHWAY001",
   "label": "Den Hathway Cable",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "INDI00000NAT78",
   "label": "INDigital",
   "value": "INDigital",
   "is_fetch": 0,
   "Category": "Cable"
  },
  {
   "biller_id": "BANK00000NATKB",
   "label": "BoB Credit Card",
   "value": "BFSL",
   "is_fetch": 1,
   "Category": "CreditCard"
  },
  {
   "biller_id": "DISH00000NAT01",
   "label": "Dish TV",
   "value": "DISH TV DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "TATASKY00NAT01",
   "label": "Tata Sky",
   "value": "TATA SKY DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "SUND00000NAT02",
   "label": "Sun Direct TV",
   "value": "SUN DIRECT DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "VIDEOCON0NAT01",
   "label": "Videocon D2H",
   "value": "Videocon DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "AIRT00000NAT87",
   "label": "Airtel DTH",
   "value": "Airtel DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "VAST00000NATLW",
   "label": "Vastu Housing Finance Corporation Limited",
   "value": "VHFCL - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAMD00000NATAI",
   "label": "ZestMoney",
   "value": "Zest Money",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DMIF00000NATMN",
   "label": "DMI Finance Private Limited",
   "value": "DMI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LOAN00000NATVP",
   "label": "LOANTAP CREDIT PRODUCTS PRIVATE LIMITED",
   "value": "LoanTap",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MONE00000NATX1",
   "label": "RupeeRedee",
   "value": "RupeeRedee",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SICR00000NATDG",
   "label": "Kissht",
   "value": "Kissht",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VISA00000NAT5A",
   "label": "Kinara Capital",
   "value": "Kinaara Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "EASY00000MAH6N",
   "label": "Easy Home Finance Limited",
   "value": "EHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NAT0I",
   "label": "Muthoot Microfin Limited",
   "value": "Muthoot Microfin Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT23",
   "label": "Shriram Transport Finance Company Limited",
   "value": "STFC",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATN6",
   "label": "Axis Finance Limited",
   "value": "Axis Finance Ltd.",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CARS00000NAT4G",
   "label": "Cars24 Financial Services Private Limited",
   "value": "Cars24",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JAIN00000NATVC",
   "label": "Jain Autofin",
   "value": "Jain Autofin Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AUBA00000NATGM",
   "label": "AU Bank Loan Repayment",
   "value": "AU Bank Loan Repayment",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OXYZ00000NATSE",
   "label": "Oxyzo Financial Services Pvt Ltd",
   "value": "Oxyzo Financial Services Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TOYO00000NAT59",
   "label": "Toyota Financial Services",
   "value": "TFS",
   "is_fetch": 0,
   "Category": "Loan"
  },
  {
   "biller_id": "ICIC00000NATKD",
   "label": "ICICI Bank Ltd - Loans",
   "value": "ICICI Bank Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATYF",
   "label": "Muthoot Capital Services Ltd",
   "value": "Muthoot Capital Services Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ANNA00000NATUO",
   "label": "Annapurna Finance Private Limited-MFI",
   "value": "Annapurna Finance Private Limited-MFI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FULL00000NAT8X",
   "label": "Fullerton India Housing Finance Limited",
   "value": "Fullerton India Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FULL00000NATD4",
   "label": "Fullerton India credit company limited",
   "value": "Fullerton India credit company limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "GUFI00000NATV8",
   "label": "G U Financial Services Pvt Ltd",
   "value": "GU Financial",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AVAN00000NATHI",
   "label": "Avanse Financial Services Ltd",
   "value": "AFSL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAID00000NATWG",
   "label": "Baid Leasing and Finance",
   "value": "BAID LEASING AND FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BERA00000NATOY",
   "label": "BERAR Finance Limited",
   "value": "BERAR Finance Limited",
   "is_fetch": 0,
   "Category": "Loan"
  },
  {
   "biller_id": "OHMY00000NATFH",
   "label": "OHMYLOAN",
   "value": "OHMY Loan Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OMLP00000NAT0A",
   "label": "OMLP2P.COM",
   "value": "OHMy Technologies Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADAN00000NATO6",
   "label": "Adani Capital Pvt Ltd",
   "value": "Adani Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ANNA00000NATMR",
   "label": "Annapurna Finance Private Limited-MSME",
   "value": "Annapurna Finance Pvt Ltd-MSME",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINC00000NAT3E",
   "label": "Fincare Small Finance Bank",
   "value": "Fincare_bank",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NAT12",
   "label": "India Shelter Finance Corporation Limited",
   "value": "India Shelter Finance Corporation Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KANA00000NATQV",
   "label": "Kanakadurga Finance Limited",
   "value": "Kanakadurga Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHI00000NATIC",
   "label": "Mahindra Home Finance",
   "value": "Mahindra Rural Housing Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ALTU00000NATG5",
   "label": "Altum Credo Home Finance",
   "value": "Altum Credo Home Finance Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAXV00000NAT33",
   "label": "Maxvalue Credits And Investments Ltd",
   "value": "Maxvalue Credits And Investments Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SVAT00000NATUB",
   "label": "Svatantra Microfin Private Limited",
   "value": "SMF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT0U",
   "label": "Credit Wise Capital",
   "value": "Credit Wise Capital Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FLEX00000NAT3Z",
   "label": "FlexiLoans",
   "value": "Epimoney Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDU00000NATQH",
   "label": "INDUSIND BANK - CFD",
   "value": "INDUSIND CFD LOANS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CHAI00000NATYY",
   "label": "Chaitanya India Fin Credit Pvt Ltd",
   "value": "Chaitanya_Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DIGA00000NAT3C",
   "label": "Digamber Capfin Limited",
   "value": "digamber capfin",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MIDL00000NATIP",
   "label": "Midland Microfin Ltd",
   "value": "Midland",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HERO00000NATI6",
   "label": "Hero FinCorp Limited",
   "value": "Hero FinCorp Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ASCE00000NATGK",
   "label": "Ascend Capital",
   "value": "Ascend Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DCBB00000NAT2K",
   "label": "DCB Bank Loan Repayment",
   "value": "DCBLOAN",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "EDUV00000NATF1",
   "label": "Eduvanz Financing Pvt. Ltd.",
   "value": "Eduvanz Financing Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATQF",
   "label": "India Home Loan Limited",
   "value": "India Home Loan Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MINT00000NATUB",
   "label": "Mintifi Finserve Private Limited",
   "value": "Mintifi Finserve Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NIDH00000NAT9K",
   "label": "Nidhilakshmi Finance",
   "value": "Nidhilakshmi Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NMFI00000NATGX",
   "label": "NM Finance",
   "value": "NM Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OROB00000NAT7P",
   "label": "Oroboro",
   "value": "Oroboro",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HIRA00000NATSP",
   "label": "Hiranandani Financial Services Pvt Ltd",
   "value": "Hiranandani Financial Services",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HOME00000NATVX",
   "label": "Home First Finance Company India Limited",
   "value": "Home First Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HOME00000NATWT",
   "label": "Home Credit India Finance Pvt. Ltd",
   "value": "Home Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "UJJI00000NATAW",
   "label": "Ujjivan Small Finance Bank",
   "value": "Ujjivan Small Finance Bank",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IIFL00000NAT5F",
   "label": "IIFL Finance Limited",
   "value": "IIFL Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IIFL00000NATMF",
   "label": "IIFL Home Finance",
   "value": "IIFL Home Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LIGH00000NATKW",
   "label": "Light Microfinance Private Limited",
   "value": "LMF",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MONE00000NAT7P",
   "label": "MoneyTap",
   "value": "Tapstart Capital Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT35",
   "label": "CreditAccess Grameen - Retail Finance",
   "value": "CreditAccess Grameen - Retail Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT8X",
   "label": "CreditAccess Grameen - Microfinance",
   "value": "CreditAccess Grameen (Microfinance)",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KHUS00000NAT1L",
   "label": "Khush Housing Finance Pvt Ltd",
   "value": "KHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TVSC00000NAT0T",
   "label": "TVS Credit",
   "value": "TVS Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATM1",
   "label": "Axis Bank Limited - Retail Loan",
   "value": "Axis Bank Ltd - Retail Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INCR00000NATJG",
   "label": "InCred",
   "value": "InCred",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "POOJ00000NATWO",
   "label": "Pooja Finelease LTD.",
   "value": "Pooja Finlease",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "STAS00000NATX1",
   "label": "StashFin",
   "value": "EQX Analytics Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTHTGLDNBC0001",
   "label": "Muthoot Gold Bullion Corporation",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADAN00000NATI9",
   "label": "Adani Housing Finance",
   "value": "Adani Housing Finance Private",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATP2",
   "label": "Bajaj Auto Finance",
   "value": "Bajaj Auto Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AGOR00000NATQL",
   "label": "Agora Microfinance India Ltd - AMIL",
   "value": "Agora Microfinance India Ltd - AMIL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JANA00000NATV5",
   "label": "Janakalyan Financial Services Private Limited",
   "value": "Janakalyan Financial Services Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHA00000NATSI",
   "label": "Mahaveer Finance India Limited",
   "value": "Mahaveer Finance India Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JAIN00000NATOA",
   "label": "Jain Motor Finmart",
   "value": "Jain Motor Finmart",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATB0",
   "label": "Muthoot Fincorp Ltd",
   "value": "Muthoot Fincorp Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATJD",
   "label": "Axis Bank Limited-Microfinance",
   "value": "Axis Bank Limited-Microfinance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ORAN00000NATJX",
   "label": "Orange Retail Finance India Pvt Ltd",
   "value": "Orange Retail Finance India Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VIST00000NAT6D",
   "label": "Vistaar Financial services Private Limited",
   "value": "Vistaar Financial services Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BHAR00000NAT52",
   "label": "Bharat Financial Inclusion Ltd",
   "value": "BFIL - NATIONAL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KOTA00000NATE1",
   "label": "Kotak Mahindra Prime Limited",
   "value": "Kotak Mahindra Prime Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHI00000NATKR",
   "label": "Mahindra and Mahindra Financial Services Limited",
   "value": "Mahindra and Mahindra Financial Services Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JOHN00000NATY9",
   "label": "John Deere Financial India Private Limited",
   "value": "John Deere Financial India Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATOI",
   "label": "Muthoot Finance",
   "value": "MFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DVAR00000NAT2B",
   "label": "Dvara Kshetriya Gramin Financials Private Limited",
   "value": "Dvara KGFS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TATA00000NATOM",
   "label": "Tata Capital Housing Finance Limited",
   "value": "Tata Capital Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NETA00000NATEN",
   "label": "Netafim Agricultural Financing Agency Pvt. Ltd.",
   "value": "NAFA",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SMEC00000NATPI",
   "label": "SMEcorner",
   "value": "SMEcorner",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KOTA00000NATTW",
   "label": "Kotak Mahindra Bank Ltd.-Loans",
   "value": "Kotak Mahindra Bank Ltd.-Loans",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SAMA00000NAT1C",
   "label": "Samasta Microfinance Limited",
   "value": "Samasta Microfinance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATZE",
   "label": "Indiabulls Commercial Credit Ltd",
   "value": "Indiabulls Commercial Credit Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "APTU00000NAT2L",
   "label": "Aptus Value Housing Finance India Limited",
   "value": "APTUS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "APTU00000NATP0",
   "label": "Aptus Finance India Private Limited",
   "value": "APTFI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NOVE00000NAT6M",
   "label": "Novelty Finance Ltd",
   "value": "Novelty Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "THAZ00000NATR8",
   "label": "Thazhayil Nidhi Ltd",
   "value": "TNL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MITR00000NAT6L",
   "label": "Mitron Capital",
   "value": "MItron",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "X10F00000NATSA",
   "label": "X10 Financial Services Limited",
   "value": "X10 Financial Services Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "YOGA00000NATLH",
   "label": "Yogakshemam Loans Ltd",
   "value": "YOGLOANS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATJO",
   "label": "Muthoot Housing Finance Company Limited",
   "value": "MHFCL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ESAF00000NAT5J",
   "label": "ESAF Small Finance Bank (Micro Loans)",
   "value": "ESAF Small Finance Bank (Micro Loans)",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "RAND00000NAT4D",
   "label": "Rander Peoples Co Operative Bank Ltd",
   "value": "Rander Peoples Co Operative Bank Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SMIL00000NATGH",
   "label": "SMILE Microfinance Limited",
   "value": "SMILE_Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINO00000NATVP",
   "label": "Finova Capital Private Ltd",
   "value": "Finova Capital Private Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADIT00000NATZ1",
   "label": "Aditya Birla Finance Limited",
   "value": "Aditya Birla Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AYAA00000NAT5Y",
   "label": "Ayaan Finserve India Private LTD",
   "value": "Ayaan Finserve India Private LTD",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SARV00000NATV8",
   "label": "Sarvjan India Fintech Private Limited",
   "value": "Sarvjan India Fintech Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AADH00000NATPT",
   "label": "Aadhar Housing Finance Limited",
   "value": "Aadhar Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IDFF00000NAT1B",
   "label": "IDF Financial Services Private Limited",
   "value": "IDF Financial Services",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATDK",
   "label": "Bajaj Housing Finance Limited",
   "value": "BHFL - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CENT00000NATSH",
   "label": "Centrum Microcredit Limited",
   "value": "CML - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDO00000NATGP",
   "label": "Indostar Capital Finance Limited - CV",
   "value": "ICFL-CV",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CONBB0000PUN01",
   "label": "Connect Broadband",
   "value": "CONNECT BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATHWAY00NAT01",
   "label": "Hathway Broadband",
   "value": "HATHWAY BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIKO00000NAT01",
   "label": "Tikona Infinet Pvt Ltd",
   "value": "TIKONA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ACT000000NAT01",
   "label": "ACT Fibernet",
   "value": "ACTFIBER",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT01",
   "label": "Airtel Broadband",
   "value": "AIRTEL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NEXTRA000NAT01",
   "label": "Nextra Broadband",
   "value": "NEXTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SPENET000NAT01",
   "label": "Spectra",
   "value": "SPECTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TTN000000NAT01",
   "label": "TTN BroadBand",
   "value": "TTN BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT02",
   "label": "Airtel Broadband (Fetch & Pay)",
   "value": "AIRTEL BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIABB000NAT01",
   "label": "Asianet Broadband (Old)",
   "value": "ASIABB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "COMWBB000NAT01",
   "label": "Comway Broadband",
   "value": "COMWBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FUSNBB000NAT01",
   "label": "Fusionnet Web Services Private Limited",
   "value": "FUSNBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DVOIS0000NAT02",
   "label": "ION",
   "value": "ION BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000CHHZV",
   "label": "Instalinks",
   "value": "INTAL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "MNET00000ASM5W",
   "label": "M-NET Fiber Fast",
   "value": "MNET",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DENB00000NATIO",
   "label": "DEN Broadband",
   "value": "DEN",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIMB00000NATRQ",
   "label": "Timbl Broadband",
   "value": "Timbl",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000BIHKL",
   "label": "Instanet Broadband",
   "value": "INSTANBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "VFIB00000NATJJ",
   "label": "Vfibernet Broadband",
   "value": "VFIB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NETP00000PUNS8",
   "label": "Netplus Broadband",
   "value": "NETPB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FLAS00000NATVZ",
   "label": "Flash Fibernet",
   "value": "FLAFBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "EXCE00000NATDP",
   "label": "Excell Broadband",
   "value": "ExcellBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SWIF00000NATVE",
   "label": "Swifttele Enterprises Private Limited",
   "value": "Swift Tele",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ALLI00000NATHB",
   "label": "Alliance Broadband Services Pvt. Ltd.",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "RURA00000NAT9E",
   "label": "AirJaldi - Rural Broadband",
   "value": "AirJaldi - Rural Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SKYL00000NATJB",
   "label": "Skylink Fibernet Private Limited",
   "value": "Skylink Fibernet Private Limited",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIA00000NAT6O",
   "label": "Asianet Broadband",
   "value": "Asianet Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HPCL00000NAT01",
   "label": "HP Gas (HPCL)",
   "value": "HPCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "BHAR00000NATR4",
   "label": "Bharat Gas (BPCL)",
   "value": "BPCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "INDI00000NATT5",
   "label": "Indane Gas (Indian Oil)",
   "value": "IOCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "DLJB00000DEL01",
   "label": "Delhi Jal Board",
   "value": "DJB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCG000000GUR01",
   "label": "Municipal Corporation of Gurugram",
   "value": "MCG",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UJS000000UTT01",
   "label": "Uttarakhand Jal Sansthan",
   "value": "UJS",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "BWSSB0000KAR01",
   "label": "Bangalore Water Supply and Sewerage Board",
   "value": "BWSSB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "HMWSS0000HYD01",
   "label": "Hyderabad Metropolitan Water Supply and Sewerage Board",
   "value": "HMWSSB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCJ000000PUN01",
   "label": "Municipal Corporation Jalandhar",
   "value": "MCJ",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCL000000PUN01",
   "label": "Municipal Corporation Ludhiana - Water",
   "value": "MCL",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "NDMC00000DEL01",
   "label": "New Delhi Municipal Council (NDMC) - Water",
   "value": "NDMC WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "SMC000000GUJ01",
   "label": "Surat Municipal Corporation - Water",
   "value": "SMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UNN000000MAP01",
   "label": "Ujjain Nagar Nigam - PHED",
   "value": "PHEDU",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PUNE00000MAHSE",
   "label": "Pune Municipal Corporation - Water",
   "value": "PMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UITWOB000BHW02",
   "label": "Urban Improvement Trust (UIT) - Bhiwadi",
   "value": "UIT BHIWADI",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "GWMC00000WGL01",
   "label": "Greater Warangal Municipal Corporation - Water",
   "value": "GWMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "RMC000000JHA01",
   "label": "Ranchi Municipal Corporation",
   "value": "RMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "SMC000000DNH01",
   "label": "Silvassa Municipal Council",
   "value": "SMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCA000000PUN01",
   "label": "Municipal Corporation of Amritsar",
   "value": "MCA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "HUDA00000HAR01",
   "label": "Haryana Urban Development Authority",
   "value": "HSVP",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCC000000KAR01",
   "label": "Mysuru City Corporation",
   "value": "MCC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PCMC00000MAH01",
   "label": "Pimpri Chinchwad Municipal Corporation(PCMC)",
   "value": "PCMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PMC000000PUN01",
   "label": "Punjab Municipal Corporations\/Councils",
   "value": "PMIDC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "DELH00000DEL6Q",
   "label": "Delhi Development Authority (DDA) - Water",
   "value": "DDA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "DEPA00000MIZ9U",
   "label": "Department of Public Health Engineering-Water\t Mizoram",
   "value": 0,
   "is_fetch": "Water"
  },
  {
   "biller_id": "KERA00000KERMO",
   "label": "Kerala Water Authority (KWA)",
   "value": "KWA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MUNI00000CHANI",
   "label": "Municipal Corporation Chandigarh",
   "value": "MCC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "KALY00000THA3E",
   "label": "Kalyan Dombivali Municipal Corporation - Water",
   "value": "KDMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MADH00000MAPJV",
   "label": "Madhya Pradesh Urban (e-Nagarpalika) - Water",
   "value": "e NagarPalika Madhya Pradesh Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PORT00000ANI1K",
   "label": "Port Blair Municipal Council - Water",
   "value": "PBMC - Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "VASA00000THAE9",
   "label": "Vasai Virar Municipal Corporation - Water",
   "value": "VVCMC WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "JALK00000UTP0P",
   "label": "Jalkal Vibhag Nagar Nigam Prayagraj",
   "value": "Prayagraj Nagar Nigam-Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "NAGA00000ALG45",
   "label": "Nagar Nigam Aligarh",
   "value": "Nagar Nigam Aligarh",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PUBL00000HARBB",
   "label": "Public Health Engineering Department\t Haryana",
   "value": 0,
   "is_fetch": "Water"
  },
  {
   "biller_id": "KOLH00000MAHN3",
   "label": "Kolhapur Municipal Corporation - Water Tax",
   "value": "KMCWT",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "VATV00000GUJ91",
   "label": "Vatva Industrial Estate Infrastructure Development Ltd",
   "value": "Vatva Industrial Estate Infrastructure Development",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MUNI00000HARG6",
   "label": "Municipal Corporation of Gurugram (MCG) - Water",
   "value": "MCG WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MTNL00000DEL01",
   "label": "MTNL Delhi",
   "value": "MTNL DEL LL POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "MTNL00000MUM01",
   "label": "MTNL Mumbai",
   "value": "MTNL LL POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "ATLLI0000NAT01",
   "label": "Airtel Landline",
   "value": "AIRTEL LLI POSTPAID",
   "is_fetch": 0,
   "Category": "Landline"
  },
  {
   "biller_id": "TATADLLI0NAT01",
   "label": "Tata Teleservices",
   "value": "TATADLLI",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "ATLLI0000NAT02",
   "label": "Airtel Landline (Fetch & Pay)",
   "value": "AIRTEL LLI POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "BSNL00000NAT5C",
   "label": "BSNL Landline - Individual",
   "value": "BSNLROB",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "BSNL00000NATPZ",
   "label": "BSNL Landline - Corporate",
   "value": "BSNLCOB",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "APCPDCL0000AP01",
   "label": "Central Power Distribution Company Ltd. of Andra Pradesh (APCPDCL)",
   "value": "APCPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "APEPDCL0000AP02",
   "label": "Eastern Power Distribution Co Ltd. of Andra Pradesh (APEPDCL)",
   "value": "APEPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "APSPDCL0000AP03",
   "label": "Southern Power Distribution Co Ltd. of Andra Pradesh (APSPDCL)",
   "value": "APSPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TSNPDCL0000T01",
   "label": "Northern Power Distribution of Telangana Ltd (TSNPDCL)",
   "value": "TSNPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
    "S No": 74,
    "OperatorName": "BSNL DC",
    "OperatorCode": "BDC",
    "Category": "Datacard",
    "label": "BSNL DC",
   },
   {
    "S No": 75,
    "OperatorName": "MTNL Delhi DC",
    "OperatorCode": "MDDC",
    "Category": "Datacard",
    "label": "MTNL Delhi DC"
   },
   {
    "S No": 76,
    "OperatorName": "MTNL Mumbai DC",
    "OperatorCode": "MMDC",
    "Category": "Datacard",
    "label": "MTNL Mumbai DC"
   },
   {
    "S No": 77,
    "OperatorName": "MTS Mblaze",
    "OperatorCode": "MTZ",
    "Category": "Datacard",
    "label": "MTS Mblaze"
   },
   {
    "S No": 78,
    "OperatorName": "MTS Mbrowse",
    "OperatorCode": "MTW",
    "Category": "Datacard",
    "label": "MTS Mbrowse"
   },
   {
    "S No": 79,
    "OperatorName": "Reliance NetConnect 1X",
    "OperatorCode": "RN",
    "Category": "Datacard",
    "label": "Reliance NetConnect 1X"
   },
   {
    "S No": 80,
    "OperatorName": "Reliance NetConnect 3G",
    "OperatorCode": "RNG",
    "Category": "Datacard",
    "label": "Reliance NetConnect 3G"
   },
   {
    "S No": 81,
    "OperatorName": "Reliance NetConnect+",
    "OperatorCode": "RNC",
    "Category": "Datacard",
    "label": "Reliance NetConnect+"
   },
   {
    "S No": 82,
    "OperatorName": "Tata Photon Whiz",
    "OperatorCode": "TPW",
    "Category": "Datacard",
    "label": "Tata Photon Whiz"
   },
   {
    "S No": 83,
    "OperatorName": "Tata Photon+",
    "OperatorCode": "TPP",
    "Category": "Datacard",
    "label": "Tata Photon+"
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
  },
   
 ]


 const response =

      {
          "status_code": 200,

          "status_msg": "OK",

          "data": [
                    {
                      "fieldKey":"para1",
                      "paramName":"Zone ID and Ward ID",
                      "datatype":"ALPHANUMERIC",
                      "minlength":15,
                      "maxlength":60,
                      "optional":0
                    },
                    {
                      "fieldKey":"para2",
                      "paramName":"ConnectionNo",
                      "datatype":"ALPHANUMERIC",
                      "minlength":2,
                      "maxlength":25,
                      "optional":0
                    }
                  ]
      }


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

    useEffect(()=>{
       fetch('https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid=EZ929952&apikey=C019FB28E2&biller_id=VASA00000THAE9&category=Water')
      .then(response => console.log(response.json())  )
      // console.log('fetch',fetchResponse)
      

    },[])
 


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
                        options={operators.filter((opr)=> opr.Category=='Prepaid-Mobile')}
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
