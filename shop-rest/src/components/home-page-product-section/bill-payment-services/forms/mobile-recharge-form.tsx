import Button from '@components/ui/button'
import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import SelectInput from '@components/ui/select-input'
import Select from '@components/ui/select/select'
import http from '@utils/api/http'
import React from 'react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient, enabled } from 'react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader'
import { useQuery } from 'react-query'
import AsyncSelect from 'react-select/async'
import url from '@utils/api/server_url'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

export const mobileOperator = [
  {
    id: 1,
    name: 'Airtel',
    OperatorCode: 'AT',
    label: 'Airtel',
  },
  {
    id: 2,
    name: 'BSNL',
    OperatorCode: 'BS',
    label: 'BSNL',
  },
  {
    id: 3,
    name: 'Jio',
    OperatorCode: 'AT',
    label: 'Jio',
  },
  {
    id: 4,
    name: 'Vodafone Idea',
    OperatorCode: 'VI',
    label: 'Vi',
  },
  {
    id: 5,
    name: 'MTNL',
    OperatorCode: 'MT',
    label: 'MTNL',
  },
]

export const operatorCircle = [
  'Andhra Pradesh',
  'Assam',
  'Bihar Jharkhand',
  'Chennai',
  'Delhi NCR',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu Kashmir',
  'Karnataka',
  'Kerala',
  'Kolkata',
  'Madhya Pradesh Chhattisgarh',
  'Maharashtra',
  'Mumbai',
  'North East',
  'Orissa',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'UP East',
  'UP West',
  'Uttarakhand',
  'West Bengal',
]

export const operators = [
  {
    biller_id: 'APDCL0000ASM01',
    label: 'Assam Power Distribution Company Ltd (RAPDR)',
    billerAliasName: 'APDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'AVVNL0000RAJ01',
    label: 'Ajmer Vidyut Vitran Nigam Limited (AVVNL)',
    billerAliasName: 'AVVNL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BESCOM000KAR01',
    label: 'Bangalore Electricity Supply Co. Ltd (BESCOM)',
    billerAliasName: 'BESCOM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BEST00000MUM01',
    label: 'B.E.S.T Mumbai',
    billerAliasName: 'BEST',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BSESRAJPLDEL01',
    label: 'BSES Rajdhani Power Limited',
    billerAliasName: 'BSES RPL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BSESYAMPLDEL01',
    label: 'BSES Yamuna Power Limited',
    billerAliasName: 'BSES YPL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'CESC00000KOL01',
    label: 'CESC Limited',
    billerAliasName: 'CESC',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'CSPDCL000CHH01',
    label: 'Chhattisgarh State Power Distribution Co. Ltd',
    billerAliasName: 'CSPDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'DDED00000DAD01',
    label: 'Daman and Diu Electricity',
    billerAliasName: 'DDED',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'DGVCL0000GUJ01',
    label: 'Dakshin Gujarat Vij Company Limited (DGVCL)',
    billerAliasName: 'DGVCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'DHBVN0000HAR01',
    label: 'Dakshin Haryana Bijli Vitran Nigam (DHBVN)',
    billerAliasName: 'DHBVN',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'DNHPDCL0DNH001',
    label: 'DNH Power Distribution Company Limited',
    billerAliasName: 'DNHPDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'GESCOM000KAR01',
    label: 'Gulbarga Electricity Supply Company Limited',
    billerAliasName: 'GESCOM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'JBVNL0000JHA01',
    label: 'Jharkhand Bijli Vitran Nigam Limited (JBVNL)',
    billerAliasName: 'JBVNL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'JDVVNL000RAJ01',
    label: 'Jodhpur Vidyut Vitran Nigam Limited (JDVVNL)',
    billerAliasName: 'JDVVNL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'JUSC00000JAM01',
    label: 'Jamshedpur Utilities',
    billerAliasName: 'JUSCO',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'JVVNL0000RAJ01',
    label: 'Jaipur Vidyut Vitran Nigam (JVVNL)',
    billerAliasName: 'JVVNL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MAHA00000MAH01',
    label: 'Maharashtra State Electricity Distbn Co Ltd',
    billerAliasName: 'MSEDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MGVCL0000GUJ01',
    label: 'Madhya Gujarat Vij Company Limited (MGVCL)',
    billerAliasName: 'MGVCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPDC00000MEG01',
    label: 'Meghalaya Power Dist Corp Ltd',
    billerAliasName: 'MEPDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPPK00000MAP01',
    label: 'M.P. Paschim Kshetra Vidyut Vitaran',
    billerAliasName: 'MPPKVVCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'NBPDCL000BHI01',
    label: 'North Bihar Power Distribution Company Ltd.',
    billerAliasName: 'NBPDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'NESCO0000ODI01',
    label: 'NESCO\t Odisha',
    billerAliasName: 0,
    is_fetch: 'Electricity',
  },
  {
    biller_id: 'NPCL00000NOI01',
    label: 'Noida Power',
    billerAliasName: 'NPCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'PGVCL0000GUJ01',
    label: 'Paschim Gujarat Vij Company Limited (PGVCL)',
    billerAliasName: 'PGVCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'PSPCL0000PUN01',
    label: 'Punjab State Power Corporation Ltd (PSPCL)',
    billerAliasName: 'PSPCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'SBPDCL000BHI01',
    label: 'South Bihar Power Distribution Company Ltd.',
    billerAliasName: 'SBPDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'SOUTHCO00ODI01',
    label: 'TP Southern Odisha Distribution Limited',
    billerAliasName: 'SOUTHCO',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TATAPWR00DEL01',
    label: 'Tata Power - Delhi',
    billerAliasName: 'TATA PWR - DEL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TATAPWR00MUM01',
    label: 'Tata Power - Mumbai',
    billerAliasName: 'TATA PWR - MUM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TNEB00000TND01',
    label: 'Tamil Nadu Electricity Board (TNEB)',
    billerAliasName: 'TNEB',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TORR00000AGR01',
    label: 'Torrent Power - Agra',
    billerAliasName: 'TOR PWR - AGR',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'TORR00000AHM02',
    label: 'Torrent Power - Ahmedabad',
    billerAliasName: 'TOR PWR - AHM',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'TORR00000BHW03',
    label: 'Torrent Power - Bhiwandi',
    billerAliasName: 'TOR PWR - BHI',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'TORR00000SUR04',
    label: 'Torrent Power - Surat',
    billerAliasName: 'TOR PWR - SUR',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'TSEC00000TRI01',
    label: 'Tripura Electricity Corp Ltd',
    billerAliasName: 'TSECL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'UGVCL0000GUJ01',
    label: 'Uttar Gujarat Vij Company Limited (UGVCL)',
    billerAliasName: 'UGVCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'UHBVN0000HAR01',
    label: 'Uttar Haryana Bijli Vitran Nigam (UHBVN)',
    billerAliasName: 'UHBVN',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'UPPCL0000UTP01',
    label: 'Uttar Pradesh Power Corp Ltd (UPPCL) - URBAN',
    billerAliasName: 'UPPCL URBAN',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'UPPCL0000UTP02',
    label: 'Uttar Pradesh Power Corp Ltd (UPPCL) - RURAL',
    billerAliasName: 'UPPCL RURAL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'WESCO0000ODI01',
    label: 'TP Western Odisha Distribution Limited',
    billerAliasName: 'WESCO',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'APDCL0000ASM02',
    label: 'Assam Power Distribution Company Ltd (NON-RAPDR)',
    billerAliasName: 'APDCL NON-RAPDR',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'CESCOM000KAR01',
    label: 'Chamundeshwari Electricity Supply Corp Ltd (CESCOM)',
    billerAliasName: 'CESCOM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'HESCOM000KAR01',
    label: 'Hubli Electricity Supply Company Ltd (HESCOM)',
    billerAliasName: 'HESCOM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPCZ00000MAP01',
    label: 'M.P. Madhya Kshetra Vidyut Vitaran - URBAN',
    billerAliasName: 'MPMKVVCL URBAN',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPCZ00000MAP02',
    label: 'M.P. Madhya Kshetra Vidyut Vitaran - RURAL',
    billerAliasName: 'MPMKVVCL RURAL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'NDMC00000DEL02',
    label: 'New Delhi Municipal Council (NDMC) - Electricity',
    billerAliasName: 'NDMC ELECTRICITY',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'WBSEDCL00WBL01',
    label: 'West Bengal State Electricity Distribution Co. Ltd (WBSEDCL)',
    billerAliasName: 'WBSEDCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPEZ00000MAP02',
    label: 'M.P. Poorv Kshetra Vidyut Vitaran - RURAL',
    billerAliasName: 'MPPKVVCL RURAL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'SKPR00000SIK01',
    label: 'Sikkim Power - RURAL',
    billerAliasName: 'SKMPWR RURAL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BESLOB000RAJ02',
    label: 'Bharatpur Electricity Services Ltd. (BESL)',
    billerAliasName: 'BESL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'BKESL0000RAJ02',
    label: 'Bikaner Electricity Supply Limited (BkESL)',
    billerAliasName: 'BKESL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'KEDLOB000RAJ02',
    label: 'Kota Electricity Distribution Limited (KEDL)',
    billerAliasName: 'KEDL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'RELI00000MUM03',
    label: 'Adani Electricity Mumbai Limited',
    billerAliasName: 'ADANI',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TPADL0000AJM02',
    label: 'TP Ajmer Distribution Ltd (TPADL)',
    billerAliasName: 'TPADL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'KESCO0000UTP01',
    label: 'Kanpur Electricity Supply Company',
    billerAliasName: 'KESCO',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'GED000000GOA01',
    label: 'Goa Electricity Department',
    billerAliasName: 'GED',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'DOPN00000NAG01',
    label: 'Department of Power\t Nagaland',
    billerAliasName: 0,
    is_fetch: 'Electricity',
  },
  {
    biller_id: 'MESCOM000KAR01',
    label: 'Mangalore Electricity Supply Co. Ltd (MESCOM) - RAPDR',
    billerAliasName: 'MESCOM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'SKPR00000SIK02',
    label: 'Sikkim Power - URBAN',
    billerAliasName: 'SKMPWR URBAN',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'CESU00000ODI01',
    label: 'TP Central Odisha Distribution Ltd.',
    billerAliasName: 'CESU',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'KSEBL0000KER01',
    label: 'Kerala State Electricity Board Ltd. (KSEBL)',
    billerAliasName: 'KSEBL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'PEDM00000MIZ01',
    label: 'Power & Electricity Department - Mizoram',
    billerAliasName: 'PEDM',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'HPSEB0000HIP02',
    label: 'Himachal Pradesh State Electricity Board',
    billerAliasName: 'HPSEB',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'GOVE00000PUDN0',
    label: 'Government of Puducherry Electricity Department',
    billerAliasName: 'PYEB',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MPPO00000MAP0Y',
    label:
      'MP Poorva Kshetra Vidyut Vitaran Co. Ltd Jabalpur - NGB billing system',
    billerAliasName: 'MPJNRAP',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'ELEC00000CHA3L',
    label: 'Electricity Department Chandigarh',
    billerAliasName: 'CHD',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'TORR00000NATLX',
    label: 'Torrent Power',
    billerAliasName: 'TOR PWR',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'DEPA00000NATES',
    label: 'Department of Power\t Government of Arunachal Pradesh',
    billerAliasName: 0,
    is_fetch: 'Electricity',
  },
  {
    biller_id: 'UTTA00000UTT7M',
    label: 'Uttarakhand Power Corporation Limited',
    billerAliasName: 'UPCL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'JAMM00000JAKCP',
    label: 'Jammu and Kashmir Power Development Department',
    billerAliasName: 'JKPDD',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'MANG00000KAR75',
    label: 'Mangalore Electricity Supply Company LTD (Non RAPDR)',
    billerAliasName: 'Mangalore Electricity Supply Company LTD (Non RAPD',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'WEST00000WBL75',
    label: 'West Bengal Electricity',
    billerAliasName: 'WBSEDCLOB',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'LAKS00000LAKP8',
    label: 'Lakshadweep Electricity Department',
    billerAliasName: 'Lakshadweep Electricity Department',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'GIFT00000GUJ6Z',
    label: 'Gift Power Company Limited',
    billerAliasName: 'Gift Power Company Limited',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'KANN00000KERXX',
    label: 'Kannan Devan Hills Plantations Company Private Limited',
    billerAliasName: 'KDHPCPL',
    is_fetch: 1,
    Category: 'Electricity',
  },
  {
    biller_id: 'DEPA00000ARPD5',
    label: 'Department of Power\t Government of Arunachal Pradesh - Prepaid',
    billerAliasName: 0,
    is_fetch: 'Electricity',
  },
  {
    biller_id: 'INDI00000NATTR',
    label: 'Indian Highways Management Company Ltd FASTag',
    billerAliasName: 'IHMCL FASTag',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'INDU00000NATR2',
    label: 'IndusInd Bank FASTag',
    billerAliasName: 'IBL FASTag',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'BANK00000NATDH',
    label: 'Bank of Baroda - Fastag',
    billerAliasName: 'BOBFAST',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'TOLL00000NAT72',
    label: 'ICICI Bank Fastag',
    billerAliasName: 'ICICI Fastag',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'AXIS00000NATSN',
    label: 'Axis Bank FASTag',
    billerAliasName: 'AXISBFTG',
    is_fetch: 0,
    Category: 'FastTag',
  },
  {
    biller_id: 'IDFC00000NATXM',
    label: 'IDFC FIRST Bank - FasTag',
    billerAliasName: 'IDFC',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'HDFC00000NAT5K',
    label: 'HDFC Bank - Fastag',
    billerAliasName: 'HDFCFAST',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'KOTA00000NATJZ',
    label: 'Kotak Mahindra Bank - Fastag',
    billerAliasName: 'KMB',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'EQUI00000NATNF',
    label: 'Equitas FASTag Recharge',
    billerAliasName: 'EQTSFT',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'THEF00000NATZO',
    label: 'Federal Bank - FASTag',
    billerAliasName: 'The Federal Bank Limited',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'PAYT00000NATTQ',
    label: 'Paytm Payments Bank FASTag',
    billerAliasName: 'PPBLFASTag',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'TRAN00000NATSE',
    label: 'Transaction Analyst (T Wallet\t TA Wallet and TAG-ITI Wallet)',
    billerAliasName: 0,
    is_fetch: 'FastTag',
  },
  {
    biller_id: 'PAUL00000NATKI',
    label: 'Paul Merchants',
    billerAliasName: 'Paul Merchants',
    is_fetch: 0,
    Category: 'FastTag',
  },
  {
    biller_id: 'JAMM00000NATWB',
    label: 'Jammu and Kashmir Bank Fastag',
    billerAliasName: 'Jammu and Kashmir Bank FASTag',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'IDBI00000NATK7',
    label: 'IDBI Bank Fastag',
    billerAliasName: 'IDBI FASTAG',
    is_fetch: 1,
    Category: 'FastTag',
  },
  {
    biller_id: 'RELIGARENBC001',
    label: 'Religare Health Insurance Co Ltd.',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'FUTUREGENLIFENBC001',
    label: 'Future Generali Life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'BALICNBC0001',
    label: 'Bajaj Allianz Life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'HDFC00000NATV4',
    label: 'HDFC Life Insurance Co. Ltd.',
    billerAliasName: 'HDFC Life',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'RELI00000NATQ9',
    label: 'Care Health Insurance',
    billerAliasName: 'Religare',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'EXID00000NAT25',
    label: 'Exide Life Insurance',
    billerAliasName: 'EXIDLI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'PRAM00000NATYI',
    label: 'Pramerica Life Insurance Limited',
    billerAliasName: 'DHFLPRL',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'FUTU00000NAT09',
    label: 'Future Generali India Life Insurance Company Limited',
    billerAliasName: 'FG life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'TATA00000NATLP',
    label: 'TATA AIA Life Insurance',
    billerAliasName: 'TATAAIA',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'SHRI00000NATRI',
    label: 'Shriram Life Insurance Co Ltd',
    billerAliasName: 'SHRLI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'ICICILOMNBC0001',
    label: 'ICICI Lombard Motor Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'FUGEGNNBC001',
    label: 'Future Generali General Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'FUTEGENHLNBC0001',
    label: 'Future Generali Health Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'RELI00000NAT3O',
    label: 'Reliance Nippon Life Insurance',
    billerAliasName: 'RNLIC',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'STAR00000NATXZ',
    label: 'Star Union Dai Ichi Life Insurance',
    billerAliasName: 'SUDILI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'BAJA00000NATP5',
    label: 'Bajaj Allianz Life Insurance Company Limited',
    billerAliasName: 'BJALI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'RELI00000NATBP',
    label: 'Reliance General Insurance Company Limited',
    billerAliasName: 'RGI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'BAJA00000NAT58',
    label: 'Bajaj Allianz General Insurance',
    billerAliasName: 'BAGIC',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'AVIV00000NAT5I',
    label: 'Aviva Life Insurance',
    billerAliasName: 'AVIVA',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'MAXB00000NAT28',
    label: 'Max Bupa Health Insurance',
    billerAliasName: 'MAXBUPA',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'SHRI00000NATKR',
    label: 'Shriram General Insurance (Old)',
    billerAliasName: 'Shriram General Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'AEGO00000NATRJ',
    label: 'Aegon Life Insurance',
    billerAliasName: 'Aegon',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'ROYA00000NAT2C',
    label: 'Royal Sundaram General Insurance Co. Limited',
    billerAliasName: 'Royal Sundaram General Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'MAGM00000NAT61',
    label: 'Magma HDI - Motor Insurance',
    billerAliasName: 'magmahdi_motor',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'MAGM00000NAT6B',
    label: 'Magma HDI - Health Insurance',
    billerAliasName: 'magmahdi_health',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'MAGM00000NATQI',
    label: 'Magma HDI - Non Motor Insurance',
    billerAliasName: 'magmahdi life',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'SBIL00000NATT0',
    label: 'SBI Life Insurance Company Limited',
    billerAliasName: 'SBI Life Insurance Company Limited',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'KOTA00000NATDP',
    label: 'Kotak Life Insurance Company Limited',
    billerAliasName: 'Kotak Life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'CANA00000NATPI',
    label: 'Canara HSBC OBC Life Insurance',
    billerAliasName: 'Canara HSBC OBC Life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'ICIC00000NATGF',
    label: 'ICICI Prudential Life Insurance - New',
    billerAliasName: 'IPRU',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'MAXL00000NAT0Q',
    label: 'Max Life Insurance Company Limited',
    billerAliasName: 'Max Life Insurance',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'IDBI00000NATRX',
    label: 'Ageas Federal Life Insurance Company Limited',
    billerAliasName: 'IDBIFEDLI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'ADIT00000NATVO',
    label: 'Aditya Birla Health Insurance Co Limited',
    billerAliasName: 'Aditya Birla Health Insurance Co Limited',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'EXID00000NATSX',
    label: 'Exide Life Insurance',
    billerAliasName: 'EXIDLI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'PRAM00000NATDP',
    label: 'Pramerica Life Insurance Limited',
    billerAliasName: 'DHFLPRL',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'SHRI00000NAT51',
    label: 'Shriram General Insurance',
    billerAliasName: 'Shriram General Insurance Co. Ltd.',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'INDI00000NAT3L',
    label: 'IndiaFirst Life Insurance Company Ltd',
    billerAliasName: 'IFLI',
    is_fetch: 1,
    Category: 'Insurance',
  },
  {
    biller_id: 'HOMECRDTNBC001',
    label: 'Home Credit',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTHOOTNBC001',
    label: 'Muthoot',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FINTREENBC001',
    label: 'FinTree Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ZESTMONEYNBC001',
    label: 'ZEST Money',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MANAPPURAMNBC001',
    label: 'Manappuram',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BAJAJFINNBC0001',
    label: 'Bajaj Finserv Loan',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BFL000000NAT01',
    label: 'Bajaj Finance',
    billerAliasName: 'BFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'IDFC00000NATCK',
    label: 'IDFC FIRST Bank Ltd',
    billerAliasName: 'IDFB',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'PAIS00000NATCV',
    label: 'Paisa Dukan-Borrower EMI',
    billerAliasName: 'PAISA DUKAN -Borrower EMI',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'LAMP00000NAT7E',
    label: 'L and T Financial Services',
    billerAliasName: 'LTFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FLEX00000NATJL',
    label: 'Flexsalary',
    billerAliasName: 'FLEX SALARY',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'LOKS00000NATC9',
    label: 'Loksuvidha',
    billerAliasName: 'LOKSUVIDHA',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MOTI00000NATHD',
    label: 'Motilal Oswal Home Finance',
    billerAliasName: 'MOTILAL OSWAL HOME FINANCE',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SNAP00000NAT61',
    label: 'Snapmint',
    billerAliasName: 'SNAP MINT',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'TATA00000NATGS',
    label: 'Tata Capital Financial Services Limited',
    billerAliasName: 'TATA CAPITAL FINANCIAL SERVICES LIMITED',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ADIT00000NATRA',
    label: 'Aditya Birla  FastTag Finance Limited',
    billerAliasName: 'ABHFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SHRI00000NAT7D',
    label: 'Shriram City Union Finance Ltd',
    billerAliasName: 'SRCUFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDI00000NAT2P',
    label: 'Dhani Loan & Services Ltd',
    billerAliasName: 'IBCF - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'LAND00000NATRD',
    label: 'L and T  FastTag Finance',
    billerAliasName: 'LTHF',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'HERO00000NAT7F',
    label: 'Hero FinCorp Limited - Old',
    billerAliasName: 'HFCL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AAVA00000NATMF',
    label: 'AAVAS FINANCIERS LIMITED',
    billerAliasName: 'AAVAS FINANCIERS',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDI00000NATYG',
    label: 'Indiabulls  FastTag Finance Limited',
    billerAliasName: 'IBHF - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AVAI00000NAT7J',
    label: 'Avail',
    billerAliasName: 'Avail',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BAJA00000NATV1',
    label: 'Bajaj Auto Finance',
    billerAliasName: 'BAJAJ AUTO FINANCE',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'JANA00000NATO4',
    label: 'Jana Small Finance Bank',
    billerAliasName: 'JSFB',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CMFINANCENBC0001',
    label: 'Chaitanya Micro Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'DGFINANCENBC0001',
    label: 'Digamber Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CLIX00000NATST',
    label: 'Clix',
    billerAliasName: 'Clix',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'VART00000NATHC',
    label: 'Varthana',
    billerAliasName: 'Varthana',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CAPR00000NATC0',
    label: 'Capri Global Capital Limited',
    billerAliasName: 'Capri Global Capital',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CAPR00000NATUB',
    label: 'Capri Global  FastTag Finance',
    billerAliasName: 'Capri Global  FastTag',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ESSK00000NATFR',
    label: 'Ess Kay Fincorp Limited',
    billerAliasName: 'ESS KAY FINCORP',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FAIR00000NAT6Z',
    label: 'Faircent-Borrower EMI Account',
    billerAliasName: 'Faircent-Borrower EMI Account',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'I2IF00000NAT6K',
    label: 'i2i Funding-Borrower EMI Repayment',
    billerAliasName: 'I2I',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MANA00000NATWG',
    label: 'Manappuram Finance Limited-Vehicle Loan',
    billerAliasName: 'MFL-Vehicle Loan',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AROH00000WBL0I',
    label: 'Arohan Financial Services Ltd',
    billerAliasName: 'Arohan',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SHRI00000NAT7E',
    label: 'Shriram  FastTag Finance Limited',
    billerAliasName: 'SHFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CONBB0000PUN01',
    label: 'Connect Broadband',
    billerAliasName: 'CONNECT BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'HATHWAY00NAT01',
    label: 'Hathway Broadband',
    billerAliasName: 'HATHWAY BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TIKO00000NAT01',
    label: 'Tikona Infinet Pvt Ltd',
    billerAliasName: 'TIKONA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ACT000000NAT01',
    label: 'ACT Fibernet',
    billerAliasName: 'ACTFIBER',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ATBROAD00NAT01',
    label: 'Airtel Broadband',
    billerAliasName: 'AIRTEL BB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'NEXTRA000NAT01',
    label: 'Nextra Broadband',
    billerAliasName: 'NEXTRA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SPENET000NAT01',
    label: 'Spectra',
    billerAliasName: 'SPECTRA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TTN000000NAT01',
    label: 'TTN BroadBand',
    billerAliasName: 'TTN BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ATBROAD00NAT02',
    label: 'Airtel Broadband (Fetch & Pay)',
    billerAliasName: 'AIRTEL BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ASIABB000NAT01',
    label: 'Asianet Broadband (Old)',
    billerAliasName: 'ASIABB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'COMWBB000NAT01',
    label: 'Comway Broadband',
    billerAliasName: 'COMWBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'FUSNBB000NAT01',
    label: 'Fusionnet Web Services Private Limited',
    billerAliasName: 'FUSNBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'DVOIS0000NAT02',
    label: 'ION',
    billerAliasName: 'ION BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'INST00000CHHZV',
    label: 'Instalinks',
    billerAliasName: 'INTAL BB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'MNET00000ASM5W',
    label: 'M-NET Fiber Fast',
    billerAliasName: 'MNET',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'DENB00000NATIO',
    label: 'DEN Broadband',
    billerAliasName: 'DEN',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TIMB00000NATRQ',
    label: 'Timbl Broadband',
    billerAliasName: 'Timbl',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'INST00000BIHKL',
    label: 'Instanet Broadband',
    billerAliasName: 'INSTANBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'VFIB00000NATJJ',
    label: 'Vfibernet Broadband',
    billerAliasName: 'VFIB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'NETP00000PUNS8',
    label: 'Netplus Broadband',
    billerAliasName: 'NETPB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'FLAS00000NATVZ',
    label: 'Flash Fibernet',
    billerAliasName: 'FLAFBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'EXCE00000NATDP',
    label: 'Excell Broadband',
    billerAliasName: 'ExcellBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SWIF00000NATVE',
    label: 'Swifttele Enterprises Private Limited',
    billerAliasName: 'Swift Tele',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ALLI00000NATHB',
    label: 'Alliance Broadband Services Pvt. Ltd.',
    billerAliasName: 'Alliance Broadband Services Pvt. Ltd.',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'RURA00000NAT9E',
    label: 'AirJaldi - Rural Broadband',
    billerAliasName: 'AirJaldi - Rural Broadband',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SKYL00000NATJB',
    label: 'Skylink Fibernet Private Limited',
    billerAliasName: 'Skylink Fibernet Private Limited',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ASIA00000NAT6O',
    label: 'Asianet Broadband',
    billerAliasName: 'Asianet Broadband',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'HATH00000NATRZ',
    label: 'Hathway Digital Cable TV',
    billerAliasName: 'HATHWAY TV',
    is_fetch: 1,
    Category: 'Cable',
  },
  {
    biller_id: 'ASIA00000NATA2',
    label: 'Asianet Digital',
    billerAliasName: 'ASIADIGI',
    is_fetch: 1,
    Category: 'Cable',
  },
  {
    biller_id: 'INTE00000NATHP',
    label: 'Intermedia Cable Communication Pvt Ltd',
    billerAliasName: 'ICC Network',
    is_fetch: 1,
    Category: 'Cable',
  },
  {
    biller_id: 'DENHATHWAY001',
    label: 'Den Hathway Cable',
    is_fetch: 1,
    Category: 'Cable',
  },
  {
    biller_id: 'HATHWAY001',
    label: 'Den Hathway Cable',
    is_fetch: 1,
    Category: 'Cable',
  },
  {
    biller_id: 'INDI00000NAT78',
    label: 'INDigital',
    billerAliasName: 'INDigital',
    is_fetch: 0,
    Category: 'Cable',
  },
  {
    biller_id: 'BANK00000NATKB',
    label: 'BoB Credit Card',
    billerAliasName: 'BFSL',
    is_fetch: 1,
    Category: 'CreditCard',
  },
  {
    biller_id: 'DISH00000NAT01',
    label: 'Dish TV',
    billerAliasName: 'DISH TV DTH',
    is_fetch: 0,
    Category: 'DTH',
  },
  {
    biller_id: 'TATASKY00NAT01',
    label: 'Tata Sky',
    billerAliasName: 'TATA SKY DTH',
    is_fetch: 0,
    Category: 'DTH',
  },
  {
    biller_id: 'SUND00000NAT02',
    label: 'Sun Direct TV',
    billerAliasName: 'SUN DIRECT DTH',
    is_fetch: 0,
    Category: 'DTH',
  },
  {
    biller_id: 'VIDEOCON0NAT01',
    label: 'Videocon D2H',
    billerAliasName: 'Videocon DTH',
    is_fetch: 0,
    Category: 'DTH',
  },
  {
    biller_id: 'AIRT00000NAT87',
    label: 'Airtel DTH',
    billerAliasName: 'Airtel DTH',
    is_fetch: 0,
    Category: 'DTH',
  },
  {
    biller_id: 'VAST00000NATLW',
    label: 'Vastu  FastTag Finance Corporation Limited',
    billerAliasName: 'VHFCL - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CAMD00000NATAI',
    label: 'ZestMoney',
    billerAliasName: 'Zest Money',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'DMIF00000NATMN',
    label: 'DMI Finance Private Limited',
    billerAliasName: 'DMI',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'LOAN00000NATVP',
    label: 'LOANTAP CREDIT PRODUCTS PRIVATE LIMITED',
    billerAliasName: 'LoanTap',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MONE00000NATX1',
    label: 'RupeeRedee',
    billerAliasName: 'RupeeRedee',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SICR00000NATDG',
    label: 'Kissht',
    billerAliasName: 'Kissht',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'VISA00000NAT5A',
    label: 'Kinara Capital',
    billerAliasName: 'Kinaara Capital',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'EASY00000MAH6N',
    label: 'Easy Home Finance Limited',
    billerAliasName: 'EHFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTH00000NAT0I',
    label: 'Muthoot Microfin Limited',
    billerAliasName: 'Muthoot Microfin Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SHRI00000NAT23',
    label: 'Shriram Transport Finance Company Limited',
    billerAliasName: 'STFC',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AXIS00000NATN6',
    label: 'Axis Finance Limited',
    billerAliasName: 'Axis Finance Ltd.',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CARS00000NAT4G',
    label: 'Cars24 Financial Services Private Limited',
    billerAliasName: 'Cars24',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'JAIN00000NATVC',
    label: 'Jain Autofin',
    billerAliasName: 'Jain Autofin Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AUBA00000NATGM',
    label: 'AU Bank Loan Repayment',
    billerAliasName: 'AU Bank Loan Repayment',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'OXYZ00000NATSE',
    label: 'Oxyzo Financial Services Pvt Ltd',
    billerAliasName: 'Oxyzo Financial Services Pvt Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'TOYO00000NAT59',
    label: 'Toyota Financial Services',
    billerAliasName: 'TFS',
    is_fetch: 0,
    Category: 'Loan',
  },
  {
    biller_id: 'ICIC00000NATKD',
    label: 'ICICI Bank Ltd - Loans',
    billerAliasName: 'ICICI Bank Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTH00000NATYF',
    label: 'Muthoot Capital Services Ltd',
    billerAliasName: 'Muthoot Capital Services Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ANNA00000NATUO',
    label: 'Annapurna Finance Private Limited-MFI',
    billerAliasName: 'Annapurna Finance Private Limited-MFI',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FULL00000NAT8X',
    label: 'Fullerton India  FastTag Finance Limited',
    billerAliasName: 'Fullerton India  FastTag Finance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FULL00000NATD4',
    label: 'Fullerton India credit company limited',
    billerAliasName: 'Fullerton India credit company limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'GUFI00000NATV8',
    label: 'G U Financial Services Pvt Ltd',
    billerAliasName: 'GU Financial',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AVAN00000NATHI',
    label: 'Avanse Financial Services Ltd',
    billerAliasName: 'AFSL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BAID00000NATWG',
    label: 'Baid Leasing and Finance',
    billerAliasName: 'BAID LEASING AND FINANCE',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BERA00000NATOY',
    label: 'BERAR Finance Limited',
    billerAliasName: 'BERAR Finance Limited',
    is_fetch: 0,
    Category: 'Loan',
  },
  {
    biller_id: 'OHMY00000NATFH',
    label: 'OHMYLOAN',
    billerAliasName: 'OHMY Loan Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'OMLP00000NAT0A',
    label: 'OMLP2P.COM',
    billerAliasName: 'OHMy Technologies Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ADAN00000NATO6',
    label: 'Adani Capital Pvt Ltd',
    billerAliasName: 'Adani Capital',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ANNA00000NATMR',
    label: 'Annapurna Finance Private Limited-MSME',
    billerAliasName: 'Annapurna Finance Pvt Ltd-MSME',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FINC00000NAT3E',
    label: 'Fincare Small Finance Bank',
    billerAliasName: 'Fincare_bank',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDI00000NAT12',
    label: 'India Shelter Finance Corporation Limited',
    billerAliasName: 'India Shelter Finance Corporation Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'KANA00000NATQV',
    label: 'Kanakadurga Finance Limited',
    billerAliasName: 'Kanakadurga Finance Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MAHI00000NATIC',
    label: 'Mahindra Home Finance',
    billerAliasName: 'Mahindra Rural  FastTag Finance Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ALTU00000NATG5',
    label: 'Altum Credo Home Finance',
    billerAliasName: 'Altum Credo Home Finance Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MAXV00000NAT33',
    label: 'Maxvalue Credits And Investments Ltd',
    billerAliasName: 'Maxvalue Credits And Investments Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SVAT00000NATUB',
    label: 'Svatantra Microfin Private Limited',
    billerAliasName: 'SMF - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CRED00000NAT0U',
    label: 'Credit Wise Capital',
    billerAliasName: 'Credit Wise Capital Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FLEX00000NAT3Z',
    label: 'FlexiLoans',
    billerAliasName: 'Epimoney Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDU00000NATQH',
    label: 'INDUSIND BANK - CFD',
    billerAliasName: 'INDUSIND CFD LOANS',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CHAI00000NATYY',
    label: 'Chaitanya India Fin Credit Pvt Ltd',
    billerAliasName: 'Chaitanya_Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'DIGA00000NAT3C',
    label: 'Digamber Capfin Limited',
    billerAliasName: 'digamber capfin',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MIDL00000NATIP',
    label: 'Midland Microfin Ltd',
    billerAliasName: 'Midland',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'HERO00000NATI6',
    label: 'Hero FinCorp Limited',
    billerAliasName: 'Hero FinCorp Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ASCE00000NATGK',
    label: 'Ascend Capital',
    billerAliasName: 'Ascend Capital',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'DCBB00000NAT2K',
    label: 'DCB Bank Loan Repayment',
    billerAliasName: 'DCBLOAN',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'EDUV00000NATF1',
    label: 'Eduvanz Financing Pvt. Ltd.',
    billerAliasName: 'Eduvanz Financing Pvt. Ltd.',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDI00000NATQF',
    label: 'India Home Loan Limited',
    billerAliasName: 'India Home Loan Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MINT00000NATUB',
    label: 'Mintifi Finserve Private Limited',
    billerAliasName: 'Mintifi Finserve Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'NIDH00000NAT9K',
    label: 'Nidhilakshmi Finance',
    billerAliasName: 'Nidhilakshmi Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'NMFI00000NATGX',
    label: 'NM Finance',
    billerAliasName: 'NM Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'OROB00000NAT7P',
    label: 'Oroboro',
    billerAliasName: 'Oroboro',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'HIRA00000NATSP',
    label: 'Hiranandani Financial Services Pvt Ltd',
    billerAliasName: 'Hiranandani Financial Services',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'HOME00000NATVX',
    label: 'Home First Finance Company India Limited',
    billerAliasName: 'Home First Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'HOME00000NATWT',
    label: 'Home Credit India Finance Pvt. Ltd',
    billerAliasName: 'Home Credit',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'UJJI00000NATAW',
    label: 'Ujjivan Small Finance Bank',
    billerAliasName: 'Ujjivan Small Finance Bank',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'IIFL00000NAT5F',
    label: 'IIFL Finance Limited',
    billerAliasName: 'IIFL Finance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'IIFL00000NATMF',
    label: 'IIFL Home Finance',
    billerAliasName: 'IIFL Home Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'LIGH00000NATKW',
    label: 'Light Microfinance Private Limited',
    billerAliasName: 'LMF',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MONE00000NAT7P',
    label: 'MoneyTap',
    billerAliasName: 'Tapstart Capital Pvt Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CRED00000NAT35',
    label: 'CreditAccess Grameen - Retail Finance',
    billerAliasName: 'CreditAccess Grameen - Retail Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CRED00000NAT8X',
    label: 'CreditAccess Grameen - Microfinance',
    billerAliasName: 'CreditAccess Grameen (Microfinance)',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'KHUS00000NAT1L',
    label: 'Khush  FastTag Finance Pvt Ltd',
    billerAliasName: 'KHFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'TVSC00000NAT0T',
    label: 'TVS Credit',
    billerAliasName: 'TVS Credit',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AXIS00000NATM1',
    label: 'Axis Bank Limited - Retail Loan',
    billerAliasName: 'Axis Bank Ltd - Retail Loan',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INCR00000NATJG',
    label: 'InCred',
    billerAliasName: 'InCred',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'POOJ00000NATWO',
    label: 'Pooja Finelease LTD.',
    billerAliasName: 'Pooja Finlease',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'STAS00000NATX1',
    label: 'StashFin',
    billerAliasName: 'EQX Analytics Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTHTGLDNBC0001',
    label: 'Muthoot Gold Bullion Corporation',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ADAN00000NATI9',
    label: 'Adani  FastTag Finance',
    billerAliasName: 'Adani  FastTag Finance Private',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BAJA00000NATP2',
    label: 'Bajaj Auto Finance',
    billerAliasName: 'Bajaj Auto Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AGOR00000NATQL',
    label: 'Agora Microfinance India Ltd - AMIL',
    billerAliasName: 'Agora Microfinance India Ltd - AMIL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'JANA00000NATV5',
    label: 'Janakalyan Financial Services Private Limited',
    billerAliasName: 'Janakalyan Financial Services Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MAHA00000NATSI',
    label: 'Mahaveer Finance India Limited',
    billerAliasName: 'Mahaveer Finance India Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'JAIN00000NATOA',
    label: 'Jain Motor Finmart',
    billerAliasName: 'Jain Motor Finmart',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTH00000NATB0',
    label: 'Muthoot Fincorp Ltd',
    billerAliasName: 'Muthoot Fincorp Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AXIS00000NATJD',
    label: 'Axis Bank Limited-Microfinance',
    billerAliasName: 'Axis Bank Limited-Microfinance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ORAN00000NATJX',
    label: 'Orange Retail Finance India Pvt Ltd',
    billerAliasName: 'Orange Retail Finance India Pvt Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'VIST00000NAT6D',
    label: 'Vistaar Financial services Private Limited',
    billerAliasName: 'Vistaar Financial services Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BHAR00000NAT52',
    label: 'Bharat Financial Inclusion Ltd',
    billerAliasName: 'BFIL - NATIONAL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'KOTA00000NATE1',
    label: 'Kotak Mahindra Prime Limited',
    billerAliasName: 'Kotak Mahindra Prime Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MAHI00000NATKR',
    label: 'Mahindra and Mahindra Financial Services Limited',
    billerAliasName: 'Mahindra and Mahindra Financial Services Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'JOHN00000NATY9',
    label: 'John Deere Financial India Private Limited',
    billerAliasName: 'John Deere Financial India Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTH00000NATOI',
    label: 'Muthoot Finance',
    billerAliasName: 'MFL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'DVAR00000NAT2B',
    label: 'Dvara Kshetriya Gramin Financials Private Limited',
    billerAliasName: 'Dvara KGFS',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'TATA00000NATOM',
    label: 'Tata Capital  FastTag Finance Limited',
    billerAliasName: 'Tata Capital  FastTag Finance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'NETA00000NATEN',
    label: 'Netafim Agricultural Financing Agency Pvt. Ltd.',
    billerAliasName: 'NAFA',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SMEC00000NATPI',
    label: 'SMEcorner',
    billerAliasName: 'SMEcorner',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'KOTA00000NATTW',
    label: 'Kotak Mahindra Bank Ltd.-Loans',
    billerAliasName: 'Kotak Mahindra Bank Ltd.-Loans',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SAMA00000NAT1C',
    label: 'Samasta Microfinance Limited',
    billerAliasName: 'Samasta Microfinance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDI00000NATZE',
    label: 'Indiabulls Commercial Credit Ltd',
    billerAliasName: 'Indiabulls Commercial Credit Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'APTU00000NAT2L',
    label: 'Aptus Value  FastTag Finance India Limited',
    billerAliasName: 'APTUS',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'APTU00000NATP0',
    label: 'Aptus Finance India Private Limited',
    billerAliasName: 'APTFI',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'NOVE00000NAT6M',
    label: 'Novelty Finance Ltd',
    billerAliasName: 'Novelty Finance Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'THAZ00000NATR8',
    label: 'Thazhayil Nidhi Ltd',
    billerAliasName: 'TNL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MITR00000NAT6L',
    label: 'Mitron Capital',
    billerAliasName: 'MItron',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'X10F00000NATSA',
    label: 'X10 Financial Services Limited',
    billerAliasName: 'X10 Financial Services Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'YOGA00000NATLH',
    label: 'Yogakshemam Loans Ltd',
    billerAliasName: 'YOGLOANS',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'MUTH00000NATJO',
    label: 'Muthoot  FastTag Finance Company Limited',
    billerAliasName: 'MHFCL',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ESAF00000NAT5J',
    label: 'ESAF Small Finance Bank (Micro Loans)',
    billerAliasName: 'ESAF Small Finance Bank (Micro Loans)',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'RAND00000NAT4D',
    label: 'Rander Peoples Co Operative Bank Ltd',
    billerAliasName: 'Rander Peoples Co Operative Bank Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SMIL00000NATGH',
    label: 'SMILE Microfinance Limited',
    billerAliasName: 'SMILE_Finance',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'FINO00000NATVP',
    label: 'Finova Capital Private Ltd',
    billerAliasName: 'Finova Capital Private Ltd',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'ADIT00000NATZ1',
    label: 'Aditya Birla Finance Limited',
    billerAliasName: 'Aditya Birla Finance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AYAA00000NAT5Y',
    label: 'Ayaan Finserve India Private LTD',
    billerAliasName: 'Ayaan Finserve India Private LTD',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'SARV00000NATV8',
    label: 'Sarvjan India Fintech Private Limited',
    billerAliasName: 'Sarvjan India Fintech Private Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'AADH00000NATPT',
    label: 'Aadhar  FastTag Finance Limited',
    billerAliasName: 'Aadhar  FastTag Finance Limited',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'IDFF00000NAT1B',
    label: 'IDF Financial Services Private Limited',
    billerAliasName: 'IDF Financial Services',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'BAJA00000NATDK',
    label: 'Bajaj  FastTag Finance Limited',
    billerAliasName: 'BHFL - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CENT00000NATSH',
    label: 'Centrum Microcredit Limited',
    billerAliasName: 'CML - National',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'INDO00000NATGP',
    label: 'Indostar Capital Finance Limited - CV',
    billerAliasName: 'ICFL-CV',
    is_fetch: 1,
    Category: 'Loan',
  },
  {
    biller_id: 'CONBB0000PUN01',
    label: 'Connect Broadband',
    billerAliasName: 'CONNECT BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'HATHWAY00NAT01',
    label: 'Hathway Broadband',
    billerAliasName: 'HATHWAY BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TIKO00000NAT01',
    label: 'Tikona Infinet Pvt Ltd',
    billerAliasName: 'TIKONA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ACT000000NAT01',
    label: 'ACT Fibernet',
    billerAliasName: 'ACTFIBER',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ATBROAD00NAT01',
    label: 'Airtel Broadband',
    billerAliasName: 'AIRTEL BB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'NEXTRA000NAT01',
    label: 'Nextra Broadband',
    billerAliasName: 'NEXTRA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SPENET000NAT01',
    label: 'Spectra',
    billerAliasName: 'SPECTRA BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TTN000000NAT01',
    label: 'TTN BroadBand',
    billerAliasName: 'TTN BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ATBROAD00NAT02',
    label: 'Airtel Broadband (Fetch & Pay)',
    billerAliasName: 'AIRTEL BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ASIABB000NAT01',
    label: 'Asianet Broadband (Old)',
    billerAliasName: 'ASIABB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'COMWBB000NAT01',
    label: 'Comway Broadband',
    billerAliasName: 'COMWBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'FUSNBB000NAT01',
    label: 'Fusionnet Web Services Private Limited',
    billerAliasName: 'FUSNBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'DVOIS0000NAT02',
    label: 'ION',
    billerAliasName: 'ION BB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'INST00000CHHZV',
    label: 'Instalinks',
    billerAliasName: 'INTAL BB',
    is_fetch: 0,
    Category: 'BroadBand',
  },
  {
    biller_id: 'MNET00000ASM5W',
    label: 'M-NET Fiber Fast',
    billerAliasName: 'MNET',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'DENB00000NATIO',
    label: 'DEN Broadband',
    billerAliasName: 'DEN',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'TIMB00000NATRQ',
    label: 'Timbl Broadband',
    billerAliasName: 'Timbl',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'INST00000BIHKL',
    label: 'Instanet Broadband',
    billerAliasName: 'INSTANBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'VFIB00000NATJJ',
    label: 'Vfibernet Broadband',
    billerAliasName: 'VFIB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'NETP00000PUNS8',
    label: 'Netplus Broadband',
    billerAliasName: 'NETPB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'FLAS00000NATVZ',
    label: 'Flash Fibernet',
    billerAliasName: 'FLAFBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'EXCE00000NATDP',
    label: 'Excell Broadband',
    billerAliasName: 'ExcellBB',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SWIF00000NATVE',
    label: 'Swifttele Enterprises Private Limited',
    billerAliasName: 'Swift Tele',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ALLI00000NATHB',
    label: 'Alliance Broadband Services Pvt. Ltd.',
    billerAliasName: 'Alliance Broadband Services Pvt. Ltd.',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'RURA00000NAT9E',
    label: 'AirJaldi - Rural Broadband',
    billerAliasName: 'AirJaldi - Rural Broadband',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'SKYL00000NATJB',
    label: 'Skylink Fibernet Private Limited',
    billerAliasName: 'Skylink Fibernet Private Limited',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'ASIA00000NAT6O',
    label: 'Asianet Broadband',
    billerAliasName: 'Asianet Broadband',
    is_fetch: 1,
    Category: 'BroadBand',
  },
  {
    biller_id: 'HPCL00000NAT01',
    label: 'HP Gas (HPCL)',
    billerAliasName: 'HPCL',
    is_fetch: 1,
    Category: 'LpgGas',
  },
  {
    biller_id: 'BHAR00000NATR4',
    label: 'Bharat Gas (BPCL)',
    billerAliasName: 'BPCL',
    is_fetch: 1,
    Category: 'LpgGas',
  },
  {
    biller_id: 'INDI00000NATT5',
    label: 'Indane Gas (Indian Oil)',
    billerAliasName: 'IOCL',
    is_fetch: 1,
    Category: 'LpgGas',
  },
  {
    biller_id: 'DLJB00000DEL01',
    label: 'Delhi Jal Board',
    billerAliasName: 'DJB',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MCG000000GUR01',
    label: 'Municipal Corporation of Gurugram',
    billerAliasName: 'MCG',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'UJS000000UTT01',
    label: 'Uttarakhand Jal Sansthan',
    billerAliasName: 'UJS',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'BWSSB0000KAR01',
    label: 'Bangalore Water Supply and Sewerage Board',
    billerAliasName: 'BWSSB',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'HMWSS0000HYD01',
    label: 'Hyderabad Metropolitan Water Supply and Sewerage Board',
    billerAliasName: 'HMWSSB',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MCJ000000PUN01',
    label: 'Municipal Corporation Jalandhar',
    billerAliasName: 'MCJ',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MCL000000PUN01',
    label: 'Municipal Corporation Ludhiana - Water',
    billerAliasName: 'MCL',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'NDMC00000DEL01',
    label: 'New Delhi Municipal Council (NDMC) - Water',
    billerAliasName: 'NDMC WATER',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'SMC000000GUJ01',
    label: 'Surat Municipal Corporation - Water',
    billerAliasName: 'SMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'UNN000000MAP01',
    label: 'Ujjain Nagar Nigam - PHED',
    billerAliasName: 'PHEDU',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'PUNE00000MAHSE',
    label: 'Pune Municipal Corporation - Water',
    billerAliasName: 'PMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'UITWOB000BHW02',
    label: 'Urban Improvement Trust (UIT) - Bhiwadi',
    billerAliasName: 'UIT BHIWADI',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'GWMC00000WGL01',
    label: 'Greater Warangal Municipal Corporation - Water',
    billerAliasName: 'GWMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'RMC000000JHA01',
    label: 'Ranchi Municipal Corporation',
    billerAliasName: 'RMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'SMC000000DNH01',
    label: 'Silvassa Municipal Council',
    billerAliasName: 'SMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MCA000000PUN01',
    label: 'Municipal Corporation of Amritsar',
    billerAliasName: 'MCA',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'HUDA00000HAR01',
    label: 'Haryana Urban Development Authority',
    billerAliasName: 'HSVP',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MCC000000KAR01',
    label: 'Mysuru City Corporation',
    billerAliasName: 'MCC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'PCMC00000MAH01',
    label: 'Pimpri Chinchwad Municipal Corporation(PCMC)',
    billerAliasName: 'PCMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'PMC000000PUN01',
    label: 'Punjab Municipal Corporations/Councils',
    billerAliasName: 'PMIDC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'DELH00000DEL6Q',
    label: 'Delhi Development Authority (DDA) - Water',
    billerAliasName: 'DDA',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'DEPA00000MIZ9U',
    label: 'Department of Public Health Engineering-Water\t Mizoram',
    billerAliasName: 0,
    is_fetch: 'Water',
  },
  {
    biller_id: 'KERA00000KERMO',
    label: 'Kerala Water Authority (KWA)',
    billerAliasName: 'KWA',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MUNI00000CHANI',
    label: 'Municipal Corporation Chandigarh',
    billerAliasName: 'MCC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'KALY00000THA3E',
    label: 'Kalyan Dombivali Municipal Corporation - Water',
    billerAliasName: 'KDMC',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MADH00000MAPJV',
    label: 'Madhya Pradesh Urban (e-Nagarpalika) - Water',
    billerAliasName: 'e NagarPalika Madhya Pradesh Water',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'PORT00000ANI1K',
    label: 'Port Blair Municipal Council - Water',
    billerAliasName: 'PBMC - Water',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'VASA00000THAE9',
    label: 'Vasai Virar Municipal Corporation - Water',
    billerAliasName: 'VVCMC WATER',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'JALK00000UTP0P',
    label: 'Jalkal Vibhag Nagar Nigam Prayagraj',
    billerAliasName: 'Prayagraj Nagar Nigam-Water',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'NAGA00000ALG45',
    label: 'Nagar Nigam Aligarh',
    billerAliasName: 'Nagar Nigam Aligarh',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'PUBL00000HARBB',
    label: 'Public Health Engineering Department\t Haryana',
    billerAliasName: 0,
    is_fetch: 'Water',
  },
  {
    biller_id: 'KOLH00000MAHN3',
    label: 'Kolhapur Municipal Corporation - Water Tax',
    billerAliasName: 'KMCWT',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'VATV00000GUJ91',
    label: 'Vatva Industrial Estate Infrastructure Development Ltd',
    billerAliasName: 'Vatva Industrial Estate Infrastructure Development',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MUNI00000HARG6',
    label: 'Municipal Corporation of Gurugram (MCG) - Water',
    billerAliasName: 'MCG WATER',
    is_fetch: 1,
    Category: 'Water',
  },
  {
    biller_id: 'MTNL00000DEL01',
    label: 'MTNL Delhi',
    billerAliasName: 'MTNL DEL LL POSTPAID',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'MTNL00000MUM01',
    label: 'MTNL Mumbai',
    billerAliasName: 'MTNL LL POSTPAID',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'ATLLI0000NAT01',
    label: 'Airtel Landline',
    billerAliasName: 'AIRTEL LLI POSTPAID',
    is_fetch: 0,
    Category: 'Landline',
  },
  {
    biller_id: 'TATADLLI0NAT01',
    label: 'Tata Teleservices',
    billerAliasName: 'TATADLLI',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'ATLLI0000NAT02',
    label: 'Airtel Landline (Fetch & Pay)',
    billerAliasName: 'AIRTEL LLI POSTPAID',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'BSNL00000NAT5C',
    label: 'BSNL Landline - Individual',
    billerAliasName: 'BSNLROB',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'BSNL00000NATPZ',
    label: 'BSNL Landline - Corporate',
    billerAliasName: 'BSNLCOB',
    is_fetch: 1,
    Category: 'Landline',
  },
  {
    biller_id: 'APCPDCL0000AP01',
    label: 'Central Power Distribution Company Ltd. of Andra Pradesh (APCPDCL)',
    billerAliasName: 'APCPDCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'APEPDCL0000AP02',
    label: 'Eastern Power Distribution Co Ltd. of Andra Pradesh (APEPDCL)',
    billerAliasName: 'APEPDCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'APSPDCL0000AP03',
    label: 'Southern Power Distribution Co Ltd. of Andra Pradesh (APSPDCL)',
    billerAliasName: 'APSPDCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
  {
    biller_id: 'TSNPDCL0000T01',
    label: 'Northern Power Distribution of Telangana Ltd (TSNPDCL)',
    billerAliasName: 'TSNPDCL',
    is_fetch: 0,
    Category: 'Electricity',
  },
]

export const circleCode = [
  {
    id: 1,
    //  "label": "Andhra Pradesh",
    'Circle Code': 1,
    label: 'Andhra Pradesh',
  },
  {
    id: 2,
    //  "label": "Assam",
    'Circle Code': 2,
    label: 'Assam',
  },
  {
    id: 3,
    //  "label": "Bihar Jharkhand",
    'Circle Code': 3,
    label: 'Bihar Jharkhand',
  },
  {
    id: 4,
    //  "label": "Chennai",
    'Circle Code': 4,
    label: 'Chennai',
  },
  {
    id: 5,
    //  "label": "Delhi NCR",
    'Circle Code': 5,
    label: 'Delhi NCR',
  },
  {
    id: 6,
    //  "label": "Gujarat",
    'Circle Code': 6,
    label: 'Gujarat',
  },
  {
    id: 7,
    //  "label": "Haryana",
    'Circle Code': 7,
    label: 'Haryana',
  },
  {
    id: 8,
    //  "label": "Himachal Pradesh",
    'Circle Code': 8,
    label: 'Himachal Pradesh',
  },
  {
    id: 9,
    //  "label": "Jammu Kashmir",
    'Circle Code': 'Kashmir',
    Column4: 9,
    label: 'Jammu Kashmir',
  },
  {
    id: 10,
    //  "label": "Karnataka",
    'Circle Code': 10,
    label: 'Karnataka',
  },
  {
    id: 11,
    //  "label": "Kerala",
    'Circle Code': 11,
    label: 'Kerala',
  },
  {
    id: 12,
    //  "label": "Kolkata",
    'Circle Code': 12,
    label: 'Kolkata',
  },
  {
    id: 13,
    //  "label": "Maharashtra",
    'Circle Code': 'Goa (except Mumbai)',
    Column4: 13,
    label: 'Maharashtra',
  },
  {
    id: 14,
    //  "label": "Madhya Pradesh Chhattisgarh",
    'Circle Code': 'Chhattisgarh',
    Column4: 14,
    label: 'Madhya Pradesh Chhattisgarh',
  },
  {
    id: 15,
    //  "label": "Mumbai",
    'Circle Code': 15,
    label: 'Mumbai',
  },
  {
    id: 16,
    //  "label": "North East",
    'Circle Code': 16,
    label: 'North East',
  },
  {
    id: 17,
    //  "label": "Orissa",
    'Circle Code': 17,
    label: 'Orissa',
  },
  {
    id: 18,
    //  "label": "Punjab",
    'Circle Code': 18,
    label: 'Punjab',
  },
  {
    id: 19,
    //  "label": "Rajasthan",
    'Circle Code': 19,
    label: 'Rajasthan',
  },
  {
    id: 20,
    //  "label": "Tamil Nadu",
    'Circle Code': 20,
    label: 'Tamil Nadu',
  },
  {
    id: 21,
    //  "label": "UP East",
    'Circle Code': 21,
    label: 'UP East',
  },
  {
    id: 22,
    //  "label": "UP West",
    'Circle Code': 22,
    label: 'UP West',
  },
  {
    id: 23,
    //  "label": "West Bengal",
    'Circle Code': 23,
    label: 'West Bengal',
  },
  {
    id: 24,
    //  "label": "Jharkhand",
    'Circle Code': 24,
    label: 'Jharkhand',
  },
  {
    id: 25,
    'Circle Code': 25,
    label: 'All Circles',
  },
]

// interface MobileNumber {
//   mobile_no: number;
// };

// export const useOperatorQuery = (data:any) => {
//   return useQuery<Error>( [API_ENDPOINTS.RECHARGE_PLANS], (data) =>
//   getOperatorDetails(data)
//   );
// };

interface FormValues {
  mobile_no: number
  operator: string
  circle: string
}

export default function MobileRechargeForm({ click, variant }: any) {
  const loadOptions = async (inputValue: any, callback: any) => {
    var data = await getRechargePlans(inputValue)

    // console.log('search data',data)

    callback(data)

    return data
  }

  // const{data, isLoading} = useOperatorQuery(
  //   data
  // );

  const [phoneNumber, setPhoneNumber] = useState<Number>(0)
  const [plans, setPlans] = useState(null)
  const [addOnPlans, setAddOnPlans] = useState(null)
  const [operator, setOperator] = useState(null)
  const [operatorName, setOperatorName] = useState(null)
  // const[specialRechargeList,setSpecialRechargeList] = useState(null)
  const [circleName, setCircleName] = useState(null)
  const [loading, setLoading] = useState(false)
  const { openModal } = useModalAction()

  const [error, setError] = useState('')

  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: yupResolver(paymentSchema),
    mode: 'onBlur',
    defaultValues: {
      mobile_no: '',
      operator: '',
      circle: '',
    },
  })


  useEffect(() => {
    if (operator) {
      const plan = {
        operator: operatorName,
        circle: circleName,
      }

      mutatePlan(plan)
    }
  }, [circleName])

  
  function handleModal(plans: any) {
    return openModal('RECHARGE_PLANS', {
      plans: plans,
      operator: operatorName,
      circle: circleName,
      phone: phoneNumber,
    })
  }

  function handlePlanDetails(plan: any) {
    return openModal('RECHARGE_PLAN_DETAILS', {
      plan: plan,
      operatorName: operatorName,
      circleName: circleName,
      phone: phoneNumber,
    })
  }

  console.log('allplansdata', plans)

  console.log('number', phoneNumber.length)

  console.log('loading', loading)

  const queryClient = useQueryClient()

  const getOperatorDetails = async (data: any) => {
    setOperator(null)
    setLoading(true)

    setPlans(null)
    console.log('data before', `${url}/${API_ENDPOINTS.OPERATOR}`, data)
    const { data: response } = await http.post(
      `${url}/${API_ENDPOINTS.OPERATOR}`,
      data,
    )
    console.log('data after', response)
    setLoading(false)
    return response
  }

  const useOperatorQuery = (data) => {
    return useQuery('operator-details', (data) => getOperatorDetails(data))
  }

  // const {data,isLoading} = useOperatorQuery();

  const getRechargePlans = async (data: any) => {
    setPlans(null)
    console.log('data before plans', data)
    const { data: plans } = await http.post(API_ENDPOINTS.RECHARGE_PLANS, data)
    // plans?.length && setLoading(false);
    setPlans(plans)
    return plans
  }

  const rechargePlanQuery = (data) => {
    return useQuery('recharge-plans', (data) => getRechargePlans(data))
  }

  function handleClick() {
    return openModal('BILL_PAYMENT')
  }

  console.log('operator', plans)

  const { mutate: mutateOperator } = useMutation(getOperatorDetails, {
    onSuccess: (data) => {
      setOperator(data)
      data?.status == false ? setError(data?.msg) : null
      setOperatorName(data?.operator)
      setCircleName(data?.circle)
      console.log('operator plans', data)
    },

    onError: (data) => {
      // alert(data?.msg)
      toast.error("unable to process the request, please try later");
      setError(data?.msg)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.OPERATOR)
    },
  })

  const { mutate: mutatePlan } = useMutation(getRechargePlans, {
    onSuccess: (data) => {
      // setPlans(null)
      console.log('fresh', data)
      setPlans(data)
      // addOnPlansList();
      setLoading(false)
      // setAddOnPlans(data);
      // console.log('operator',data);
    },

    onError: (error) => {
      alert(error.message)
      setLoading(false)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS)
    },
  })

  const onSubmit = (value: any) => {
    const opr = {
      mobile_no: value,
    }
    if(loading){
      return;
    }
    mutateOperator(opr)
  }

  function callApi(value: any) {
    plans == null ? setLoading(true) : setLoading(false)
    setPhoneNumber(value)
    // console.log('operator',value.length);
    onSubmit(value)
  }

  const handleOnChange = (e: any) => {
    setOperator(null)
    setOperatorName(null)
    setCircleName(null)
    setError(null)
    // e.preventDefault();
    // setPopularPlans('');
    setPhoneNumber(e.target.value)
    const value = e.target.value
    e.target.value.length === 10 && e.target.blur()
    value.toString().length === 10 && callApi(value)
    // setOperator(null);
    // setOperatorName(null);
    // setCircleName(null);
    // setPlans(null);
  }

  useEffect(() => {
    searchPlan()
  }, [])

  const AddOnPlans =
    plans?.plans?.length &&
    plans?.plans?.filter(function (el: any) {
      return el?.group_name === '2G/3G/4G Data'
        ? el.plans?.filter((ell) => ell.circle === operator?.circle)
        : el.plans?.filter((ell) => ell.circle === 'All Circles')
    })

  const popularPlans =
    plans?.plans?.length &&
    plans?.plans?.filter(function (el: any) {
      return el?.group_name == 'Special Recharge' ? el : null
    })

  const specialRechargeList =
    popularPlans?.length &&
    popularPlans?.map((i: any) =>
      i?.plans.filter(
        (pln) => pln.circle == circleName || pln?.circle == 'All Circles',
      ),
    )

  console.log('allPlans', AddOnPlans)

  console.log('allPlans', popularPlans)

  function addOnPlansList() {
    phoneNumber?.length === 0
      ? setAddOnPlans(null)
      : setAddOnPlans(popularPlans)
  }

  const searchedPlan: any[] = []

  function searchPlan() {
    searchedPlan.push(plans?.plans)
  }

  console.log('operator', operatorName, circleName)

  //callback function which filter the plans based on price
  let filtered: any[] = []

  function handlePrice(price: any) {
    console.log('price', price)
    plans?.plans?.map((pln: any) =>
      pln.plans.filter((p: any) =>
        p?.price == price && p?.circle == circleName ? filtered.push(p) : null,
      ),
    )
    // console.log('')
  }

  // console.log('price',handlePrice());
  console.log(
    'price pushed',
    plans?.plans[0]?.plans.map((m) => m.plan_name),
  )

  return (
    <>
      <div
        className={`${
          click
            ? 'grid grid-cols-1 lg:flex lg:items-center place-content-center bg-gray-200 lg:px-6 space-x-4'
            : 'hidden'
        }`}
      >
        <div className="grid grid-cols-1 space-y-2 lg:grid-cols-4 place-content-center px-4  flex-col transition duration-500  lg:space-x-10  lg:space-y-0  lg:flex-row justify-between w-full py-3 items-center ">
          <div className="flex-1 flex-col">
            <Input
              label="Phone number"
              variant=""
              type="text"
              className="rounded-lg"
              //catch error
              error={error}
              {...register('mobile_no', {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
              //loading
              loading={loading}
              pattern="[0-9]*"
              inputMode="numeric"
              // value={(e)=>e.target.value}
              onChange={(e) => handleOnChange(e)}
              maxLength={10}
              // value={(e:any)=>setPhoneNumber(e.target.value)}
            />
          </div>

          {/* { isLoading ? <ProductFeedLoader className='h-10' limit={3}/> 
          :
           <> */}

          <div className="flex-1 flex-col">
            <Label> Operator </Label>
            <Select
              name="Operator"
              variant=""
              type="number"
              {...register('operator', { required: true })}
              value={mobileOperator?.filter(
                (opt) => opt?.name == operator?.operator,
              )}
              // value={operator.msg == 'Success'? operator.operator}
              options={mobileOperator}
            />
          </div>

          <div className="flex-1 flex-col">
            <Label> Circle </Label>
            <Select
              label="circle"
              variant=""
              type="number"
              {...register('circle', { required: true })}
              value={circleCode?.filter(
                (opt) => opt.label === operator?.circle,
              )}
              // onChange={(e:any)=>setValue('circle',e.target.value)}
              // value={operator?.circle}
              // value={operator?.msg === 'Success' && operator?.circle}
              options={circleCode}
            />
          </div>

          <div className="relative flex-1 items-center">
            <Input
              label="Amount"
              variant={''}
              type="number"
              {...register('amount', { required: true })}
              className=""
              onChange={(e) => handlePrice(e)}
            />

            {/* <Select label='amount'
                type='number'
                {...register('amount', {required: false})}
                onChange={(e)=>setValue('amount',e.target.value)}
                options= {()=>   plans?.plans[0]?.plans?.map( (m:any) => m?.plan_name) }
                /> */}

            {/* <Label>Price</Label> */}
            <div className="  ">
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

          {/* <Button className='' size='big'>
                Register
            </Button> */}
        </div>

        <div className="hidden lg:block lg:pt-3">
          <Label className=""></Label>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 
                                   flex text-center rounded text-white"
          >
            Proceed
          </button>
        </div>
        {/* operatorName,circleName */}
        <button
          onClick={() => handlePlanDetails(operatorName, circleName)}
          className="lg:hidden  bg-gradient-to-r from-blue-600 to-blue-800  
                           p-3 flex text-center rounded text-white"
        >
          Proceed
        </button>
      </div>

      <div
        className={`${
          click && plans?.plans?.length && phoneNumber.length === 10
            ? 'flex flex-col '
            : 'hidden'
        } space-y-3 bg-gray-50 p-4 w-full `}
      >
        <div className="flex items-center">
          <h1 className="p-2 text-gray-800 font-semibold">Special Recharge</h1>
          <p
            onClick={() => handleModal(plans)}
            className="font-semibold text-blue-700 p-2 border border-blue-600 rounded 
                    cursor-pointer active:bg-blue-100 hover:bg-blue-50"
          >
            All Plans
          </p>
        </div>

        <div className="flex overflow-x-scroll w-full">
          {/* <div className='grid grid-cols-2 lg:grid-cols-6'> */}
          {plans == null ? (
            <ProductFeedLoader limit={5} />
          ) : (
            // plans?.plans?.length  &&
            click &&
            specialRechargeList &&
            specialRechargeList[0]?.slice(0, 6).map((plan: any, index: any) => {
              // console.log('modal',plan)
              return (
                // plans?.plans?.length &&

                <div
                  onClick={() => handlePlanDetails(plan)}
                  key={index}
                  className="cursor-pointer flex-1  tracking-wide bg-white shadow-lg border mx-2 rounded space-y-2    p-3"
                >
                  <p className="font-bold text-sm  text-gray-900 whitespace-nowrap">
                    {plan?.plan_name}
                  </p>
                  <p className="font- text-sm  text-gray-900 whitespace-nowrap">
                    {'₹' + plan?.price}
                  </p>
                  <p className="block lg:hidden font- h-20 text-xs text-gray-800 whitespace-wrap">
                    {plan?.description.substring(0, 50) + '...'}
                  </p>
                  <p className="hidden lg:block font- h-20 text-xs text-gray-800 whitespace-wrap">
                    {plan?.description}
                  </p>
                  <p className="font- text-xs text-gray-800 whitespace-nowrap">
                    {plan?.data}
                  </p>
                  <p className="font- text-xs text-gray-800 whitespace-nowrap">
                    {plan?.validity}
                  </p>
                  <p className="font-md text-sm text-blue-700 whitespace-nowrap">
                    {plan?.circle}
                  </p>
                </div>
              )
            })
          )}
        </div>
      </div>
      {/* </div>  */}
      {/* </div> */}
    </>
  )
}
