import Link from '@components/ui/link';
import React from 'react';
import { animated, useSpring } from 'react-spring';

// Beers & Booz: Booze Brigade
// Coffee: Caffeine Clan
// Beauty: Glam Gang
// Home: Decor Divas
// Eat Out: Hungry Squad
// Shopping: Shopaholic Society
// Hangout: Vibe Tribe
// Movies: Film Fam
// Pizza Dates: Pizza Crew
// Gym Lovers: Muscle Mafia

function ImageContainer({ src, gradient,name, tag }) {

  const springStyle = useSpring({ opacity: 1, from: { opacity: 0 } });

  const buttons = [
    'Glam Gang',
    'Booze Brigade',
    'Caffeine Clan',
    'Hungry Squad',
    'Muscle Mafia',
    'Vibe Tribe',
    'Decor Divas',
    'Film Fam',
    'Pizza Crew',
    'Shopaholic Society'
  ]


  // buttons?.map(()=>(
    
  // ))

  return (
    <div className="relative bg-white  ">
      <img src={src} className="h-full w-full  rounde bg-white object-contain hover:object-fit" />
      <div
        className="absolute inset-0  top-0 left-0 h-full w-full bg-black bg-opacity-40 hover:bg-opacity-0 transition-all duration-200 flex items-center justify-center"
      >
        <animated.button
          style={springStyle}
          className={`hover:bg-gradient-l bg-gradient-to-r ${gradient} hover:bg-red-600 p-2 px-7 text-xs lg:text-sm 2xl:text-lg transition-all duration-300   font-semibold tracking-wide text-white rounded-2xl `}
        >
          {name}
        </animated.button>
      </div>
      <p className='absolute bottom-0 text-white  text-xs lg:text-sm xl:text-lg font-medium lg:font-semibold p-3 left-0 z-20'>{tag}</p>
    </div>
  );
}

export default function Passion() {
 


  const gradients = [
    {gradient:'from-red-700 to-indigo-700',
     name:'Glam Gang', src:'/passions/1.jpeg', tag:'Shine bright with your squad', slug:'Top Salons'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/2.jpeg',name:'Booze Brigade', tag:' Raise a glass together', slug:'Top Bars'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/3.jpeg',name:'Caffeine Clan', tag:' Sip the world one cup at a time', slug:'Coffee Shops'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/4.jpeg',name:'Hungry Squad', tag:'Devour flavors with friends', slug:'Top Restraunts'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/5.jpeg',name:'Muscle Mafia', tag:'Lift, hustle, and grow together', slug:'Gyms'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/6.jpeg', name: 'Vibe Tribe', tag:' Radiate good vibes only', slug:'Hangout Places'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/7.jpeg',name: 'Decor Divas', tag:' Beautify spaces, together', slug:'Home Decorater'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/8.jpeg',name:'Film Fam', tag:'Experience stories, together', slug:'Movie Theaters'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/9.jpeg',name: 'Pizza Crew', tag:' Savor every slice with the crew', slug:'Pizza Shops'},

     {gradient:'from-red-700 to-indigo-700',
     src:'/passions/10.jpeg',name:'Shopaholic Society', tag:'Shop till you drop, in style', slug:'malls and shopping centers'},
  ];

  return (
    <div className='flex flex-col space-y-2 py-5 text-left w-full  border-t-2 mt-5'> 
        <h1 className='text-lg lg:text-2xl font-semibold py-4 px-3'>Find your people</h1>
        <div className="h-full w-full grid grid-cols-2 lg:grid-cols-5 place- -center gap-2 px-2">
          
          {gradients?.map((i, index) => (
           <Link href={`/find-people?slug=${i?.slug}&avail=false`}> <ImageContainer key={index} src={i?.src} tag={i?.tag} name={i?.name} gradient={i?.gradient} /></Link>
          ))}
        </div>
    </div>
  );
}
