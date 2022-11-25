import Input from '@components/ui/input'
import Select from '@components/ui/select/select';
import React, { useState } from 'react';
import { operators } from '@components/home-page-product-section/bill-payment-services/forms/mobile-recharge-form';
import { circleCode } from '@components/home-page-product-section/bill-payment-services/forms/mobile-recharge-form';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import Table from 'rc-table';
import { useIsRTL } from "@utils/locals";
import DataTable from 'react-data-table-component';
import { findIndex, indexOf } from 'lodash';

export default function RechargePlans(plans: { data: { plans: any; }; },operator: any,circle: any):any {

    const { alignLeft } = useIsRTL();

     let currentCircle = plans?.data?.circle

    const filteredPlans = 
    
    plans?.data?.plans?.plans?.filter((plan: any) =>
    {plan.circle == currentCircle})

    console.log('modal filtered  ',filteredPlans)

    console.log('modal circle',currentCircle)

    console.log('modal plans',plans?.data?.plans)
    // const response = {
    //     'plans': [
    //         {
    //             "group_name": "Jio Cricket",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 599 By Airtel",
    //                     "price": 599,
    //                     "talktime": "NA",
    //                     "data": "3 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 days",
    //                     "description": "Enjoy Disney+ Hotstar Mobile subscription for 1 year. You also get 3GB/day unlimited All India calls on any network & 100 SMS/day",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 699 By Airtel",
    //                     "price": 699,
    //                     "talktime": "NA",
    //                     "data": "3 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "56 Days",
    //                     "description": "Enjoy Unlimited Local STD & Roaming calls Local STD & Roaming calls on any network daily 3GB data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 499 By Airtel",
    //                     "price": 499,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy unlimited Local STD calls on any network daily 2 GB & 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         },
    //         {
    //             "group_name": "Popular",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 99 By Airtel",
    //                     "price": 99,
    //                     "talktime": "NA",
    //                     "data": "200 MB",
    //                     "sms": "NA",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy talktime of Rs 99 valid for 28 days at 1p/sec local & STD calls with 200 MB data.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 179 By Airtel",
    //                     "price": 179,
    //                     "talktime": "NA",
    //                     "data": "2 GB",
    //                     "sms": "300 SMS",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy Unlimited calls on any network 2GB Data and 300 SMS. Pack valid for 28 days.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 239 By Airtel",
    //                     "price": 239,
    //                     "talktime": "NA",
    //                     "data": "1 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "24 Days",
    //                     "description": "Enjoy Unlimited calls on any network daily 1 GB & 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 58 By Airtel",
    //                     "price": 58,
    //                     "talktime": "NA",
    //                     "data": "3 GB",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "3 GB | Validity same as your existing bundle /smart pack",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 155 By Airtel",
    //                     "price": 155,
    //                     "talktime": "NA",
    //                     "data": "1 GB",
    //                     "sms": "300 SMS",
    //                     "validity": "24 Days",
    //                     "description": "Enjoy Unlimited calls on any network 1GB data & 300 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 299 By Airtel",
    //                     "price": 299,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy 1.5GB/day data unlimited Local & STD calls on any network and 100 SMS/day.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 479 By Airtel",
    //                     "price": 479,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "56 Days",
    //                     "description": "Enjoy Unlimited calls on any network daily 1.5 GB data and 100 SMS. Pack valid for 56 days.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 265 By Airtel",
    //                     "price": 265,
    //                     "talktime": "NA",
    //                     "data": "1 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy Unlimited Local STD calls on any network daily 1 GB data and 100 SMS",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         },
    //         {
    //             "group_name": "Special Recharge",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 99 By Airtel",
    //                     "price": 99,
    //                     "talktime": "NA",
    //                     "data": "200 MB",
    //                     "sms": "NA",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy talktime of Rs 99 valid for 28 days at 1p/sec local & STD calls with 200 MB data.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 128 By Airtel",
    //                     "price": 128,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Local & STD calls 2.5p/sec National Video Calls 5p/sec DATA 50p/MB SMS Rs.1 Local Rs.1.5 STD Rs.5 ISD | Validity : 30 days",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 155 By Airtel",
    //                     "price": 155,
    //                     "talktime": "NA",
    //                     "data": "1 GB",
    //                     "sms": "300 SMS",
    //                     "validity": "24 Days",
    //                     "description": "Enjoy Unlimited calls on any network 1GB data & 300 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 179 By Airtel",
    //                     "price": 179,
    //                     "talktime": "NA",
    //                     "data": "2 GB",
    //                     "sms": "300 SMS",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy Unlimited calls on any network 2GB Data and 300 SMS. Pack valid for 28 days.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 209 By Airtel",
    //                     "price": 209,
    //                     "talktime": "NA",
    //                     "data": "1 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "21 Days",
    //                     "description": "Enjoy Unlimited Local STD calls on any network daily 1GB data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 239 By Airtel",
    //                     "price": 239,
    //                     "talktime": "NA",
    //                     "data": "1 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "24 Days",
    //                     "description": "Enjoy Unlimited calls on any network daily 1 GB & 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 265 By Airtel",
    //                     "price": 265,
    //                     "talktime": "NA",
    //                     "data": "1 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy Unlimited Local STD calls on any network daily 1 GB data and 100 SMS",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 299 By Airtel",
    //                     "price": 299,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy 1.5GB/day data unlimited Local & STD calls on any network and 100 SMS/day.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 359 By Airtel",
    //                     "price": 359,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy Unlimited Local STD calls on any network daily 2GB data and 100 SMS. Pack valid for 28 days & also get 1 Airtel Xstream channel for 28 days",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 449 By Airtel",
    //                     "price": 449,
    //                     "talktime": "NA",
    //                     "data": "2.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 days",
    //                     "description": "Enjoy Unlimited Local STD calls on any network daily 2.5GB data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 455 By Airtel",
    //                     "price": 455,
    //                     "talktime": "NA",
    //                     "data": "6 GB",
    //                     "sms": "900 SMS",
    //                     "validity": "84 Days",
    //                     "description": "Enjoy Unlimited calls on any network 6 GB data & 900 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 479 By Airtel",
    //                     "price": 479,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "56 Days",
    //                     "description": "Enjoy Unlimited calls on any network daily 1.5 GB data and 100 SMS. Pack valid for 56 days.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 549 By Airtel",
    //                     "price": 549,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "56 Days",
    //                     "description": "Enjoy unlimited Local & STD calls on any network daily 2 GB data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 599 By Airtel",
    //                     "price": 599,
    //                     "talktime": "NA",
    //                     "data": "3 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "28 days",
    //                     "description": "Enjoy Disney+ Hotstar Mobile subscription for 1 year. You also get 3GB/day unlimited All India calls on any network & 100 SMS/day",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 666 By Airtel",
    //                     "price": 666,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "77 days",
    //                     "description": "Enjoy Unlimited Local STD & Roaming calls Local STD & Roaming calls on any network daily 1.5GB & 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 699 By Airtel",
    //                     "price": 699,
    //                     "talktime": "NA",
    //                     "data": "3 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "56 Days",
    //                     "description": "Enjoy Unlimited Local STD & Roaming calls Local STD & Roaming calls on any network daily 3GB data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 719 By Airtel",
    //                     "price": 719,
    //                     "talktime": "NA",
    //                     "data": "1.5 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "84 Days",
    //                     "description": "Enjoy unlimited Local STD & Roaming calls on any network 1.5GB/day data and 100 SMS.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 839 By Airtel",
    //                     "price": 839,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "84 Days",
    //                     "description": "Unlimited All India Calls | Data : 2GB/Day | SMS : 100/Day | Validity : 84 Days.OTT Subscription :Disney+ Hotstar Subscription for 3 months and Choose 1 of the select channels on Airtel Xstream App for 84 days",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 1799 By Airtel",
    //                     "price": 1799,
    //                     "talktime": "NA",
    //                     "data": "24 GB",
    //                     "sms": "3600 SMS",
    //                     "validity": "365 Days",
    //                     "description": "Enjoy Unlimited Local STD & Roaming calls Local STD & Roaming calls on any network 24GB Data and 3600 SMS. Pack valid for 365 days.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 2999 By Airtel",
    //                     "price": 2999,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "365 Days",
    //                     "description": "Unlimited All India Calls | Data : 2GB/Day | SMS : 100/Day | Validity : 365 Days. ",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         },
    //         {
    //             "group_name": "Top Up",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 10 By Airtel",
    //                     "price": 10,
    //                     "talktime": "7.47",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "You are enjoying talktime worth Rs.7.47",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 20 By Airtel",
    //                     "price": 20,
    //                     "talktime": "14.95",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "You are enjoying talktime worth Rs.14.95",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 100 By Airtel",
    //                     "price": 100,
    //                     "talktime": "81.74",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "You are enjoying talktime worth Rs.81.75",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 500 By Airtel",
    //                     "price": 500,
    //                     "talktime": "423.73",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "Enjoy talktime of Rs 423.73",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 1000 By Airtel",
    //                     "price": 1000,
    //                     "talktime": "847.46",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "Enjoy talktime of Rs 847.46",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 5000 By Airtel",
    //                     "price": 5000,
    //                     "talktime": "4237.29",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "Enjoy talktime of Rs 4237.29",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         },
    //         {
    //             "group_name": "2G/3G/4G Data",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 58 By Airtel",
    //                     "price": 58,
    //                     "talktime": "NA",
    //                     "data": "3 GB",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "3 GB | Validity same as your existing bundle /smart pack",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 98 By Airtel",
    //                     "price": 98,
    //                     "talktime": "NA",
    //                     "data": "5 GB",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "Wynk Premium Data Pack,5 GB Data | 30 days of Wynk Premium subscription",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 118 By Airtel",
    //                     "price": 118,
    //                     "talktime": "NA",
    //                     "data": "12 GB",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "12 GB | Validity same as your existing bundle /smart pack",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 148 By Airtel",
    //                     "price": 148,
    //                     "talktime": "NA",
    //                     "data": "15 GB",
    //                     "sms": "NA",
    //                     "validity": "NA",
    //                     "description": "Xstream Mobile Data Pack-15GB Data |30 days access to any 1 of the select Xstream channels (ErosNow, Hoichoi, ManoramaMax) on Airtel Xstream App at no extra cost",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 301 By Airtel",
    //                     "price": 301,
    //                     "talktime": "NA",
    //                     "data": "50 GB",
    //                     "sms": "NA",
    //                     "validity": "Same as exiting bundle",
    //                     "description": "Enjoy 50 GB and 1 year of Wynk Music Premium subscription",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 19 By Airtel",
    //                     "price": 19,
    //                     "talktime": "NA",
    //                     "data": "1 GB",
    //                     "sms": "NA",
    //                     "validity": "1 Day",
    //                     "description": "Enjoy 1GB data valid for 1 day.",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         },
    //         {
    //             "group_name": "Roaming",
    //             "plans": [
    //                 {
    //                     "plan_name": "Recharge of Rs 18 By Airtel",
    //                     "price": 18,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "28 Days",
    //                     "description": "Enjoy ISD calling at discounted rates for 28 days. For country wise tariff visit www.airtel.in",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 755 By Airtel",
    //                     "price": 755,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "5 Days",
    //                     "description": "Details: 1GB data valid for 5 days. |Covered Countries: UAE Saudi Arabia Malaysia USA Oman Qatar UK Kuwait Singapore & more. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 799 By Airtel",
    //                     "price": 799,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: 100mins of incoming/Local/India calls valid for 30 days.|Covered Countries : UAE Saudi Arabia Malaysia USA Oman Qatar UK Kuwait Singapore & more. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 496 By Airtel",
    //                     "price": 496,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "1 Day",
    //                     "description": "Details: Unlimited incoming 500MB 100min local/India calls 100 sms.| Covered Countries : Bangladesh Bhutan Myanmar Nepal Sri Lanka",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 648 By Airtel",
    //                     "price": 648,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "1 Day",
    //                     "description": "Details: 100mins incoming 500MB 100mins local/India calls 100 sms.| Covered Countries : UAE Saudi Arabia Oman Kuwait Bahrain Qatar Iran Iraq Russia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 649 By Airtel",
    //                     "price": 649,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "1 Day",
    //                     "description": "Details: Unlimited incoming 500MB 100min local/India calls 100 sms.| Covered Countries : USA UK Canada Singapore Thailand Malasiya Australia France Germany Netherlands China Indonesia Hong Kong & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 1199 By Airtel",
    //                     "price": 1199,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: 1 GB100mins of incoming/Local/India calls valid for 30 days.|Covered Countries : UAE Saudi Arabia Malaysia USA Oman Qatar UK Kuwait Singapore & more. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 1499 By Airtel",
    //                     "price": 1499,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "10 Days",
    //                     "description": "Details: Unlimited incoming 3GB 250mins local/India calls 100sms.| Covered Countries : Bangladesh Bhutan Myanmar Nepal Sri Lanka",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 2499 By Airtel",
    //                     "price": 2499,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: Unlimited incoming 5GB 500mins local/India calls 100 sms.| Covered Countries : Bangladesh Bhutan Myanmar Nepal Sri Lanka",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 3599 By Airtel",
    //                     "price": 3599,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "10 Days",
    //                     "description": "Details: Unlimited incoming 3GB 250mins local/India calls 100 sms.| Covered Countries : USA UK Canada Singapore Thailand Malasiya Australia France Germany Netherlands China Indonesia Hong Kong & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 3997 By Airtel",
    //                     "price": 3997,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: Unlimited incoming 5GB 500mins local/India calls 100 sms.| Covered Countries : USA UK Canada Singapore Thailand Malasiya Australia France Germany Netherlands China Indonesia Hong Kong & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 3998 By Airtel",
    //                     "price": 3998,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: 500mins incoming 5GB 500mins local/India calls 100 sms.| Covered Countries :  UAE Saudi Arabia Oman Kuwait Bahrain Qatar Iran Iraq Russia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 4999 By Airtel",
    //                     "price": 4999,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "10 Days",
    //                     "description": "Details: Unlimited incoming 1GB/day500mins of local/India calls100 sms.|Covered Countries : UAE Saudi Arabia Malaysia USA Oman Qatar UK Kuwait Singapore & more. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 997 By Airtel",
    //                     "price": 997,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "1 Day",
    //                     "description": "Details: 100mins incoming 500MB 100mins local/India calls 100 sms.| Covered Countries : Maldives Nigeria South Africa Kenya Uganda Zambia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 3598 By Airtel",
    //                     "price": 3598,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "10 Days",
    //                     "description": "Details: 250mins incoming 3GB 250mins local/India calls 100 sms.| Covered Countries :  UAE Saudi Arabia Oman Kuwait Bahrain Qatar Iran Iraq Russia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 3995 By Airtel",
    //                     "price": 3995,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "10 Days",
    //                     "description": "Details: 250mins incoming 3GB 250mins local/India calls 100SMS.| Covered Countries : Maldives Nigeria South Africa Kenya Uganda Zambia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 6999 By Airtel",
    //                     "price": 6999,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "30 Days",
    //                     "description": "Details: 500mins incoming 5GB 500mins local/India calls 100 sms. | Covered Countries : Maldives Nigeria South Africa Kenya Uganda Zambia & more countries. Visit www.airtel.in/ir",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 2999 By Airtel",
    //                     "price": 2999,
    //                     "talktime": "NA",
    //                     "data": "2 GB/Day",
    //                     "sms": "100 SMS/Day",
    //                     "validity": "365 Days",
    //                     "description": "Unlimited All India Calls | Data : 2GB/Day | SMS : 100/Day | Validity : 365 Days. ",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 5997 By Airtel",
    //                     "price": 5997,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "90 Days",
    //                     "description": "Details: Unlimited incoming 1800 mins India calls 100 sms.| Covered Countries : Bangladesh Bhutan Myanmar Nepal Sri Lanka. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 },
    //                 {
    //                     "plan_name": "Recharge of Rs 5998 By Airtel",
    //                     "price": 5998,
    //                     "talktime": "NA",
    //                     "data": "NA",
    //                     "sms": "NA",
    //                     "validity": "90 Days",
    //                     "description": "Details: Unlimited incoming 1800 mins India calls 100 sms.| Covered Countries : Australia Canada China Friance Japan Singapore USA UK & more. Visit www.airtel.in/IR",
    //                     "operator": "Airtel",
    //                     "circle": "Rajasthan",
    //                     "disclaimer": "The plans are subjected to change. Please cross verify"
    //                 }
    //             ]
    //         }
    //     ]
    // }

    const response = plans?.data?.plans

    console.log``

    const { data } = response! ?? {};

    // const columns = [
    //     {
    //     name: 'Talktime',
    //     selector: (row) => row?.plans?.map((list:any)=>  )
    //     },

    // ]
    

    const columns = [

        {
            title: 'Talktime',
            dataIndex: "talktime",
            key: "plans",
            align: alignLeft,
            render: (data ) => {
                 
                // const data = response?.plans
                console.log('plans',data);
                // const allPlans = data?.map((list:any)=>list?.talktime)
                // console.log('plans',response?.plans[index].plans.map((tk:any)=>tk?.talktime))
               return <span className="whitespace-nowrap">
                        {/* {'allPlans'} */}
                      </span>
            },
        },

        {
            title:'Validity',
            dataIndex: "validity",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => {
                console.log('plans',plans)
                return <div className="whitespace-nowrap text-black font-light">
                        {plans}
                       </div>
            },
        },

        {
            title: 'Description',
            dataIndex: "description",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => (
                <div className="whitespace-nowrap font-light">
                      {plans?.description}
                </div>
            ),
        },

        {
            title: 'Price',
            dataIndex: "price",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => (
                <div className="whitespace-nowrap font-light">
                     {plans?.price}
                </div>
            ),
        }

    ]

    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0);

    const handlePlan = (event,key) => {
        console.log('key',key)
        console.log('key',event.target)
        setIndex(key)
        setKey(key)
    }
    
    // console.log('plans',response?.plans[index].plans.map((tk:any)=>tk?.talktime))

  return (

        <div  className='flex bg-white flex-col items-center  justify-between w-full'>
                
                <div   className=''>
                    Browse Plans
                </div>

            <div className='grid grid-cols-1  lg:flex lg:items-center lg:space-x-2 lg:justify-evenly lg:space-y-0 space-y-2 p-4 bg-gray-100 w-full '>
                
                
                  <Select name='Operator'
                    variant='solid'
                    type='number'
                    className='flex-1'
                    options={operators} 
                    value={operator}
                    placeholder='Select operator'
                  />

                  <Select 
                    variant='solid'
                    type='number'
                    className='flex-1'
                    options={circleCode}
                    value={circle}
                    placeholder='Select circle'
                   />
                    

                  <Input   
                    variant=''
                    type='number'
                    className='flex-1'
                    // className='border'
                    // onChange={(e)=>handleOnChange(e)}
                    maxLength={10}
                    placeholder='amount'
                  />

                </div>

                <div className='h-screen overflow-y-scroll grid grid-cols-1 lg:grid-cols-1  items-start w-full'>

                <div className='scrollbar-hide hidden lg:flex lg:sticky lg:top-0 lg:z-50 bg-white  overflow-x-scroll  w-full  text-gray-700 text-xs   sm:text-sm  items-center     font-light    '>

                    {
                        response?.plans?.map((list:any,key)=>
                        <div onClick={event=> handlePlan(event,key)} key={key} 
                            className={` ${index == key ? ' border-b-4 border-blue-400   ' : 'hover:bg-gray-50 border-b-4 border-white '} cursor-pointer p-2 flex  items-center text-center text-black `}>
                            <li className='list-none' >
                             <span  className={` ${index == key ? 'text-gray-800 font-semibold' : 'text-gray-600 font-semibold'}   cursor-pointer   flex flex-col  whitespace-nowrap`}>
                                {list?.group_name}
                                <span className='   '></span>
                             </span>
                            </li>
                        </div>
                        )
                    }

                </div>

                <div className='sticky top-0 bg-white scrollbar-hide lg:hidden   overflow-x-scroll    text-gray-700 text-xs   sm:text-sm flex   lg:space-y-8 font-light    '>

                    {
                        response?.plans?.map((list:any,key)=>
                            <div onClick={event=> handlePlan(event,key)} key={key} 
                                className={` ${index == key ? ' border-b-4 border-blue-400   ' : 'hover:bg-gray-50 border-b-4 border-white '} cursor-pointer p-2 flex    items-center text-center text-black `}>
                                <li className='list-none' >
                                    <span  className={` ${index == key ? 'text-gray-800 font-semibold' : 'text-gray-600 font-semibold'}   cursor-pointer   flex flex-col  whitespace-nowrap`}>
                                        {list?.group_name}
                                        <span className='   '></span>
                                    </span>
                                </li>
                            </div>
                        )
                    }

                </div>

                    <div className='flex-1 flex-col mt-10 lg:mt-20'>

                        {/* <div className=''>

                        </div> */}

                        <div className=' '>
                            {/* <Table
                            //@ts-ignore
                            columns={columns}
                            emptyText={("empty-table-data")}
                            data={data}
                            rowKey="id"
                            // scroll={{ x: 1000 }}
                            /> */}

                            <table className='w-full flex overflow-x-scroll items-center justify-between mt-4'>
                               <tr className='flex flex-col items-center cursor-pointer  border-b space-y-3 justify-around w-full '>
                                    <th className=''>Talktime</th>
                                        {
                                            response?.plans[index].plans.map((tk:any)=>{
                                            return <td className='text-xs leading-loose sm:text-sm h-24 font-light text-gray-700'>{tk?.talktime}</td>
                                        }
                                            )
                                        }
                               </tr>

                               <tr className='flex flex-col items-center cursor-pointer  space-y-3 justify-around w-full  '>
                                 <th className=''>Validity</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td className='text-xs leading-loose sm:text-sm h-24 font-light text-gray-700'>{tk?.validity}</td>}
                                        )
                                    }
                               </tr> 

                               <tr className='flex flex-col space-y-3 cursor-pointer justify-around w-full  '>
                                  <th className=''>Description</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td className='text-xs leading-loose  sm:text-sm h-24 text-left font-light text-gray-700'>{tk?.description.substring(0,50)}</td>}
                                        )
                                    }
                               </tr>

                               <tr className='flex flex-col items-center cursor-pointer  space-y-3 justify-around w-full  '>
                                 <th className=''>Price</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td className='text-xs leading-loose sm:text-sm h-24 rounded font-light text-gray-700'><span className='p-2 px-4 rounded border border-indigo-300'> ₹{tk?.price}</span></td>}
                                        )
                                    }
                               </tr>

                            </table>
                           
                        </div>

                    </div>

                </div>

            </div>
        )
    }
