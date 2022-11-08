
import Button from '@components/ui/button'
import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import SelectInput from '@components/ui/select-input'
import Select from '@components/ui/select/select'
import http from '@utils/api/http'
import React from 'react'
import { useEffect,useState } from 'react'
import { useMutation, useQueryClient,enabled } from 'react-query';
import { API_ENDPOINTS } from "@utils/api/endpoints";
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader'
import { useQuery } from "react-query";
import AsyncSelect from 'react-select/async';
import url from "@utils/api/server_url";


 export const mobileOperator = [
  {
    'id': 1,
    'name': 'Airtel',
    "OperatorCode": "AT",
    "label": "Airtel"
  },
  {
    'id': 2,
    'name': 'BSNL',
    "OperatorCode": "BS",
    "label": "BSNL"
  },
  {
    'id': 3,
    'name': 'Jio',
    "OperatorCode": "AT",
    "label": "Jio"
  },
  {
    'id': 4,
    'name': 'Vodafone Idea',
    "OperatorCode": "VI",
    "label": "Vi"
  },
  {
    'id': 5,
    'name': 'MTNL',
    "OperatorCode": "MT",
    "label": "MTNL"
  },
 ]

 export const operatorCircle= [
  "Andhra Pradesh",
  "Assam",
  "Bihar Jharkhand",
  "Chennai",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu Kashmir",
  "Karnataka",
  "Kerala",
  "Kolkata",
  "Madhya Pradesh Chhattisgarh",
  "Maharashtra",
  "Mumbai",
  "North East",
  "Orissa",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "UP East",
  "UP West",
  "Uttarakhand",
  "West Bengal"
]

 export const operators = [
    {
     "S No": 1,
     "OperatorName": "Airtel",
     "OperatorCode": "AT",
     "Category": "Prepaid-Mobile",
     "value": "Airtel"
    },
    {
     "S No": 2,
     "OperatorName": "BSNL",
     "OperatorCode": "BVR",
     "Category": "Prepaid-Mobile",
     "value": "BSNL Recharge\/Validity (RCV)"
    },
    {
     "S No": 3,
     "OperatorName": "BSNL Special (STV)",
     "OperatorCode": "BV",
     "Category": "Prepaid-Mobile",
     "value": "BSNL Special (STV)"
    },
    {
     "S No": 4,
     "OperatorName": "BSNL TopUp",
     "OperatorCode": "BR",
     "Category": "Prepaid-Mobile",
     "value": "BSNL TopUp"
    },
    {
     "S No": 5,
     "OperatorName": "Idea",
     "OperatorCode": "IC",
     "Category": "Prepaid-Mobile",
     "value": "Idea"
    },
    {
     "S No": 6,
     "OperatorName": "MTNL DELHI",
     "OperatorCode": "MD",
     "Category": "Prepaid-Mobile",
     "value": "MTNL DELHI"
    },
    {
     "S No": 7,
     "OperatorName": "MTNL DELHI Special",
     "OperatorCode": "MDS",
     "Category": "Prepaid-Mobile",
     "value": "MTNL DELHI Special"
    },
    {
     "S No": 8,
     "OperatorName": "MTNL MUMBAI",
     "OperatorCode": "MM",
     "Category": "Prepaid-Mobile",
     "value": "MTNL MUMBAI"
    },
    {
     "S No": 9,
     "OperatorName": "MTNL MUMBAI SPECIAL",
     "OperatorCode": "MMS",
     "Category": "Prepaid-Mobile",
     "value": "MTNL MUMBAI SPECIAL"
    },
    {
     "S No": 10,
     "OperatorName": "Jio",
     "OperatorCode": "JIO",
     "Category": "Prepaid-Mobile",
     "value": "Reliance JIO"
    },
    {
     "S No": 11,
     "OperatorName": "Tata Docomo GSM",
     "OperatorCode": "TD",
     "Category": "Prepaid-Mobile",
     "value": "Tata Docomo GSM"
    },
    {
     "S No": 12,
     "OperatorName": "Tata Docomo GSM Special",
     "OperatorCode": "DS",
     "Category": "Prepaid-Mobile",
     "value": "Tata Docomo GSM Special"
    },
    {
     "S No": 13,
     "OperatorName": "Uninor",
     "OperatorCode": "UN",
     "Category": "Prepaid-Mobile",
     "value": "Uninor"
    },
    {
     "S No": 14,
     "OperatorName": "Uninor Special",
     "OperatorCode": "UNS",
     "Category": "Prepaid-Mobile",
     "value": "Uninor Special"
    },
    {
     "S No": 15,
     "OperatorName": "Vodafone",
     "OperatorCode": "VF",
     "Category": "Prepaid-Mobile",
     "value": "Vodafone"
    },
    {
     "S No": 16,
     "OperatorName": "Aircel",
     "OperatorCode": "ACP",
     "Category": "Postpaid-Mobile",
     "value": "Aircel"
    },
    {
     "S No": 17,
     "OperatorName": "Airtel",
     "OperatorCode": "ATP",
     "Category": "Postpaid-Mobile",
     "value": "Airtel"
    },
    {
     "S No": 18,
     "OperatorName": "BSNL Mobile",
     "OperatorCode": "BSP",
     "Category": "Postpaid-Mobile",
     "value": "BSNL Mobile"
    },
    {
     "S No": 19,
     "OperatorName": "Idea",
     "OperatorCode": "IDP",
     "Category": "Postpaid-Mobile",
     "value": "Idea"
    },
    {
     "S No": 20,
     "OperatorName": "LOOP Mobile",
     "OperatorCode": "LMP",
     "Category": "Postpaid-Mobile",
     "value": "LOOP Mobile"
    },
    {
     "S No": 21,
     "OperatorName": "MTS-Postpaid",
     "OperatorCode": "MTSP",
     "Category": "Postpaid-Mobile",
     "value": "MTS-Postpaid"
    },
    {
     "S No": 22,
     "OperatorName": "Reliance CDMA",
     "OperatorCode": "RCP",
     "Category": "Postpaid-Mobile",
     "value": "Reliance CDMA"
    },
    {
     "S No": 23,
     "OperatorName": "Reliance GSM",
     "OperatorCode": "RGP",
     "Category": "Postpaid-Mobile",
     "value": "Reliance GSM"
    },
    {
     "S No": 24,
     "OperatorName": "Tata Docomo GSM",
     "OperatorCode": "TDP",
     "Category": "Postpaid-Mobile",
     "value": "Tata Docomo GSM"
    },
    {
     "S No": 25,
     "OperatorName": "Tata Indicom",
     "OperatorCode": "TIP",
     "Category": "Postpaid-Mobile",
     "value": "Tata Indicom"
    },
    {
     "S No": 26,
     "OperatorName": "Vodafone",
     "OperatorCode": "VFP",
     "Category": "Postpaid-Mobile",
     "value": "Vodafone"
    },
  {
   "biller_id": "APDCL0000ASM01",
   "value": "Assam Power Distribution Company Ltd (RAPDR)",
   "value": "APDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "AVVNL0000RAJ01",
   "value": "Ajmer Vidyut Vitran Nigam Limited (AVVNL)",
   "value": "AVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BESCOM000KAR01",
   "value": "Bangalore Electricity Supply Co. Ltd (BESCOM)",
   "value": "BESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BEST00000MUM01",
   "value": "B.E.S.T Mumbai",
   "value": "BEST",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BSESRAJPLDEL01",
   "value": "BSES Rajdhani Power Limited",
   "value": "BSES RPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BSESYAMPLDEL01",
   "value": "BSES Yamuna Power Limited",
   "value": "BSES YPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESC00000KOL01",
   "value": "CESC Limited",
   "value": "CESC",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CSPDCL000CHH01",
   "value": "Chhattisgarh State Power Distribution Co. Ltd",
   "value": "CSPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DDED00000DAD01",
   "value": "Daman and Diu Electricity",
   "value": "DDED",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DGVCL0000GUJ01",
   "value": "Dakshin Gujarat Vij Company Limited (DGVCL)",
   "value": "DGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "DHBVN0000HAR01",
   "value": "Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
   "value": "DHBVN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DNHPDCL0DNH001",
   "value": "DNH Power Distribution Company Limited",
   "value": "DNHPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GESCOM000KAR01",
   "value": "Gulbarga Electricity Supply Company Limited",
   "value": "GESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JBVNL0000JHA01",
   "value": "Jharkhand Bijli Vitran Nigam Limited (JBVNL)",
   "value": "JBVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JDVVNL000RAJ01",
   "value": "Jodhpur Vidyut Vitran Nigam Limited (JDVVNL)",
   "value": "JDVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JUSC00000JAM01",
   "value": "Jamshedpur Utilities",
   "value": "JUSCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JVVNL0000RAJ01",
   "value": "Jaipur Vidyut Vitran Nigam (JVVNL)",
   "value": "JVVNL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MAHA00000MAH01",
   "value": "Maharashtra State Electricity Distbn Co Ltd",
   "value": "MSEDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MGVCL0000GUJ01",
   "value": "Madhya Gujarat Vij Company Limited (MGVCL)",
   "value": "MGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPDC00000MEG01",
   "value": "Meghalaya Power Dist Corp Ltd",
   "value": "MEPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPPK00000MAP01",
   "value": "M.P. Paschim Kshetra Vidyut Vitaran",
   "value": "MPPKVVCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NBPDCL000BHI01",
   "value": "North Bihar Power Distribution Company Ltd.",
   "value": "NBPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NESCO0000ODI01",
   "value": "NESCO\t Odisha",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "NPCL00000NOI01",
   "value": "Noida Power",
   "value": "NPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "PGVCL0000GUJ01",
   "value": "Paschim Gujarat Vij Company Limited (PGVCL)",
   "value": "PGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "PSPCL0000PUN01",
   "value": "Punjab State Power Corporation Ltd (PSPCL)",
   "value": "PSPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SBPDCL000BHI01",
   "value": "South Bihar Power Distribution Company Ltd.",
   "value": "SBPDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SOUTHCO00ODI01",
   "value": "TP Southern Odisha Distribution Limited",
   "value": "SOUTHCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TATAPWR00DEL01",
   "value": "Tata Power - Delhi",
   "value": "TATA PWR - DEL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TATAPWR00MUM01",
   "value": "Tata Power - Mumbai",
   "value": "TATA PWR - MUM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TNEB00000TND01",
   "value": "Tamil Nadu Electricity Board (TNEB)",
   "value": "TNEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000AGR01",
   "value": "Torrent Power - Agra",
   "value": "TOR PWR - AGR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000AHM02",
   "value": "Torrent Power - Ahmedabad",
   "value": "TOR PWR - AHM",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000BHW03",
   "value": "Torrent Power - Bhiwandi",
   "value": "TOR PWR - BHI",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000SUR04",
   "value": "Torrent Power - Surat",
   "value": "TOR PWR - SUR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TSEC00000TRI01",
   "value": "Tripura Electricity Corp Ltd",
   "value": "TSECL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UGVCL0000GUJ01",
   "value": "Uttar Gujarat Vij Company Limited (UGVCL)",
   "value": "UGVCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "UHBVN0000HAR01",
   "value": "Uttar Haryana Bijli Vitran Nigam (UHBVN)",
   "value": "UHBVN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UPPCL0000UTP01",
   "value": "Uttar Pradesh Power Corp Ltd (UPPCL) - URBAN",
   "value": "UPPCL URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "UPPCL0000UTP02",
   "value": "Uttar Pradesh Power Corp Ltd (UPPCL) - RURAL",
   "value": "UPPCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WESCO0000ODI01",
   "value": "TP Western Odisha Distribution Limited",
   "value": "WESCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "APDCL0000ASM02",
   "value": "Assam Power Distribution Company Ltd (NON-RAPDR)",
   "value": "APDCL NON-RAPDR",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESCOM000KAR01",
   "value": "Chamundeshwari Electricity Supply Corp Ltd (CESCOM)",
   "value": "CESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "HESCOM000KAR01",
   "value": "Hubli Electricity Supply Company Ltd (HESCOM)",
   "value": "HESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPCZ00000MAP01",
   "value": "M.P. Madhya Kshetra Vidyut Vitaran - URBAN",
   "value": "MPMKVVCL URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPCZ00000MAP02",
   "value": "M.P. Madhya Kshetra Vidyut Vitaran - RURAL",
   "value": "MPMKVVCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "NDMC00000DEL02",
   "value": "New Delhi Municipal Council (NDMC) - Electricity",
   "value": "NDMC ELECTRICITY",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WBSEDCL00WBL01",
   "value": "West Bengal State Electricity Distribution Co. Ltd (WBSEDCL)",
   "value": "WBSEDCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPEZ00000MAP02",
   "value": "M.P. Poorv Kshetra Vidyut Vitaran - RURAL",
   "value": "MPPKVVCL RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SKPR00000SIK01",
   "value": "Sikkim Power - RURAL",
   "value": "SKMPWR RURAL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BESLOB000RAJ02",
   "value": "Bharatpur Electricity Services Ltd. (BESL)",
   "value": "BESL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "BKESL0000RAJ02",
   "value": "Bikaner Electricity Supply Limited (BkESL)",
   "value": "BKESL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KEDLOB000RAJ02",
   "value": "Kota Electricity Distribution Limited (KEDL)",
   "value": "KEDL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "RELI00000MUM03",
   "value": "Adani Electricity Mumbai Limited",
   "value": "ADANI",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TPADL0000AJM02",
   "value": "TP Ajmer Distribution Ltd (TPADL)",
   "value": "TPADL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KESCO0000UTP01",
   "value": "Kanpur Electricity Supply Company",
   "value": "KESCO",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GED000000GOA01",
   "value": "Goa Electricity Department",
   "value": "GED",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DOPN00000NAG01",
   "value": "Department of Power\t Nagaland",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "MESCOM000KAR01",
   "value": "Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR",
   "value": "MESCOM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "SKPR00000SIK02",
   "value": "Sikkim Power - URBAN",
   "value": "SKMPWR URBAN",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "CESU00000ODI01",
   "value": "TP Central Odisha Distribution Ltd.",
   "value": "CESU",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KSEBL0000KER01",
   "value": "Kerala State Electricity Board Ltd. (KSEBL)",
   "value": "KSEBL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "PEDM00000MIZ01",
   "value": "Power & Electricity Department - Mizoram",
   "value": "PEDM",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "HPSEB0000HIP02",
   "value": "Himachal Pradesh State Electricity Board",
   "value": "HPSEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GOVE00000PUDN0",
   "value": "Government of Puducherry Electricity Department",
   "value": "PYEB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MPPO00000MAP0Y",
   "value": "MP Poorva Kshetra Vidyut Vitaran Co. Ltd Jabalpur - NGB billing system",
   "value": "MPJNRAP",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "ELEC00000CHA3L",
   "value": "Electricity Department Chandigarh",
   "value": "CHD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "TORR00000NATLX",
   "value": "Torrent Power",
   "value": "TOR PWR",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "DEPA00000NATES",
   "value": "Department of Power\t Government of Arunachal Pradesh",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "UTTA00000UTT7M",
   "value": "Uttarakhand Power Corporation Limited",
   "value": "UPCL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "JAMM00000JAKCP",
   "value": "Jammu and Kashmir Power Development Department",
   "value": "JKPDD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "MANG00000KAR75",
   "value": "Mangalore Electricity Supply Company LTD (Non RAPDR)",
   "value": "Mangalore Electricity Supply Company LTD (Non RAPD",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "WEST00000WBL75",
   "value": "West Bengal Electricity",
   "value": "WBSEDCLOB",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "LAKS00000LAKP8",
   "value": "Lakshadweep Electricity Department",
   "value": "Lakshadweep Electricity Department",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "GIFT00000GUJ6Z",
   "value": "Gift Power Company Limited",
   "value": "Gift Power Company Limited",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "KANN00000KERXX",
   "value": "Kannan Devan Hills Plantations Company Private Limited",
   "value": "KDHPCPL",
   "is_fetch": 1,
   "Category": "Electricity"
  },
  {
   "biller_id": "DEPA00000ARPD5",
   "value": "Department of Power\t Government of Arunachal Pradesh - Prepaid",
   "value": 0,
   "is_fetch": "Electricity"
  },
  {
   "biller_id": "INDI00000NATTR",
   "value": "Indian Highways Management Company Ltd FASTag",
   "value": "IHMCL FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "INDU00000NATR2",
   "value": "IndusInd Bank FASTag",
   "value": "IBL FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "BANK00000NATDH",
   "value": "Bank of Baroda - Fastag",
   "value": "BOBFAST",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "TOLL00000NAT72",
   "value": "ICICI Bank Fastag",
   "value": "ICICI Fastag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "AXIS00000NATSN",
   "value": "Axis Bank FASTag",
   "value": "AXISBFTG",
   "is_fetch": 0,
   "Category": "FastTag"
  },
  {
   "biller_id": "IDFC00000NATXM",
   "value": "IDFC FIRST Bank - FasTag",
   "value": "IDFC",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "HDFC00000NAT5K",
   "value": "HDFC Bank - Fastag",
   "value": "HDFCFAST",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "KOTA00000NATJZ",
   "value": "Kotak Mahindra Bank - Fastag",
   "value": "KMB",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "EQUI00000NATNF",
   "value": "Equitas FASTag Recharge",
   "value": "EQTSFT",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "THEF00000NATZO",
   "value": "Federal Bank - FASTag",
   "value": "The Federal Bank Limited",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "PAYT00000NATTQ",
   "value": "Paytm Payments Bank FASTag",
   "value": "PPBLFASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "TRAN00000NATSE",
   "value": "Transaction Analyst (T Wallet\t TA Wallet and TAG-ITI Wallet)",
   "value": 0,
   "is_fetch": "FastTag"
  },
  {
   "biller_id": "PAUL00000NATKI",
   "value": "Paul Merchants",
   "value": "Paul Merchants",
   "is_fetch": 0,
   "Category": "FastTag"
  },
  {
   "biller_id": "JAMM00000NATWB",
   "value": "Jammu and Kashmir Bank Fastag",
   "value": "Jammu and Kashmir Bank FASTag",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "IDBI00000NATK7",
   "value": "IDBI Bank Fastag",
   "value": "IDBI FASTAG",
   "is_fetch": 1,
   "Category": "FastTag"
  },
  {
   "biller_id": "RELIGARENBC001",
   "value": "Religare Health Insurance Co Ltd.",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTUREGENLIFENBC001",
   "value": "Future Generali Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BALICNBC0001",
   "value": "Bajaj Allianz Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "HDFC00000NATV4",
   "value": "HDFC Life Insurance Co. Ltd.",
   "value": "HDFC Life",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NATQ9",
   "value": "Care Health Insurance",
   "value": "Religare",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "EXID00000NAT25",
   "value": "Exide Life Insurance",
   "value": "EXIDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "PRAM00000NATYI",
   "value": "Pramerica Life Insurance Limited",
   "value": "DHFLPRL",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTU00000NAT09",
   "value": "Future Generali India Life Insurance Company Limited",
   "value": "FG life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "TATA00000NATLP",
   "value": "TATA AIA Life Insurance",
   "value": "TATAAIA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NATRI",
   "value": "Shriram Life Insurance Co Ltd",
   "value": "SHRLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ICICILOMNBC0001",
   "value": "ICICI Lombard Motor Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUGEGNNBC001",
   "value": "Future Generali General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "FUTEGENHLNBC0001",
   "value": "Future Generali Health Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NAT3O",
   "value": "Reliance Nippon Life Insurance",
   "value": "RNLIC",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "STAR00000NATXZ",
   "value": "Star Union Dai Ichi Life Insurance",
   "value": "SUDILI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BAJA00000NATP5",
   "value": "Bajaj Allianz Life Insurance Company Limited",
   "value": "BJALI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "RELI00000NATBP",
   "value": "Reliance General Insurance Company Limited",
   "value": "RGI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "BAJA00000NAT58",
   "value": "Bajaj Allianz General Insurance",
   "value": "BAGIC",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "AVIV00000NAT5I",
   "value": "Aviva Life Insurance",
   "value": "AVIVA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAXB00000NAT28",
   "value": "Max Bupa Health Insurance",
   "value": "MAXBUPA",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NATKR",
   "value": "Shriram General Insurance (Old)",
   "value": "Shriram General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "AEGO00000NATRJ",
   "value": "Aegon Life Insurance",
   "value": "Aegon",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ROYA00000NAT2C",
   "value": "Royal Sundaram General Insurance Co. Limited",
   "value": "Royal Sundaram General Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NAT61",
   "value": "Magma HDI - Motor Insurance",
   "value": "magmahdi_motor",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NAT6B",
   "value": "Magma HDI - Health Insurance",
   "value": "magmahdi_health",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAGM00000NATQI",
   "value": "Magma HDI - Non Motor Insurance",
   "value": "magmahdi life",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SBIL00000NATT0",
   "value": "SBI Life Insurance Company Limited",
   "value": "SBI Life Insurance Company Limited",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "KOTA00000NATDP",
   "value": "Kotak Life Insurance Company Limited",
   "value": "Kotak Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "CANA00000NATPI",
   "value": "Canara HSBC OBC Life Insurance",
   "value": "Canara HSBC OBC Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ICIC00000NATGF",
   "value": "ICICI Prudential Life Insurance - New",
   "value": "IPRU",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "MAXL00000NAT0Q",
   "value": "Max Life Insurance Company Limited",
   "value": "Max Life Insurance",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "IDBI00000NATRX",
   "value": "Ageas Federal Life Insurance Company Limited",
   "value": "IDBIFEDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "ADIT00000NATVO",
   "value": "Aditya Birla Health Insurance Co Limited",
   "value": "Aditya Birla Health Insurance Co Limited",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "EXID00000NATSX",
   "value": "Exide Life Insurance",
   "value": "EXIDLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "PRAM00000NATDP",
   "value": "Pramerica Life Insurance Limited",
   "value": "DHFLPRL",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "SHRI00000NAT51",
   "value": "Shriram General Insurance",
   "value": "Shriram General Insurance Co. Ltd.",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "INDI00000NAT3L",
   "value": "IndiaFirst Life Insurance Company Ltd",
   "value": "IFLI",
   "is_fetch": 1,
   "Category": "Insurance"
  },
  {
   "biller_id": "HOMECRDTNBC001",
   "value": "Home Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTHOOTNBC001",
   "value": "Muthoot",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINTREENBC001",
   "value": "FinTree Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ZESTMONEYNBC001",
   "value": "ZEST Money",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MANAPPURAMNBC001",
   "value": "Manappuram",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJAJFINNBC0001",
   "value": "Bajaj Finserv Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BFL000000NAT01",
   "value": "Bajaj Finance",
   "value": "BFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IDFC00000NATCK",
   "value": "IDFC FIRST Bank Ltd",
   "value": "IDFB",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "PAIS00000NATCV",
   "value": "Paisa Dukan-Borrower EMI",
   "value": "PAISA DUKAN -Borrower EMI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LAMP00000NAT7E",
   "value": "L and T Financial Services",
   "value": "LTFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FLEX00000NATJL",
   "value": "Flexsalary",
   "value": "FLEX SALARY",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LOKS00000NATC9",
   "value": "Loksuvidha",
   "value": "LOKSUVIDHA",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MOTI00000NATHD",
   "value": "Motilal Oswal Home Finance",
   "value": "MOTILAL OSWAL HOME FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SNAP00000NAT61",
   "value": "Snapmint",
   "value": "SNAP MINT",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TATA00000NATGS",
   "value": "Tata Capital Financial Services Limited",
   "value": "TATA CAPITAL FINANCIAL SERVICES LIMITED",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADIT00000NATRA",
   "value": "Aditya Birla Housing Finance Limited",
   "value": "ABHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT7D",
   "value": "Shriram City Union Finance Ltd",
   "value": "SRCUFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NAT2P",
   "value": "Dhani Loan & Services Ltd",
   "value": "IBCF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LAND00000NATRD",
   "value": "L and T Housing Finance",
   "value": "LTHF",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HERO00000NAT7F",
   "value": "Hero FinCorp Limited - Old",
   "value": "HFCL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AAVA00000NATMF",
   "value": "AAVAS FINANCIERS LIMITED",
   "value": "AAVAS FINANCIERS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATYG",
   "value": "Indiabulls Housing Finance Limited",
   "value": "IBHF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AVAI00000NAT7J",
   "value": "Avail",
   "value": "Avail",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATV1",
   "value": "Bajaj Auto Finance",
   "value": "BAJAJ AUTO FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JANA00000NATO4",
   "value": "Jana Small Finance Bank",
   "value": "JSFB",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CMFINANCENBC0001",
   "value": "Chaitanya Micro Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DGFINANCENBC0001",
   "value": "Digamber Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CLIX00000NATST",
   "value": "Clix",
   "value": "Clix",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VART00000NATHC",
   "value": "Varthana",
   "value": "Varthana",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAPR00000NATC0",
   "value": "Capri Global Capital Limited",
   "value": "Capri Global Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAPR00000NATUB",
   "value": "Capri Global Housing Finance",
   "value": "Capri Global Housing",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ESSK00000NATFR",
   "value": "Ess Kay Fincorp Limited",
   "value": "ESS KAY FINCORP",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FAIR00000NAT6Z",
   "value": "Faircent-Borrower EMI Account",
   "value": "Faircent-Borrower EMI Account",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "I2IF00000NAT6K",
   "value": "i2i Funding-Borrower EMI Repayment",
   "value": "I2I",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MANA00000NATWG",
   "value": "Manappuram Finance Limited-Vehicle Loan",
   "value": "MFL-Vehicle Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AROH00000WBL0I",
   "value": "Arohan Financial Services Ltd",
   "value": "Arohan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT7E",
   "value": "Shriram Housing Finance Limited",
   "value": "SHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CONBB0000PUN01",
   "value": "Connect Broadband",
   "value": "CONNECT BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATHWAY00NAT01",
   "value": "Hathway Broadband",
   "value": "HATHWAY BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIKO00000NAT01",
   "value": "Tikona Infinet Pvt Ltd",
   "value": "TIKONA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ACT000000NAT01",
   "value": "ACT Fibernet",
   "value": "ACTFIBER",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT01",
   "value": "Airtel Broadband",
   "value": "AIRTEL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NEXTRA000NAT01",
   "value": "Nextra Broadband",
   "value": "NEXTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SPENET000NAT01",
   "value": "Spectra",
   "value": "SPECTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TTN000000NAT01",
   "value": "TTN BroadBand",
   "value": "TTN BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT02",
   "value": "Airtel Broadband (Fetch & Pay)",
   "value": "AIRTEL BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIABB000NAT01",
   "value": "Asianet Broadband (Old)",
   "value": "ASIABB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "COMWBB000NAT01",
   "value": "Comway Broadband",
   "value": "COMWBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FUSNBB000NAT01",
   "value": "Fusionnet Web Services Private Limited",
   "value": "FUSNBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DVOIS0000NAT02",
   "value": "ION",
   "value": "ION BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000CHHZV",
   "value": "Instalinks",
   "value": "INTAL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "MNET00000ASM5W",
   "value": "M-NET Fiber Fast",
   "value": "MNET",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DENB00000NATIO",
   "value": "DEN Broadband",
   "value": "DEN",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIMB00000NATRQ",
   "value": "Timbl Broadband",
   "value": "Timbl",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000BIHKL",
   "value": "Instanet Broadband",
   "value": "INSTANBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "VFIB00000NATJJ",
   "value": "Vfibernet Broadband",
   "value": "VFIB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NETP00000PUNS8",
   "value": "Netplus Broadband",
   "value": "NETPB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FLAS00000NATVZ",
   "value": "Flash Fibernet",
   "value": "FLAFBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "EXCE00000NATDP",
   "value": "Excell Broadband",
   "value": "ExcellBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SWIF00000NATVE",
   "value": "Swifttele Enterprises Private Limited",
   "value": "Swift Tele",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ALLI00000NATHB",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "RURA00000NAT9E",
   "value": "AirJaldi - Rural Broadband",
   "value": "AirJaldi - Rural Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SKYL00000NATJB",
   "value": "Skylink Fibernet Private Limited",
   "value": "Skylink Fibernet Private Limited",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIA00000NAT6O",
   "value": "Asianet Broadband",
   "value": "Asianet Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATH00000NATRZ",
   "value": "Hathway Digital Cable TV",
   "value": "HATHWAY TV",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "ASIA00000NATA2",
   "value": "Asianet Digital",
   "value": "ASIADIGI",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "INTE00000NATHP",
   "value": "Intermedia Cable Communication Pvt Ltd",
   "value": "ICC Network",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "DENHATHWAY001",
   "value": "Den Hathway Cable",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "HATHWAY001",
   "value": "Den Hathway Cable",
   "is_fetch": 1,
   "Category": "Cable"
  },
  {
   "biller_id": "INDI00000NAT78",
   "value": "INDigital",
   "value": "INDigital",
   "is_fetch": 0,
   "Category": "Cable"
  },
  {
   "biller_id": "BANK00000NATKB",
   "value": "BoB Credit Card",
   "value": "BFSL",
   "is_fetch": 1,
   "Category": "CreditCard"
  },
  {
   "biller_id": "DISH00000NAT01",
   "value": "Dish TV",
   "value": "DISH TV DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "TATASKY00NAT01",
   "value": "Tata Sky",
   "value": "TATA SKY DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "SUND00000NAT02",
   "value": "Sun Direct TV",
   "value": "SUN DIRECT DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "VIDEOCON0NAT01",
   "value": "Videocon D2H",
   "value": "Videocon DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "AIRT00000NAT87",
   "value": "Airtel DTH",
   "value": "Airtel DTH",
   "is_fetch": 0,
   "Category": "DTH"
  },
  {
   "biller_id": "VAST00000NATLW",
   "value": "Vastu Housing Finance Corporation Limited",
   "value": "VHFCL - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CAMD00000NATAI",
   "value": "ZestMoney",
   "value": "Zest Money",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DMIF00000NATMN",
   "value": "DMI Finance Private Limited",
   "value": "DMI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LOAN00000NATVP",
   "value": "LOANTAP CREDIT PRODUCTS PRIVATE LIMITED",
   "value": "LoanTap",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MONE00000NATX1",
   "value": "RupeeRedee",
   "value": "RupeeRedee",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SICR00000NATDG",
   "value": "Kissht",
   "value": "Kissht",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VISA00000NAT5A",
   "value": "Kinara Capital",
   "value": "Kinaara Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "EASY00000MAH6N",
   "value": "Easy Home Finance Limited",
   "value": "EHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NAT0I",
   "value": "Muthoot Microfin Limited",
   "value": "Muthoot Microfin Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SHRI00000NAT23",
   "value": "Shriram Transport Finance Company Limited",
   "value": "STFC",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATN6",
   "value": "Axis Finance Limited",
   "value": "Axis Finance Ltd.",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CARS00000NAT4G",
   "value": "Cars24 Financial Services Private Limited",
   "value": "Cars24",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JAIN00000NATVC",
   "value": "Jain Autofin",
   "value": "Jain Autofin Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AUBA00000NATGM",
   "value": "AU Bank Loan Repayment",
   "value": "AU Bank Loan Repayment",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OXYZ00000NATSE",
   "value": "Oxyzo Financial Services Pvt Ltd",
   "value": "Oxyzo Financial Services Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TOYO00000NAT59",
   "value": "Toyota Financial Services",
   "value": "TFS",
   "is_fetch": 0,
   "Category": "Loan"
  },
  {
   "biller_id": "ICIC00000NATKD",
   "value": "ICICI Bank Ltd - Loans",
   "value": "ICICI Bank Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATYF",
   "value": "Muthoot Capital Services Ltd",
   "value": "Muthoot Capital Services Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ANNA00000NATUO",
   "value": "Annapurna Finance Private Limited-MFI",
   "value": "Annapurna Finance Private Limited-MFI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FULL00000NAT8X",
   "value": "Fullerton India Housing Finance Limited",
   "value": "Fullerton India Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FULL00000NATD4",
   "value": "Fullerton India credit company limited",
   "value": "Fullerton India credit company limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "GUFI00000NATV8",
   "value": "G U Financial Services Pvt Ltd",
   "value": "GU Financial",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AVAN00000NATHI",
   "value": "Avanse Financial Services Ltd",
   "value": "AFSL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAID00000NATWG",
   "value": "Baid Leasing and Finance",
   "value": "BAID LEASING AND FINANCE",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BERA00000NATOY",
   "value": "BERAR Finance Limited",
   "value": "BERAR Finance Limited",
   "is_fetch": 0,
   "Category": "Loan"
  },
  {
   "biller_id": "OHMY00000NATFH",
   "value": "OHMYLOAN",
   "value": "OHMY Loan Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OMLP00000NAT0A",
   "value": "OMLP2P.COM",
   "value": "OHMy Technologies Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADAN00000NATO6",
   "value": "Adani Capital Pvt Ltd",
   "value": "Adani Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ANNA00000NATMR",
   "value": "Annapurna Finance Private Limited-MSME",
   "value": "Annapurna Finance Pvt Ltd-MSME",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINC00000NAT3E",
   "value": "Fincare Small Finance Bank",
   "value": "Fincare_bank",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NAT12",
   "value": "India Shelter Finance Corporation Limited",
   "value": "India Shelter Finance Corporation Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KANA00000NATQV",
   "value": "Kanakadurga Finance Limited",
   "value": "Kanakadurga Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHI00000NATIC",
   "value": "Mahindra Home Finance",
   "value": "Mahindra Rural Housing Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ALTU00000NATG5",
   "value": "Altum Credo Home Finance",
   "value": "Altum Credo Home Finance Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAXV00000NAT33",
   "value": "Maxvalue Credits And Investments Ltd",
   "value": "Maxvalue Credits And Investments Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SVAT00000NATUB",
   "value": "Svatantra Microfin Private Limited",
   "value": "SMF - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT0U",
   "value": "Credit Wise Capital",
   "value": "Credit Wise Capital Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FLEX00000NAT3Z",
   "value": "FlexiLoans",
   "value": "Epimoney Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDU00000NATQH",
   "value": "INDUSIND BANK - CFD",
   "value": "INDUSIND CFD LOANS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CHAI00000NATYY",
   "value": "Chaitanya India Fin Credit Pvt Ltd",
   "value": "Chaitanya_Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DIGA00000NAT3C",
   "value": "Digamber Capfin Limited",
   "value": "digamber capfin",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MIDL00000NATIP",
   "value": "Midland Microfin Ltd",
   "value": "Midland",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HERO00000NATI6",
   "value": "Hero FinCorp Limited",
   "value": "Hero FinCorp Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ASCE00000NATGK",
   "value": "Ascend Capital",
   "value": "Ascend Capital",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DCBB00000NAT2K",
   "value": "DCB Bank Loan Repayment",
   "value": "DCBLOAN",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "EDUV00000NATF1",
   "value": "Eduvanz Financing Pvt. Ltd.",
   "value": "Eduvanz Financing Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATQF",
   "value": "India Home Loan Limited",
   "value": "India Home Loan Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MINT00000NATUB",
   "value": "Mintifi Finserve Private Limited",
   "value": "Mintifi Finserve Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NIDH00000NAT9K",
   "value": "Nidhilakshmi Finance",
   "value": "Nidhilakshmi Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NMFI00000NATGX",
   "value": "NM Finance",
   "value": "NM Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "OROB00000NAT7P",
   "value": "Oroboro",
   "value": "Oroboro",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HIRA00000NATSP",
   "value": "Hiranandani Financial Services Pvt Ltd",
   "value": "Hiranandani Financial Services",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HOME00000NATVX",
   "value": "Home First Finance Company India Limited",
   "value": "Home First Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "HOME00000NATWT",
   "value": "Home Credit India Finance Pvt. Ltd",
   "value": "Home Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "UJJI00000NATAW",
   "value": "Ujjivan Small Finance Bank",
   "value": "Ujjivan Small Finance Bank",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IIFL00000NAT5F",
   "value": "IIFL Finance Limited",
   "value": "IIFL Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IIFL00000NATMF",
   "value": "IIFL Home Finance",
   "value": "IIFL Home Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "LIGH00000NATKW",
   "value": "Light Microfinance Private Limited",
   "value": "LMF",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MONE00000NAT7P",
   "value": "MoneyTap",
   "value": "Tapstart Capital Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT35",
   "value": "CreditAccess Grameen - Retail Finance",
   "value": "CreditAccess Grameen - Retail Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CRED00000NAT8X",
   "value": "CreditAccess Grameen - Microfinance",
   "value": "CreditAccess Grameen (Microfinance)",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KHUS00000NAT1L",
   "value": "Khush Housing Finance Pvt Ltd",
   "value": "KHFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TVSC00000NAT0T",
   "value": "TVS Credit",
   "value": "TVS Credit",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATM1",
   "value": "Axis Bank Limited - Retail Loan",
   "value": "Axis Bank Ltd - Retail Loan",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INCR00000NATJG",
   "value": "InCred",
   "value": "InCred",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "POOJ00000NATWO",
   "value": "Pooja Finelease LTD.",
   "value": "Pooja Finlease",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "STAS00000NATX1",
   "value": "StashFin",
   "value": "EQX Analytics Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTHTGLDNBC0001",
   "value": "Muthoot Gold Bullion Corporation",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADAN00000NATI9",
   "value": "Adani Housing Finance",
   "value": "Adani Housing Finance Private",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATP2",
   "value": "Bajaj Auto Finance",
   "value": "Bajaj Auto Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AGOR00000NATQL",
   "value": "Agora Microfinance India Ltd - AMIL",
   "value": "Agora Microfinance India Ltd - AMIL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JANA00000NATV5",
   "value": "Janakalyan Financial Services Private Limited",
   "value": "Janakalyan Financial Services Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHA00000NATSI",
   "value": "Mahaveer Finance India Limited",
   "value": "Mahaveer Finance India Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JAIN00000NATOA",
   "value": "Jain Motor Finmart",
   "value": "Jain Motor Finmart",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATB0",
   "value": "Muthoot Fincorp Ltd",
   "value": "Muthoot Fincorp Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AXIS00000NATJD",
   "value": "Axis Bank Limited-Microfinance",
   "value": "Axis Bank Limited-Microfinance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ORAN00000NATJX",
   "value": "Orange Retail Finance India Pvt Ltd",
   "value": "Orange Retail Finance India Pvt Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "VIST00000NAT6D",
   "value": "Vistaar Financial services Private Limited",
   "value": "Vistaar Financial services Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BHAR00000NAT52",
   "value": "Bharat Financial Inclusion Ltd",
   "value": "BFIL - NATIONAL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KOTA00000NATE1",
   "value": "Kotak Mahindra Prime Limited",
   "value": "Kotak Mahindra Prime Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MAHI00000NATKR",
   "value": "Mahindra and Mahindra Financial Services Limited",
   "value": "Mahindra and Mahindra Financial Services Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "JOHN00000NATY9",
   "value": "John Deere Financial India Private Limited",
   "value": "John Deere Financial India Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATOI",
   "value": "Muthoot Finance",
   "value": "MFL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "DVAR00000NAT2B",
   "value": "Dvara Kshetriya Gramin Financials Private Limited",
   "value": "Dvara KGFS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "TATA00000NATOM",
   "value": "Tata Capital Housing Finance Limited",
   "value": "Tata Capital Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NETA00000NATEN",
   "value": "Netafim Agricultural Financing Agency Pvt. Ltd.",
   "value": "NAFA",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SMEC00000NATPI",
   "value": "SMEcorner",
   "value": "SMEcorner",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "KOTA00000NATTW",
   "value": "Kotak Mahindra Bank Ltd.-Loans",
   "value": "Kotak Mahindra Bank Ltd.-Loans",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SAMA00000NAT1C",
   "value": "Samasta Microfinance Limited",
   "value": "Samasta Microfinance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDI00000NATZE",
   "value": "Indiabulls Commercial Credit Ltd",
   "value": "Indiabulls Commercial Credit Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "APTU00000NAT2L",
   "value": "Aptus Value Housing Finance India Limited",
   "value": "APTUS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "APTU00000NATP0",
   "value": "Aptus Finance India Private Limited",
   "value": "APTFI",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "NOVE00000NAT6M",
   "value": "Novelty Finance Ltd",
   "value": "Novelty Finance Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "THAZ00000NATR8",
   "value": "Thazhayil Nidhi Ltd",
   "value": "TNL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MITR00000NAT6L",
   "value": "Mitron Capital",
   "value": "MItron",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "X10F00000NATSA",
   "value": "X10 Financial Services Limited",
   "value": "X10 Financial Services Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "YOGA00000NATLH",
   "value": "Yogakshemam Loans Ltd",
   "value": "YOGLOANS",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "MUTH00000NATJO",
   "value": "Muthoot Housing Finance Company Limited",
   "value": "MHFCL",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ESAF00000NAT5J",
   "value": "ESAF Small Finance Bank (Micro Loans)",
   "value": "ESAF Small Finance Bank (Micro Loans)",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "RAND00000NAT4D",
   "value": "Rander Peoples Co Operative Bank Ltd",
   "value": "Rander Peoples Co Operative Bank Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SMIL00000NATGH",
   "value": "SMILE Microfinance Limited",
   "value": "SMILE_Finance",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "FINO00000NATVP",
   "value": "Finova Capital Private Ltd",
   "value": "Finova Capital Private Ltd",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "ADIT00000NATZ1",
   "value": "Aditya Birla Finance Limited",
   "value": "Aditya Birla Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AYAA00000NAT5Y",
   "value": "Ayaan Finserve India Private LTD",
   "value": "Ayaan Finserve India Private LTD",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "SARV00000NATV8",
   "value": "Sarvjan India Fintech Private Limited",
   "value": "Sarvjan India Fintech Private Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "AADH00000NATPT",
   "value": "Aadhar Housing Finance Limited",
   "value": "Aadhar Housing Finance Limited",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "IDFF00000NAT1B",
   "value": "IDF Financial Services Private Limited",
   "value": "IDF Financial Services",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "BAJA00000NATDK",
   "value": "Bajaj Housing Finance Limited",
   "value": "BHFL - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CENT00000NATSH",
   "value": "Centrum Microcredit Limited",
   "value": "CML - National",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "INDO00000NATGP",
   "value": "Indostar Capital Finance Limited - CV",
   "value": "ICFL-CV",
   "is_fetch": 1,
   "Category": "Loan"
  },
  {
   "biller_id": "CONBB0000PUN01",
   "value": "Connect Broadband",
   "value": "CONNECT BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HATHWAY00NAT01",
   "value": "Hathway Broadband",
   "value": "HATHWAY BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIKO00000NAT01",
   "value": "Tikona Infinet Pvt Ltd",
   "value": "TIKONA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ACT000000NAT01",
   "value": "ACT Fibernet",
   "value": "ACTFIBER",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT01",
   "value": "Airtel Broadband",
   "value": "AIRTEL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NEXTRA000NAT01",
   "value": "Nextra Broadband",
   "value": "NEXTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SPENET000NAT01",
   "value": "Spectra",
   "value": "SPECTRA BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TTN000000NAT01",
   "value": "TTN BroadBand",
   "value": "TTN BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ATBROAD00NAT02",
   "value": "Airtel Broadband (Fetch & Pay)",
   "value": "AIRTEL BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIABB000NAT01",
   "value": "Asianet Broadband (Old)",
   "value": "ASIABB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "COMWBB000NAT01",
   "value": "Comway Broadband",
   "value": "COMWBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FUSNBB000NAT01",
   "value": "Fusionnet Web Services Private Limited",
   "value": "FUSNBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DVOIS0000NAT02",
   "value": "ION",
   "value": "ION BB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000CHHZV",
   "value": "Instalinks",
   "value": "INTAL BB",
   "is_fetch": 0,
   "Category": "BroadBand"
  },
  {
   "biller_id": "MNET00000ASM5W",
   "value": "M-NET Fiber Fast",
   "value": "MNET",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "DENB00000NATIO",
   "value": "DEN Broadband",
   "value": "DEN",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "TIMB00000NATRQ",
   "value": "Timbl Broadband",
   "value": "Timbl",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "INST00000BIHKL",
   "value": "Instanet Broadband",
   "value": "INSTANBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "VFIB00000NATJJ",
   "value": "Vfibernet Broadband",
   "value": "VFIB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "NETP00000PUNS8",
   "value": "Netplus Broadband",
   "value": "NETPB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "FLAS00000NATVZ",
   "value": "Flash Fibernet",
   "value": "FLAFBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "EXCE00000NATDP",
   "value": "Excell Broadband",
   "value": "ExcellBB",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SWIF00000NATVE",
   "value": "Swifttele Enterprises Private Limited",
   "value": "Swift Tele",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ALLI00000NATHB",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "value": "Alliance Broadband Services Pvt. Ltd.",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "RURA00000NAT9E",
   "value": "AirJaldi - Rural Broadband",
   "value": "AirJaldi - Rural Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "SKYL00000NATJB",
   "value": "Skylink Fibernet Private Limited",
   "value": "Skylink Fibernet Private Limited",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "ASIA00000NAT6O",
   "value": "Asianet Broadband",
   "value": "Asianet Broadband",
   "is_fetch": 1,
   "Category": "BroadBand"
  },
  {
   "biller_id": "HPCL00000NAT01",
   "value": "HP Gas (HPCL)",
   "value": "HPCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "BHAR00000NATR4",
   "value": "Bharat Gas (BPCL)",
   "value": "BPCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "INDI00000NATT5",
   "value": "Indane Gas (Indian Oil)",
   "value": "IOCL",
   "is_fetch": 1,
   "Category": "LpgGas"
  },
  {
   "biller_id": "DLJB00000DEL01",
   "value": "Delhi Jal Board",
   "value": "DJB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCG000000GUR01",
   "value": "Municipal Corporation of Gurugram",
   "value": "MCG",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UJS000000UTT01",
   "value": "Uttarakhand Jal Sansthan",
   "value": "UJS",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "BWSSB0000KAR01",
   "value": "Bangalore Water Supply and Sewerage Board",
   "value": "BWSSB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "HMWSS0000HYD01",
   "value": "Hyderabad Metropolitan Water Supply and Sewerage Board",
   "value": "HMWSSB",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCJ000000PUN01",
   "value": "Municipal Corporation Jalandhar",
   "value": "MCJ",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCL000000PUN01",
   "value": "Municipal Corporation Ludhiana - Water",
   "value": "MCL",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "NDMC00000DEL01",
   "value": "New Delhi Municipal Council (NDMC) - Water",
   "value": "NDMC WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "SMC000000GUJ01",
   "value": "Surat Municipal Corporation - Water",
   "value": "SMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UNN000000MAP01",
   "value": "Ujjain Nagar Nigam - PHED",
   "value": "PHEDU",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PUNE00000MAHSE",
   "value": "Pune Municipal Corporation - Water",
   "value": "PMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "UITWOB000BHW02",
   "value": "Urban Improvement Trust (UIT) - Bhiwadi",
   "value": "UIT BHIWADI",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "GWMC00000WGL01",
   "value": "Greater Warangal Municipal Corporation - Water",
   "value": "GWMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "RMC000000JHA01",
   "value": "Ranchi Municipal Corporation",
   "value": "RMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "SMC000000DNH01",
   "value": "Silvassa Municipal Council",
   "value": "SMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCA000000PUN01",
   "value": "Municipal Corporation of Amritsar",
   "value": "MCA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "HUDA00000HAR01",
   "value": "Haryana Urban Development Authority",
   "value": "HSVP",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MCC000000KAR01",
   "value": "Mysuru City Corporation",
   "value": "MCC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PCMC00000MAH01",
   "value": "Pimpri Chinchwad Municipal Corporation(PCMC)",
   "value": "PCMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PMC000000PUN01",
   "value": "Punjab Municipal Corporations\/Councils",
   "value": "PMIDC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "DELH00000DEL6Q",
   "value": "Delhi Development Authority (DDA) - Water",
   "value": "DDA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "DEPA00000MIZ9U",
   "value": "Department of Public Health Engineering-Water\t Mizoram",
   "value": 0,
   "is_fetch": "Water"
  },
  {
   "biller_id": "KERA00000KERMO",
   "value": "Kerala Water Authority (KWA)",
   "value": "KWA",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MUNI00000CHANI",
   "value": "Municipal Corporation Chandigarh",
   "value": "MCC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "KALY00000THA3E",
   "value": "Kalyan Dombivali Municipal Corporation - Water",
   "value": "KDMC",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MADH00000MAPJV",
   "value": "Madhya Pradesh Urban (e-Nagarpalika) - Water",
   "value": "e NagarPalika Madhya Pradesh Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PORT00000ANI1K",
   "value": "Port Blair Municipal Council - Water",
   "value": "PBMC - Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "VASA00000THAE9",
   "value": "Vasai Virar Municipal Corporation - Water",
   "value": "VVCMC WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "JALK00000UTP0P",
   "value": "Jalkal Vibhag Nagar Nigam Prayagraj",
   "value": "Prayagraj Nagar Nigam-Water",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "NAGA00000ALG45",
   "value": "Nagar Nigam Aligarh",
   "value": "Nagar Nigam Aligarh",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "PUBL00000HARBB",
   "value": "Public Health Engineering Department\t Haryana",
   "value": 0,
   "is_fetch": "Water"
  },
  {
   "biller_id": "KOLH00000MAHN3",
   "value": "Kolhapur Municipal Corporation - Water Tax",
   "value": "KMCWT",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "VATV00000GUJ91",
   "value": "Vatva Industrial Estate Infrastructure Development Ltd",
   "value": "Vatva Industrial Estate Infrastructure Development",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MUNI00000HARG6",
   "value": "Municipal Corporation of Gurugram (MCG) - Water",
   "value": "MCG WATER",
   "is_fetch": 1,
   "Category": "Water"
  },
  {
   "biller_id": "MTNL00000DEL01",
   "value": "MTNL Delhi",
   "value": "MTNL DEL LL POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "MTNL00000MUM01",
   "value": "MTNL Mumbai",
   "value": "MTNL LL POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "ATLLI0000NAT01",
   "value": "Airtel Landline",
   "value": "AIRTEL LLI POSTPAID",
   "is_fetch": 0,
   "Category": "Landline"
  },
  {
   "biller_id": "TATADLLI0NAT01",
   "value": "Tata Teleservices",
   "value": "TATADLLI",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "ATLLI0000NAT02",
   "value": "Airtel Landline (Fetch & Pay)",
   "value": "AIRTEL LLI POSTPAID",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "BSNL00000NAT5C",
   "value": "BSNL Landline - Individual",
   "value": "BSNLROB",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "BSNL00000NATPZ",
   "value": "BSNL Landline - Corporate",
   "value": "BSNLCOB",
   "is_fetch": 1,
   "Category": "Landline"
  },
  {
   "biller_id": "APCPDCL0000AP01",
   "value": "Central Power Distribution Company Ltd. of Andra Pradesh (APCPDCL)",
   "value": "APCPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "APEPDCL0000AP02",
   "value": "Eastern Power Distribution Co Ltd. of Andra Pradesh (APEPDCL)",
   "value": "APEPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "APSPDCL0000AP03",
   "value": "Southern Power Distribution Co Ltd. of Andra Pradesh (APSPDCL)",
   "value": "APSPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
   "biller_id": "TSNPDCL0000T01",
   "value": "Northern Power Distribution of Telangana Ltd (TSNPDCL)",
   "value": "TSNPDCL",
   "is_fetch": 0,
   "Category": "Electricity"
  },
  {
    "S No": 74,
    "OperatorName": "BSNL DC",
    "OperatorCode": "BDC",
    "Category": "Datacard",
    "value": "BSNL DC",
   },
   {
    "S No": 75,
    "OperatorName": "MTNL Delhi DC",
    "OperatorCode": "MDDC",
    "Category": "Datacard",
    "value": "MTNL Delhi DC"
   },
   {
    "S No": 76,
    "OperatorName": "MTNL Mumbai DC",
    "OperatorCode": "MMDC",
    "Category": "Datacard",
    "value": "MTNL Mumbai DC"
   },
   {
    "S No": 77,
    "OperatorName": "MTS Mblaze",
    "OperatorCode": "MTZ",
    "Category": "Datacard",
    "value": "MTS Mblaze"
   },
   {
    "S No": 78,
    "OperatorName": "MTS Mbrowse",
    "OperatorCode": "MTW",
    "Category": "Datacard",
    "value": "MTS Mbrowse"
   },
   {
    "S No": 79,
    "OperatorName": "Reliance NetConnect 1X",
    "OperatorCode": "RN",
    "Category": "Datacard",
    "value": "Reliance NetConnect 1X"
   },
   {
    "S No": 80,
    "OperatorName": "Reliance NetConnect 3G",
    "OperatorCode": "RNG",
    "Category": "Datacard",
    "value": "Reliance NetConnect 3G"
   },
   {
    "S No": 81,
    "OperatorName": "Reliance NetConnect+",
    "OperatorCode": "RNC",
    "Category": "Datacard",
    "value": "Reliance NetConnect+"
   },
   {
    "S No": 82,
    "OperatorName": "Tata Photon Whiz",
    "OperatorCode": "TPW",
    "Category": "Datacard",
    "value": "Tata Photon Whiz"
   },
   {
    "S No": 83,
    "OperatorName": "Tata Photon+",
    "OperatorCode": "TPP",
    "Category": "Datacard",
    "value": "Tata Photon+"
   }
 ]

export const circleCode = [
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
   "value": "Bihar Jharkhand",
   "Circle Code": 3,
   "label": "Bihar Jharkhand"
  },
  {
   "id": 4,
   "value": "Chennai",
   "Circle Code": 4,
   "label": "Chennai"
  },
  {
   "id": 5,
   "value": "Delhi NCR",
   "Circle Code": 5,
   "label": "Delhi NCR"
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
   "value": "Jammu Kashmir",
   "Circle Code": "Kashmir",
   "Column4": 9,
   "label": "Jammu Kashmir"
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
   "value": "Maharashtra",
   "Circle Code": "Goa (except Mumbai)",
   "Column4": 13,
   "label": "Maharashtra"
  },
  {
   "id": 14,
   "value": "Madhya Pradesh Chhattisgarh",
   "Circle Code": "Chhattisgarh",
   "Column4": 14,
   "label": "Madhya Pradesh Chhattisgarh"
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
   "value": "UP East",
   "Circle Code": 21,
   "label": "UP East"
  },
  {
   "id": 22,
   "value": "UP West",
   "Circle Code": 22,
   "label": "UP West"
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

    // interface MobileNumber {
    //   mobile_no: number;
    // };

     

    // export const useOperatorQuery = (data:any) => {
    //   return useQuery<Error>( [API_ENDPOINTS.RECHARGE_PLANS], (data) =>
    //   getOperatorDetails(data)
    //   );
    // };


  export default function MobileRechargeForm({click,variant} :any) {
      
    const loadOptions = async (inputValue:any, callback:any) => {

      // var data = await fetchSearch(inputValue);      

      // console.log('search data',data)
      
      callback(data);
    
      return data;

  };

    // const{data, isLoading} = useOperatorQuery( 
    //   data
    // );

    const[phoneNumber, setPhoneNumber] = useState<Number>(0)  ;
    const[plans,setPlans] = useState(null);
    const[addOnPlans,setAddOnPlans] = useState(null);
    const[operator, setOperator]=useState(null);
    const[operatorName, setOperatorName]=useState(null);
    // const[specialRechargeList,setSpecialRechargeList] = useState(null)
    const[circleName,setCircleName] = useState(null);
    const [loading,setLoading] = useState(false);
    const { openModal } = useModalAction();


    function handleModal(plans,operator,circle):any {
      return openModal("RECHARGE_PLANS",{
        plans: plans,
        operator: operator,
        circle: circle,
      });
    }

    function handlePlanDetails(operatorName,circleName):any {
      return openModal("RECHARGE_PLAN_DETAILS"
      ,{
        // plan: plan,
        operatorName: operatorName,
        circleName: circleName,
      }
      );
    }

    console.log('allplansdata',plans)

    console.log('number', phoneNumber.length)

    console.log('loading',loading)

     
    const queryClient = useQueryClient();

    const getOperatorDetails = async (data:any) => {
      console.log('data before',`${url}/${API_ENDPOINTS.OPERATOR}`)
      const { data: response } = await http.post(`${url}/${API_ENDPOINTS.OPERATOR}`, data);
      console.log('data after',response)
      return response;
    };

      const useOperatorQuery = (data)=> {
      return useQuery('',(data)=>
      getOperatorDetails(data)
      )
    }

    const getRechargePlans = async (data:any) => {
      const { data: plans } = await http.post(API_ENDPOINTS.RECHARGE_PLANS, data);
      // plans?.length && setLoading(false);
      setPlans(plans)
      return plans;
    };

    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

    console.log('operator',plans)

    const { mutate: mutateOperator } = useMutation(getOperatorDetails, {

      onSuccess: (data) => {
        setOperator(data)
        setOperatorName(data?.operator)
        setCircleName(data?.circle)
        console.log('operator plans',data);
      },

      onError: (error:any) => {
        alert(error?.msg)
      },

      // onSettled: () => {
      //   queryClient.invalidateQueries(API_ENDPOINTS.OPERATOR);
      // }
    });

    const { mutate: mutatePlan } = useMutation(getRechargePlans, {
      onSuccess: data => {
        setPlans(data);
        addOnPlansList();
        setLoading(false);
        // setAddOnPlans(data);
        // console.log('operator',data);
      },

      onError: (error) => {
        alert(error.message)
        setLoading(false)
      },
      
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS);
      },

      
    });

    

    const onSubmit = async  (value:any) => {
      const opr = {
        'mobile_no': value,
      }
      
      mutateOperator(opr);

      const plan =  {
        'operator' :  operatorName,
        'circle'   :  circleName,
      };
      mutatePlan(plan);
    };

    // const submitOperator= async () => {
    //   const 
    // }

    // console.log('operator', operator?.operator,operator?.circle)

     function callApi(value:any) {
      plans == null ? setLoading(true) : setLoading(false)
      setPhoneNumber(value);
      // console.log('operator',value.length);
      onSubmit(value);
     }

    const handleOnChange = (e: any) => {
      setPlans(null);
      setOperator(null);
      setOperatorName(null);
      setCircleName(null);
      
    //  e.preventDefault();
      // setPopularPlans('')
      setPhoneNumber(e.target.value);
      const value = e.target.value;
      value.toString().length === 10 && callApi(value);
    };

    useEffect(()=>{
         searchPlan();
    },[])

    const AddOnPlans =  plans?.plans?.length &&  plans?.plans?.filter(function(el:any){
      return el?.group_name === '2G/3G/4G Data' ?  el.plans?.filter((ell)=>ell.circle === operator?.circle)  
      : el.plans?.filter((ell)=>ell.circle === 'All Circles') ;
    });

    const popularPlans =  plans?.plans?.length &&  plans?.plans?.filter(function(el:any){
      return  el?.group_name == 'Special Recharge' ? el  : null ;
    });

    const specialRechargeList = popularPlans?.map((i:any)=> i?.plans) ;

    console.log('allPlans',  AddOnPlans);

    console.log('allPlans',  popularPlans);


    function addOnPlansList() {
       phoneNumber?.length === 0 
       ? setAddOnPlans(null) 
       : setAddOnPlans(popularPlans)
    }

     const searchedPlan: any[] = [];

     function searchPlan(){
     searchedPlan.push(plans?.plans)
     }

     console.log('operator',operatorName,circleName)
     console.log('')
    
     
     
  return (

    <>

    <div className={`${click ? 'grid grid-cols-1 lg:flex lg:items-center place-content-center bg-gray-200 lg:px-6 space-x-4' : 'hidden'}`}>

        <div className = 'grid grid-cols-1 space-y-2 lg:grid-cols-4 place-content-center px-4  flex-col transition duration-500  lg:space-x-10  lg:space-y-0  lg:flex-row justify-between w-full py-3 items-center '>
        

            <div className='flex-1 flex-col'> 
                <Input  label='Phone number'
                        variant=''
                        type='text'
                        className='rounded-lg'
                     
                        pattern="[0-9]*"
                        inputMode="numeric"
                        // value={(e)=>e.target.value}
                        onChange={(e)=>handleOnChange(e)}
                        maxLength={10}
                        // value={(e:any)=>setPhoneNumber(e.target.value)}
                />
            </div>

        {/* { isLoading ? <ProductFeedLoader className='h-10' limit={3}/> 
          :
           <> */}
           
          <div className='flex-1 flex-col'>
            <Label> Operator </Label>
            <Select name='Operator'
              variant=''
              type='number'
              value={mobileOperator?.filter((opt)=>
                opt?.name == operator?.operator )}
              // value={operator.msg == 'Success'? operator.operator}
              options={mobileOperator} />
          </div>

          <div className='flex-1 flex-col'>
            <Label> Circle </Label>
            <Select label='circle'
              variant=''
              type='number'
              value={circleCode?.filter((opt)=>
                opt?.value === operator?.circle)}
              // value={operator?.circle}
              // value={operator?.msg === 'Success' && operator?.circle}
              options={circleCode} />
          </div>

          <div className='relative flex-1 items-center'>
            <Input label='Amount'
              variant={''}
              type='number' />
              {/* <Label>Price</Label> */}
              <div className='  '>
              {/* <AsyncSelect
                  cacheOptions
                  // style={customStyles}
                  defaultValue={''}
                  loadOptions={loadOptions} 
                  value={ '' }
                  defaultOptions={plans?.plans}
                  // onInputChange={handleInputChange}
                  placeholder={ <div className='text-lg sm:text-lg md:text:md   text-blue-700 font-bold lg:text-lg  '> </div>}
                  onChange={''}
                /> */}
              </div>

          </div>
            {/* </>
            } */}

            {/* <Button className='' size='big'>
                Register
            </Button> */}

        </div>

        <div className='hidden lg:block lg:pt-3'>
                <Label className=''></Label>
                <button onClick={handleClick} 
                        className='bg-gradient-to-r from-blue-600 to-blue-800 p-3 
                                   flex text-center rounded text-white'>
                        Proceed
                </button>
        </div> 

        <button onClick={()=>handlePlanDetails(operatorName,circleName)} 
                className='lg:hidden  bg-gradient-to-r from-blue-600 to-blue-800  
                           p-3 flex text-center  rounded text-white'>
                Proceed
        </button>
         

    </div>

    <div className={`${plans?.plans?.length  && phoneNumber.length === 10 ? 'flex flex-col ' : 'hidden' } space-y-3 bg-gray-50 p-4 w-full `}>

    <div className='flex items-center'>
      <h1 className='p-2 text-gray-800 font-semibold'>
          Special Recharge
      </h1>
      <p onClick={()=>handleModal(plans,operator,circleName)} 
         className='font-semibold text-blue-700 p-2 border border-blue-600 rounded 
                    cursor-pointer active:bg-blue-100 hover:bg-blue-50 '>
         All Plans
      </p>
    </div>

    <div   className='flex overflow-x-scroll w-full'>
    {/* <div className='grid grid-cols-2 lg:grid-cols-6'> */}
            {
               plans == null   ? <ProductFeedLoader  limit={5} /> :  
              // plans?.plans?.length  && 
              specialRechargeList && specialRechargeList[0]?.slice(0,6).map
              ( 
                (plan:any,index:any) => {
                  return(
                  // plans?.plans?.length &&
                  
                <div
                     onClick={()=>handlePlanDetails(operatorName,circleName)}  
                     key={index}
                     className = 'cursor-pointer flex flex-col tracking-wide bg-white shadow-lg border mx-2 rounded space-y-2    p-3'>
                    <span  className='font- text-sm  text-gray-900 whitespace-nowrap'>
                      {'₹'+ plan?.price}
                    </span>
                    <span   className='font- h-20 text-xs text-gray-800 whitespace-wrap'>
                      {plan?.description.substring(0,50)+'...'}  
                    </span>
                    <span className='font- text-xs text-gray-800 whitespace-nowrap'>
                      
                    </span>
                    <span   className='font- text-xs text-gray-800 whitespace-nowrap'>
                      {plan?.data}
                    </span>
                    <span   className='font- text-xs text-gray-800 whitespace-nowrap'>
                      {plan?.validity}
                    </span>
                    <span   className='font-md text-sm text-blue-700 whitespace-nowrap'>
                      {plan?.circle}
                    </span>

                </div>
                  )
                }
                  
              )
            }
            
             </div>
    </div>
      {/* </div>  */}
    {/* </div> */}

    </>
  )
}
