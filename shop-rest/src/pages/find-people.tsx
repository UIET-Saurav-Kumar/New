import React, { useState } from 'react'
import { useTransition, animated, useSpring } from 'react-spring';
import UsersCards from '@components/home-page-product-section/user-cards/user-cards-list'
import ShopsPage from './shops'
import { useRouter } from 'next/router';
import ShopLayout from '@components/layout/shop-layout';
import DefaultLayout from '@components/layout/default-layout';

const tabs = [
  {
   name:'Glam Gang',  tag:'Shine bright with your squad', slug:'Top Salons'},

   {
   src:'/passions/2.jpeg', tag:' Raise a glass together', slug:'Top Bars'},

   {
   src:'/passions/3.jpeg', tag:' Sip the world one cup at a time', slug:'Coffee Shops'},

   {
   src:'/passions/4.jpeg', tag:'Devour flavors with friends', slug:'Top Restraunts'},

   {
   src:'/passions/5.jpeg', tag:'Lift, hustle, and grow together', slug:'Gyms'},

   {
   src:'/passions/6.jpeg', tag:' Radiate good vibes only', slug:'Hangout Places'},

   {
   src:'/passions/7.jpeg', tag:' Beautify spaces, together', slug:'Home Decorater'},

   {
   src:'/passions/8.jpeg', tag:'Experience stories, together', slug:'Movie Theaters'},

   {
   src:'/passions/9.jpeg', tag:' Savor every slice with the crew', slug:'Pizza Shops'},

   {
   src:'/passions/10.jpeg', tag:'Shop till you drop, in style', slug:'malls and shopping centers'},
];

export default function FindPeople() {

  const { query } = useRouter();

  const [tab, setTab] = useState('community');
  const passion_page_query = 'top bars';

  const { x } = useSpring({
    x: tab === 'community' ? 0 : 100, // x value should be within 0 to 100
});


const communitySpring = useSpring({
  x: tab === 'community' ? 0 : -100, // when 'community' is active, keep it at 0. Otherwise, move it out of view
});

const businessesSpring = useSpring({
  x: tab === 'businesses' ? 0 : 100, // when 'businesses' is active, keep it at 0. Otherwise, move it out of view
});

const slides = [
  { key: 'community', component: <UsersCards /> },
  { key: 'businesses', component: <ShopsPage passion_page_query={query?.slug} /> },
];

const transitions = useTransition(tab, {
  from: { transform: 'translate3d(100%,0,0)' },
  enter: { transform: 'translate3d(0%,0,0)' },
  leave: { transform: 'translate3d(-100%,0,0)' },
});

const communityButtonSpring = useSpring({
  backgroundColor: tab === 'community' ? '#007BFF' : '#ECECEC',
  color: tab === 'community' ? 'white' : '#007BFF',
});

const businessesButtonSpring = useSpring({
  backgroundColor: tab === 'businesses' ? '#007BFF' : '#ECECEC',
  color: tab === 'businesses' ? 'white' : '#007BFF',
});



  return (
    <div className='relative z-10 container w-full mx-auto  py-3'>
      <div className="sticky top-0 w-full bg-white mx-auto flex items-center p-4 justify-center z-40 tabs">
              <animated.button
                style={{
                  ...communityButtonSpring,
                  // ...communitySpring,
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginRight: '10px',
                  outline: 'none',
                }}
                onClick={() => setTab('community')}
              >
                Community
              </animated.button>
              <animated.button
                style={{
                  ...businessesButtonSpring,
                    // ...businessesSpring,
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    outline: 'none',
                }}
                onClick={() => setTab('businesses')} // Ensure this is correctly setting the state
            >
                Businesses
            </animated.button>

    </div>

      <div className='mt-5 '>
      {transitions((styles, item) => (
        <animated.div style={styles}>
          {slides?.find(slide => slide.key === item).component}
        </animated.div>
      ))}
    </div>
    </div>
  );
}

FindPeople.Layout = DefaultLayout;
